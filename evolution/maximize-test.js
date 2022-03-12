describe("Run", function() {
  it("Works for x(1-x)", function() {
    let isValid = (x) => {
      return x >= 0 && x <= 1;
    }
    let fn = (x) => {
      return x * (1 - x);
    }
    let config = new Configuration();
    let creator = new Creator(isValid, fn);
    let sim = new Simulator(config, creator);
    sim.run();
    assert.closeTo(sim.population_[0].getFitnessScore(), 0.25, 1e-3);
  });

  it("Works for -(x - 2)^2", function() {
    let isValid = (x) => {
      return x >= -4 && x <= 4;
    }
    let fn = (x) => {
      return -Math.pow(x - 2, 2);
    }
    let config = new Configuration();
    let creator = new Creator(isValid, fn);
    let sim = new Simulator(config, creator);
    sim.run();
    assert.closeTo(sim.population_[0].getFitnessScore(), 0, 1e-3);
  });
});
