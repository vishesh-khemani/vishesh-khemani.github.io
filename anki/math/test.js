describe("randomIntInRange", function() {

  it("Minimal range", function() {
    assert.equal(randomIntInRange(0, 1), 0);
    assert.equal(randomIntInRange(10, 11), 10);
    assert.equal(randomIntInRange(-10, -9), -10);
  });

});
