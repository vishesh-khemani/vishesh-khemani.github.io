function randomIntInRange(minInclusive, maxExclusive) {
  if (maxExclusive <= minInclusive) {
    throw new RangeError(`${maxExclusive} must be > ${minInclusive}`);
  }
  let x = Math.random();
  let range = maxExclusive - minInclusive;
  return minInclusive + Math.floor(x * range);
}

function randomIntWithNDigits(numDigits, base = 10) {
  let num = 0;
  for (let i = 0; i < numDigits; ++i) {
    let digit = (i == (numDigits - 1) ?
      randomIntInRange(1, base) : randomIntInRange(0, base));
    num = num + Math.pow(base, i) * digit;
  }
  return num;
}

function getDigits(n, base = 10) {
  let digits = [];
  while (n > 0) {
    digits.push(n % base);
    n = Math.floor(n / base);
  }
  return digits;
}

class Point {
  constructor(x, y) {
    this.x_ = x;
    this.y_= y;
  }

  x() {
    return this.x_;
  }

  y() {
    return this.y_;
  }

  translate(by) {
    return new Point(this.x() + by.x(), this.y() + by.y());
  }

  reflectAcrossHorizontal(shift) {
    return new Point(this.x(), 2 * shift - this.y());
  }

  reflectAcrossVertical(shift) {
    return new Point(2 * shift - this.x(), this.y());
  }

  rotateAroundOrigin(num90Counter) {
    let p = new Point(this.x(), this.y());
    for (let i = 0; i < num90Counter; ++i) {
      p = new Point(-p.y(), p.x());
    }
    return p;
  }

  dilateAtOrigin(scale) {
    return new Point(scale * this.x(), scale * this.y());
  }
}
