class Individual {
  constructor(value) {
    if (value === undefined) {
      this.value_ = Math.random();
    } else {
      this.value_ = value;
    }
    if (value < 0 || value > 1) {
      throw new Error("invalid value");
    }
  }

  mutate() {
    let noise = (Math.random() - 0.5) / 100;
    let value = this.value_ + noise;
    if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }
    this.value_ = value;
    return this;
  }

  get value() {
    return this.value_;
  }
}

class MyLife {
  constructor() {
    this.func_ = function(x) {
      return x * (1 - x);
    }
  }

  createIndividual() {
    return new Individual();
  }

  getFitnessScore(individual) {
    return this.func_(individual.value);
  }

  reproduce(parent1, parent2) {
    let x = (parent1.value + parent2.value) / 2;
    let child1 = (new Individual(x)).mutate();
    let child2 = (new Individual(x)).mutate();
    return [child1, child2];
  }
}
