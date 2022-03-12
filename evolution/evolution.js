"use strict"

function createNormalGen(mean, stddev) {
  return function* () {
    do {
      // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
      let u1 = Math.random();
      let u2 = Math.random();
      let r = Math.sqrt(-2 * Math.log(u1));
      let theta = 2 * Math.PI * u2;
      yield stddev * r * Math.cos(theta) + mean;
      yield stddev * r * Math.sin(theta) + mean;
    } while (true);

  }();
}

class IndividualBase {
  constructor() {
    if (this.constructor === IndividualBase) {
      throw new Error("Can't instantiate abstract class");
    }
  }

  getValue() {
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
    this.minGenerations = 10;
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
      this.time_ < this.config_.maxGenerations && (newMax - prevMax) > 1e-3);
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


  /////////////////////////////////////////////////

  elapseOneTimeInterval() {
    // Pick a random 10% of the population to reproduce.
    let indicesSet = new Set();
    while (indicesSet.size < this.populationSize_ / 10) {
      indicesSet.add(Math.floor(Math.random() * this.populationSize_));
    }
    let indices = Array.from(indicesSet);
    indices.sort(function(a, b) { return a - b; });
    let parents = []; // parents in descending fitness.
    for (let index of indices) {
      parents.push(this.population_[index]);
    }

    for (let i = 0; i < this.populationSize_ / 10; i = i + 2) {
      let parent1 = this.population_[i];
      let parent2 = this.population_[i+1];
      let [child1, child2] = this.life_.reproduce(parent1, parent2);
      this.addIndividual(child1);
      this.addIndividual(child2);
    }
  }

  elapseTimeUntilConvergence() {
    let time = 0;
    let maxFitnessScore = this.life_.getFitnessScore(this.population_[0]);
    let newMaxFitnessScore = maxFitnessScore;
    console.log(`${time}: ${this.population_[0].value} ${maxFitnessScore}`);
    do {
      maxFitnessScore = newMaxFitnessScore;
      for (let i = 0; i < 10; i++) {
        time++;
        this.elapseOneTimeInterval();
        newMaxFitnessScore = this.life_.getFitnessScore(this.population_[0]);
        console.log(`${time}: ${this.population_[0].value} ${newMaxFitnessScore}`);
      }
    } while ((newMaxFitnessScore - maxFitnessScore) > 1e-6 && time < 100);
  }
}
