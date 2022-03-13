describe("Run", function() {
  describe("1D", function() {
    it("Maximizes x(1-x)", function() {
      let fn = (x) => {
        return x * (1 - x);
      }
      let config = new Configuration();
      let creator = new Creator(fn, new RealInterval(0, 1));
      let sim = new Simulator(config, creator);
      sim.run();
      assert.isBelow(sim.time_, config.maxGenerations_);
      assert.closeTo(sim.population_[0].getFitnessScore(), 0.25, 1e-3);
    });

    it("Solves x^2 = 2", function() {
      let fn = (x) => {
        return -Math.abs(Math.pow(x, 2) - 2);
      }
      let config = new Configuration();
      let creator = new Creator(fn, new RealInterval(-4, 4));
      let sim = new Simulator(config, creator);
      sim.run();
      assert.isBelow(sim.time_, config.maxGenerations_);
      assert.closeTo(
        Math.abs(sim.population_[0].getValues()[0]), Math.sqrt(2), 0.1);
    });
  });

  describe("2D", function() {
    it("Maximizes y - x", function() {
      let fn = (x, y) => {
        return y - x;
      }
      let config = new Configuration();
      let creator = new Creator(fn, new RealInterval(-1, 1), new RealInterval(-1, 1));
      let sim = new Simulator(config, creator);
      sim.run();
      assert.isBelow(sim.time_, config.maxGenerations_);
      assert.closeTo(sim.population_[0].getFitnessScore(), 2, 0.1);
    });
  });
});
