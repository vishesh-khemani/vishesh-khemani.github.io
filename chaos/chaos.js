"use strict"

function map(r, x) {
  return  math.multiply(math.multiply(r, x), math.subtract(math.fraction(1, 1), x));
}

function iterate(n, r, x0) {
  let seq = [x0.valueOf().toFixed(3)];
  for (let i = 0; i < n; i++) {
    x0 = map(r, x0);
    seq.push(x0.valueOf().toFixed(3));
  }
  return seq;
}
