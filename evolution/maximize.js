class Individual {
  constructor(isValidFn, fn, value) {
    this.isValidFn_ = isValidFn;
    this.fn_ = fn;

    if (value === undefined) {
      this.value_ = Math.random();
    } else {
      this.value_ = value;
    }
    if (!this.isValidFn_(this.value_)) {
      throw new Error("invalid value");
    }

    this.normalGen_ = createNormalGen(0, 0.1);
  }

  getValue() {
    return this.value_;
  }

  getFitnessScore() {
    return this.fn_(this.getValue());
  }

  mateWith(partner) {
    let children = new Array(1);
    children[0] = new Individual(
      this.isValidFn_, this.fn_, (this.getValue() + partner.getValue()) / 2);
    return children;
  }

  mutate() {
    let mutatedValue;
    do {
      mutatedValue = this.getValue() + this.normalGen_.next().value;
    } while (!this.isValidFn_(mutatedValue));
    this.value_ = mutatedValue;
    return this;
  }
}

class Creator {
  constructor(isValidFn, fn) {
    this.isValidFn_ = isValidFn;
    this.fn_ = fn;
  }

  createIndividual() {
    return new Individual(this.isValidFn_, this.fn_);
  }
}
