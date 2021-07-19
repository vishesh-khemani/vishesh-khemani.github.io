"use strict"

function map(r, x) {
  return  math.multiply(math.multiply(r, x), math.subtract(math.fraction(1, 1), x));
}

function iterate(n, r, x0) {
  let seq = [x0.valueOf()];
  for (let i = 0; i < n; i++) {
    x0 = map(r, x0);
    seq.push(x0.valueOf());
  }
  return seq;
}

function getIrrational(prefix, numAdditionalDigits) {
  let t = prefix;
  let n = 0;
  while (t != Math.floor(t)) {
    t = t * 10;
    ++n;
  }
  let x = prefix;
  for (let i = 0; i < numAdditionalDigits; ++i) {
    x = x + Math.floor(Math.random()*10) / Math.pow(10, n + i + 1)
  }
  return x;
}
