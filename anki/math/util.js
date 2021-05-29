function randomIntInRange(minInclusive, maxExclusive) {
  if (maxExclusive <= minInclusive) {
    throw new RangeError(`${maxExclusive} must be > ${minInclusive}`);
  }
  let x = Math.random();
  let range = maxExclusive - minInclusive;
  return minInclusive + Math.floor(x * range);
}

function randomIntWithNDigits(numDigits) {
  digits = [];
  for (let i = 0; i < numDigits; ++i) {
    let digit = (i == 0 ? randomIntInRange(1, 10) : randomIntInRange(0, 10));
    digits.push(digit);
  }
  let num = 0;
  for (let i = 0; i < numDigits; ++i) {
    num = num + Math.pow(10, numDigits - i - 1) * digits[i];
  }
  return [num, digits];
}
