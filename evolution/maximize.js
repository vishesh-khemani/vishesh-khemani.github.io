class Individual {
  constructor(creator, ...values) {
    this.creator_ = creator;

    this.values_ = new Array(creator.intervals_.length);
    if (values === undefined || values.length === 0) {
      for (let i = 0; i < creator.intervals_.length; i++) {
        this.values_[i] = creator.intervals_[i].sample();
        if (!this.creator_.intervals_[i].isValid(this.values_[i])) {
          throw new Error(`Invalid value: ${this.values_[i]}`);
        }
      }
    } else {
      if (values.length != creator.intervals_.length) {
        throw new Error("Mismatch in number of values");
      }
      for (let i = 0; i < creator.intervals_.length; i++) {
        let interval = creator.intervals_[i];
        if (interval.isValid(values[i])) {
          this.values_[i] = values[i];
        } else {
          throw new Error(`Invalid value: ${values[i]}`);
        }
      }
    }
  }

  getValues() {
    return this.values_;
  }

  getFitnessScore() {
    return this.creator_.fitnessFn_(...this.values_);
  }

  mateWith(partner) {
    let children = new Array(1);
    let childValues = new Array(this.values_.length);
    for (let i = 0; i < this.values_.length; i++) {
      if (!this.creator_.intervals_[i].isValid(this.values_[i])) {
        throw new Error(`Invalid value: ${this.values_[i]}`);
      }
      if (!this.creator_.intervals_[i].isValid(partner.values_[i])) {
        throw new Error(`Invalid value: ${partner.values_[i]}`);
      }
      childValues[i] = (this.values_[i] + partner.values_[i]) / 2;
    }
    children[0] = new Individual(this.creator_, ...childValues);
    return children;
  }

  mutate() {
    for (let i = 0; i < this.values_.length; i++) {
      this.values_[i] = this.creator_.intervals_[i].mutate(this.values_[i]);
    }
    return this;
  }
}

class Creator {
  constructor(fitnessFn, ...intervals) {
    this.fitnessFn_ = fitnessFn;
    if (intervals.length < 1) {
      throw new Error("Need at least 1 interval");
    }
    this.intervals_ = intervals;
  }

  createIndividual() {
    return new Individual(this);
  }
}
