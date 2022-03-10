"use strict"

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

  mate(_p1, _p2) {
    throw new Error("not implemented");
  }
}

class Configuration {
  constructor() {
    this.populationSize = 100;
    this.mateFraction =  0.1;
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
}

class Simulator {
  constructor(config, creator) {
    this.config_ = config;
    this.creator_ = creator;
    this.population_ = new Array(this.config_.populationSize);
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

  addIndividual(individual) {
    let fitnessScore = this.life_.getFitnessScore(individual);
    if (fitnessScore > this.life_.getFitnessScore(this.population_[0])) {
      this.population_.splice(0, 0, individual);
    } else {
      for (let i = (this.populationSize_ - 1); i >= 0; i--) {
        if (fitnessScore <= this.life_.getFitnessScore(this.population_[i])) {
          this.population_.splice(i + 1, 0, individual);
          break;
        }
      }
    }
    this.population_.splice(-1, 1);
  }
}
