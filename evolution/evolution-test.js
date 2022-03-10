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
  it("Initialize", function() {
    let config = new Configuration();
    config.populationSize = 4;
    config.mateFraction = 0.5;

    class Individual extends IndividualBase {
      constructor(score) {
        super();
        this.score_ = score;
      }

      getFitnessScore() {
        return this.score_;
      }
    }

    class Creator extends CreatorBase {
      constructor() {
        super();
        this.numCreated_ = 0;

      }

      createIndividual() {
        this.numCreated_++;
        return new Individual(this.numCreated_);
      }
    }

    let sim = new Simulator(config, new Creator());
    sim.initialize();
    assert.equal(sim.population_.length, 4);
    assert.equal(sim.population_[0].getFitnessScore(), 4);
    assert.equal(sim.population_[1].getFitnessScore(), 3);
    assert.equal(sim.population_[2].getFitnessScore(), 2);
    assert.equal(sim.population_[3].getFitnessScore(), 1);
  });
});
