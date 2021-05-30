function randomIntInRange(minInclusive, maxExclusive) {
  if (maxExclusive <= minInclusive) {
    throw new RangeError(`${maxExclusive} must be > ${minInclusive}`);
  }
  let x = Math.random();
  let range = maxExclusive - minInclusive;
  return minInclusive + Math.floor(x * range);
}

function randomIntWithNDigits(numDigits) {
  let num = 0;
  for (let i = 0; i < numDigits; ++i) {
    let digit = (i == (numDigits - 1) ?
                 randomIntInRange(1, 10) : randomIntInRange(0, 10));
    num = num + Math.pow(10, i) * digit;
  }
  return num;
}

function getDigits(n) {
  let digits = [];
  while (n > 0) {
    digits.push(n % 10);
    n = Math.floor(n / 10);
  }
  return digits;
}
