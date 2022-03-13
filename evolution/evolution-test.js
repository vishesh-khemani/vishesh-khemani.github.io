describe("Normal Gen", function() {
  it("Samples correctly", function() {
    let gen = createNormalGen(10, 2);
    let x = [];
    let num = 1000;
    let sum = 0;
    for (let i = 0; i < num; i++) {
      x.push(gen.next().value);
      sum = sum + x[i];
    }
    let mean = sum / num;
    assert.closeTo(mean, 10, 0.2);

    sum = 0;
    for (let i = 0; i < num; i++) {
      sum = sum + Math.pow((x[i] - mean), 2);
    }
    let stddev = Math.sqrt(sum / num);
    assert.closeTo(stddev, 2, 0.2);
  });
});

describe("Real Interval", function() {
  it("[0, 1)", function() {
    let interval = new RealInterval(0, 1);
    for (let i = 0; i < 100; i++) {
      let x = interval.sample();
      assert.isTrue(x >= 0 && x < 1, `Bad value: ${x}`);
      let y = interval.mutate(x);
      assert.isTrue(y >= 0 && y < 1);
      assert.closeTo(x, y, 0.1);
    }
  });

  it("[-10, 10)", function() {
    let interval = new RealInterval(-10, 10);
    for (let i = 0; i < 100; i++) {
      let x = interval.sample();
      assert.isTrue(x >= -10 && x < 10, `Bad value: ${x}`);
      let y = interval.mutate(x);
      assert.isTrue(y >= -10 && y < 10);
      assert.closeTo(x, y, 2);
    }
  });
});

describe("IndividualBase", function() {
  it("No instantiation", function() {
    assert.throws(() => new IndividualBase());
  });
});

describe("CreatorBase", function() {
  it("No instantiation", function() {
    assert.throws(() => new CreatorBase());
  });
});

describe("Configuration", function() {
  it("Default", function() {
    let c = new Configuration();
    assert.equal(c.populationSize, 100);
    assert.equal(c.mateFraction, 0.1);
  });

  it("Valid", function() {
    let c = new Configuration();
    c.populationSize = 1000.5;
    c.mateFraction = 0.4;
    assert.equal(c.populationSize, 1000);
    assert.equal(c.mateFraction, 0.4);
  });

  it("Invalid size", function() {
    let c = new Configuration();
    assert.throws(() => c.populationSize = 0);
    assert.throws(() => c.populationSize = 0.9);
  });

  it("Invalid mateFraction", function() {
    let c = new Configuration();
    assert.throws(() => c.mateFraction = 0);
    assert.throws(() => c.mateFraction = -0.1);
    assert.throws(() => c.mateFraction = 1.1);
  });
});

describe("Simulator", function() {
  let normalGen = createNormalGen(0, 0.1);
  let nextValueGen = undefined;
  let fitnessFn = undefined;

  beforeEach(function() {
    nextValueGen = function* () {
      do {
        yield Math.random();
      } while (true);
    }();
    fitnessFn = function(x) {
      return x * (1 - x);
    };
  });

  class Individual extends IndividualBase {
    constructor(x) {
      super();
      this.x_ = x;
    }

    getValue() {
      return this.x_;
    }

    getFitnessScore() {
      return fitnessFn(this.x_);
    }

    mateWith(partner) {
      let children = [];
      let x = (this.x_ + partner.x_) / 2;
      children.push(new Individual(x));
      return children;
    }

    mutate() {
      this.x_ = this.x_ + normalGen.next().value;
      if (this.x_ < 0) {
        this.x_ = 0;
      }
      if (this.x_ > 1) {
        this.x_ = 1;
      }
      return this;
    }
  }

  class Creator extends CreatorBase {
    constructor() {
      super();
    }

    createIndividual() {
      return new Individual(nextValueGen.next().value);
    }
  }

  let config = new Configuration();
  config.populationSize = 8;
  config.mateFraction = 0.5;

  it("Initialize creates population (in descending fitness order)", function() {
    nextValueGen = function* () {
      yield 0.6;
      yield 0.3;
      yield 0.9;
      yield 0.5;
      yield 0.1;
      yield 0.2;
      yield 0.4;
      yield 0.8;
    }();

    let sim = new Simulator(config, new Creator());
    sim.initialize();
    assert.equal(sim.population_.length, 8);
    assert.closeTo(
      sim.population_[0].getFitnessScore(), 0.25, 1e-6); // x = 0.5
    assert.closeTo(
      sim.population_[7].getFitnessScore(), 0.09, 1e-6); // x = 0.1
  });

  describe("Sample", function() {

    it("Sample prefers fitter individuals (for +ve fitness)", function() {
      let sim = new Simulator(config, new Creator());
      sim.initialize();
      assert.equal(sim.population_.length, 8);
      let fittestCount = 0;
      let leastFittestCount = 0;
      for (let i = 0; i < 1000; i++) {
        let parents = sim.sampleParents();
        assert.equal(parents.length, 4);
        if (parents.includes(sim.population_[0])) {
          fittestCount++;
        }
        if (parents.includes(sim.population_[7])) {
          leastFittestCount++;
        }
      }
      assert.isAbove(fittestCount, leastFittestCount);
      assert.isAbove(leastFittestCount, 0);
    });

    it("Sample prefers higher rank individuals (for -ve fitness)", function() {
      fitnessFn = function(x) {
        return x * (1 - x) - 0.25;
      };
      nextValueGen = function* () {
        yield 0.6;
        yield 0.3;
        yield 0.9;
        yield 0.5;
        yield 0.1;
        yield 0.2;
        yield 0.4;
        yield 0.8;
      }();

      let sim = new Simulator(config, new Creator());
      sim.initialize();
      assert.equal(sim.population_.length, 8);
      assert.closeTo(
        sim.population_[0].getFitnessScore(), 0.0, 1e-6); // x = 0.5
      assert.closeTo(
        sim.population_[7].getFitnessScore(), -0.16, 1e-6); // x = 0.1
      let fittestCount = 0;
      let leastFittestCount = 0;
      for (let i = 0; i < 1000; i++) {
        let parents = sim.sampleParents();
        assert.equal(parents.length, 4);
        if (parents.includes(sim.population_[0])) {
          fittestCount++;
        }
        if (parents.includes(sim.population_[7])) {
          leastFittestCount++;
        }
      }
      assert.isAbove(fittestCount, leastFittestCount);
      assert.isAbove(leastFittestCount, 0);
    });
  });

  describe("Add Individual", function() {

    it("Add individual fitter than the fittest yet", function() {
      nextValueGen = function* () {
        for (let i = 0; i < 8; i++) {
          yield 0.01 * i;
        }
        yield 0.5;
      }();

      let sim = new Simulator(config, new Creator());
      sim.initialize();
      assert.closeTo(
        sim.population_[0].getFitnessScore(), 0.0651, 1e-6); // x = 0.07
      assert.closeTo(
        sim.population_[7].getFitnessScore(), 0, 1e-6); // x = 0

      let fittest = sim.creator_.createIndividual();
      sim.addIndividual(fittest);

      assert.equal(sim.population_.length, 8);
      assert.closeTo(
        sim.population_[0].getFitnessScore(), 0.25, 1e-6); // x = 0.5
      assert.closeTo(
        sim.population_[1].getFitnessScore(), 0.0651, 1e-6); // x = 0.07
      assert.closeTo(
        sim.population_[7].getFitnessScore(), 0.0099, 1e-6); // x = 0.01
    });

    it("Add individual unfitter than the unfittest yet", function() {
      nextValueGen = function* () {
        for (let i = 0; i < 8; i++) {
          yield 0.01 * (i + 1);
        }
        yield 0.0;
      }();

      let sim = new Simulator(config, new Creator());
      sim.initialize();
      assert.closeTo(
        sim.population_[0].getFitnessScore(), 0.0736, 1e-6); // x = 0.08
      assert.closeTo(
        sim.population_[7].getFitnessScore(), 0.0099, 1e-6); // x = 0.01

      let unfittest = sim.creator_.createIndividual();
      sim.addIndividual(unfittest);

      assert.equal(sim.population_.length, 8);
      assert.closeTo(
        sim.population_[0].getFitnessScore(), 0.0736, 1e-6); // x = 0.08
      assert.closeTo(
        sim.population_[7].getFitnessScore(), 0.0099, 1e-6); // x = 0.01
    });

    it("Add an average individual", function() {
      nextValueGen = function* () {
        for (let i = 0; i < 8; i++) {
          yield 0.1 * i;
        }
        yield 0.35;
      }();

      let sim = new Simulator(config, new Creator());
      sim.initialize();
      assert.closeTo(
        sim.population_[0].getFitnessScore(), 0.25, 1e-6); // x = 0.5
      assert.closeTo(
        sim.population_[7].getFitnessScore(), 0.0, 1e-6); // x = 0.0

      let average = sim.creator_.createIndividual();
      sim.addIndividual(average);

      assert.equal(sim.population_.length, 8);
      assert.closeTo(
        sim.population_[0].getFitnessScore(), 0.25, 1e-6); // x = 0.5
      assert.equal(sim.population_[3], average);
      assert.closeTo(
        sim.population_[7].getFitnessScore(), 0.09, 1e-6); // x = 0.1
    });
  });

  describe("Tick", function() {
    it("Adds children and prunes", function() {
      let sim = new Simulator(config, new Creator());
      sim.initialize();
      assert.equal(sim.population_.length, 8);
      sim.tick();
      assert.equal(sim.population_.length, 8);
      for (let i = 0; i < 8; i++) {
        assert.isTrue(sim.population_.lastIndexOf(sim.population_[i]) === i);
      }
    });
  });

  describe("Run", function() {
    it("Converges", function() {
      let sim = new Simulator(config, new Creator());
      sim.run();
      assert.equal(sim.population_.length, 8);
      sim.tick();
      assert.equal(sim.population_.length, 8);
      for (let i = 0; i < 8; i++) {
        assert.isTrue(sim.population_.lastIndexOf(sim.population_[i]) === i);
      }
      assert.closeTo(sim.population_[0].getFitnessScore(), 0.25, 1e-3);
      assert.isBelow(sim.time_, config.maxGenerations);
    });
  });
});
