"use strict"

function createNormalGen(mean, stddev) {
  return function* () {
    do {
      yield stddev * standardNormalGen.next().value + mean;
    } while (true);

  }();
}

const standardNormalGen = function* () {
  do {
    // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
    let u1 = Math.random();
    let u2 = Math.random();
    let r = Math.sqrt(-2 * Math.log(u1));
    let theta = 2 * Math.PI * u2;
    yield r * Math.cos(theta);
    yield r * Math.sin(theta);
  } while (true);
}();

class RealInterval {
  constructor(minInclusive, maxExclusive) {
    if (minInclusive >= maxExclusive) {
      throw new Error("Invalid range");
    }
    this.minInclusive_ = minInclusive;
    this.maxExclusive_ = maxExclusive;
    this.noiseGen_ = createNormalGen(0, (maxExclusive - minInclusive) / 50);
  }

  sample() {
    return this.minInclusive_ +
      Math.random() * (this.maxExclusive_ - this.minInclusive_);
  }

  isValid(x) {
    return this.minInclusive_ <= x && x < this.maxExclusive_;
  }

  mutate(x) {
    if (!this.isValid(x)) {
      throw new Error("Invalid value");
    }
    let noise = 0;
    do {
      noise = this.noiseGen_.next().value;
    } while (!this.isValid(x + noise));
    return x + noise;
  }
}

class IndividualBase {
  constructor() {
    if (this.constructor === IndividualBase) {
      throw new Error("Can't instantiate abstract class");
    }
  }

  getValues() {
    throw new Error("not implemented");
  }

  getFitnessScore() {
    throw new Error("not implemented");
  }

  mateWith(_partner) {
    throw new Error("not implemented");
  }

  mutate() {
    throw new Error("not implemented");
  }
}

class CreatorBase {
  constructor() {
    if (this.constructor === CreatorBase) {
      throw new Error("Can't instantiate abstract class");
    }
  }

  createIndividual() {
    throw new Error("not implemented");
  }
}

class Configuration {
  constructor() {
    this.populationSize = 100;
    this.mateFraction =  0.1;
    this.minGenerations = 100;
    this.maxGenerations = 10000;
  }

  get populationSize() {
    return this.populationSize_;
  }

  set populationSize(size) {
    if (size < 1) {
      throw new Error('Size must be at least 1');
    }
    this.populationSize_ = Math.floor(size);
  }

  get mateFraction() {
    return this.mateFraction_;
  }

  set mateFraction(f) {
    if (f <= 0 || f > 1) {
      throw new Error('Fraction must be in (0, 1]');
    }
    this.mateFraction_ = f;
  }

  get minGenerations() {
    return this.minGenerations_;
  }

  set minGenerations(n) {
    if (n < 1) {
      throw new Error('Must be >= 1');
    }
    this.minGenerations_ = n;
  }

  get maxGenerations() {
    return this.maxGenerations_;
  }

  set maxGenerations(n) {
    if (n < 1) {
      throw new Error('Must be >= 1');
    }
    this.maxGenerations_ = n;
  }
}

class Simulator {
  constructor(config, creator) {
    this.config_ = config;
    this.creator_ = creator;
    this.population_ = new Array(this.config_.populationSize);
    this.time_ = 0;
  }

  run() {
    this.initialize();
    let newMax = this.population_[0].getFitnessScore();
    let prevMax;
    do {
      prevMax = newMax;
      for (let i = 0; i < this.config_.minGenerations; i++) {
        this.tick();
      }
      newMax = this.population_[0].getFitnessScore();
    } while (
      this.time_ < this.config_.maxGenerations && (newMax - prevMax) > 0);
  }

  initialize() {
    for (let i = 0; i < this.config_.populationSize; i++) {
      let individual = this.creator_.createIndividual();
      this.population_[i] = individual;
    }
    this.population_.sort(function(a, b) {
      return b.getFitnessScore() - a.getFitnessScore();
    });
  }

  sampleParents() {
    let numToSelect = Math.floor(
      this.config_.mateFraction * this.config_.populationSize);
    if (numToSelect < 2) {
      throw new Error('Must select atleast 2 parents');
    }
    let parents = new Array(numToSelect);

    let weight = function(index) {
      if (this.population_[this.config_.populationSize - 1] > 0) {
        return this.population_[index].getFitnessScore();
      }
      return 1.0 / (index + 1);
    }.bind(this);

    let weightTotal = 0;
    for (let i = 0; i < numToSelect; i++) {
      weightTotal += weight(i);
      parents[i] = this.population_[i];
    }
    for (let i = numToSelect; i < this.config_.populationSize; i++) {
      let w = weight(i);
      weightTotal += w;
      if (Math.random() < w / weightTotal) {
        // Replace one item in the reservoir with this individual.
        let replacementIndex = Math.floor(Math.random() * numToSelect);
        parents[replacementIndex] = this.population_[i];
      }
    }

    return parents;
  }

  addIndividual(individual) {
    let fitnessScore = individual.getFitnessScore();
    if (fitnessScore > this.population_[0].getFitnessScore()) {
      this.population_.splice(0, 0, individual);
    } else {
      for (let i = (this.config_.populationSize - 1); i >= 0; i--) {
        if (fitnessScore <= this.population_[i].getFitnessScore()) {
          this.population_.splice(i + 1, 0, individual);
          break;
        }
      }
    }
    this.population_.splice(-1, 1);
  }

  tick() {
    let parents = this.sampleParents();
    for (let i = 0; i < parents.length; i = i + 2) {
      let children = parents[i].mateWith(parents[i + 1]);
      for (let child of children) {
        this.addIndividual(child.mutate());
      }
    }
    this.time_++;
  }
}
