// Requires util.js and common.js.

function placeValue(numDigits) {
  if (!areParamsDefined()) {
    let n = randomIntWithNDigits(numDigits);
    let p = randomIntInRange(Math.max(0, numDigits - 3), numDigits);

    let placeStrings = ['ones', 'tens', 'hundreds', 'thousands',
                        'ten thousands', 'hundred thousands', 'millions',
                        'ten millions', 'hundred millions'];
    addQuestion(`What is the digit at the <b>${placeStrings[p]}</b> place ` +
                `in <b>${n.toLocaleString()}</b>?`);

    let digits = getDigits(n);
    addAnswer(digits[p]);
  }
  displayQuestion();
}

function piesFraction() {
  if (!areParamsDefined()) {
    let numPies = randomIntInRange(2, 10);
    let numSlicesPerPie = randomIntInRange(2, 9);
    let numSlicesPicked = randomIntInRange(1, numPies * numSlicesPerPie + 1);
    addQuestion(`There are <b>${numPies}</b> pies. Each pie is cut into ` +
                `<b>${numSlicesPerPie}</b> equal pieces. You eat ` +
                `<b>${numSlicesPicked}</b> pieces. How much pie did you eat ` +
                `(as a fraction of a pie)?`);
    let answer = math.fraction(numSlicesPicked, numSlicesPerPie);
    addAnswer(answer.toFraction(true));
  }
  displayQuestion();
}

function equivalentFractions() {
  if (!areParamsDefined()) {
    let n1 = randomIntInRange(1, 13);
    let d1 = randomIntInRange(1, 13);
    let gcd = math.gcd(n1, d1);
    if (gcd > 1) {
      n2 = n1 / gcd;
      d2 = d1 / gcd;
    } else {
      let a = randomIntInRange(2, 6);
      n2 = n1 * a;
      d2 = d1 * a;
    }
    switch (randomIntInRange(0, 4)) {
      case 0:
      ans = n1;
      n1 = '?';
      break;
      case 1:
      ans = d1;
      d1 = '?';
      break;
      case 2:
      ans = n2;
      n2 = '?';
      break;
      case 3:
      ans = d2;
      d2 = '?';
      break;
    }
    addQuestion(`<b>${n1}/${d1}</b> = <b>${n2}/${d2}</b>`);
    addAnswer(ans);
  }
  displayQuestion();
}

function compareFractions(sameNumerator, sameDenominator) {
  if (!areParamsDefined()) {
    let d1 = randomIntInRange(1, 13);
    let d2 = (sameDenominator ? d1 : randomIntInRange(1, 13));
    let n1 = randomIntInRange(1, 13);
    let n2 = (sameNumerator ? n1 : randomIntInRange(1, 13));

    addQuestion(`Consider the two fractions <b>${n1}/${d1}</b> and ` +
      `<b>${n2}/${d2}</b>. Is the first fraction greater than, ` +
      `less than or equal to the second fraction?`);

      let f1 = math.fraction(n1, d1);
      let f2 = math.fraction(n2, d2);
      let answer = '';
      switch (f1.compare(f2)) {
        case 0:
          answer = 'equal';
          break;
        case -1:
          answer = 'less than';
          break;
        case 1:
          answer = 'greater than';
          break;
      }
      addAnswer(answer);
    }
  displayQuestion();
}

function multiplyByPowersOfTen(p) {
  if (!areParamsDefined()) {
    let a = randomIntInRange(1, 1_000);
    let b = Math.pow(10, p);
    let ans = a * b;

    addQuestion(`What is <b>${a.toLocaleString()}</b> x <b>${b}</b>?`);
    addAnswer(ans);
  }
  displayQuestion();
}

function divideByPowersOfTen(p) {
  if (!areParamsDefined()) {
    let b = Math.pow(10, p);
    let a = randomIntInRange(1, Math.max(1_000, b * 10));
    let rem = a % b;
    let ans = `${Math.floor(a / b)}R${rem}`;

    addQuestion(`What is <b>${a.toLocaleString()}</b> / <b>${b}</b> ` +
                `(in the form <i>&ltquot&gt</i>R<i>&ltrem&gt</i>)?`);
    addAnswer(ans);
  }
  displayQuestion();
}

function multiplyNDigitsByMDigits(n, m) {
  if (!areParamsDefined()) {
    let a = randomIntWithNDigits(n);
    let b = randomIntWithNDigits(m);
    let ans = a * b;

    addQuestion(`What is <b>${a.toLocaleString()}</b> x <b>${b}</b>?`);
    addAnswer(ans);
  }
  displayQuestion();
}

function divideNDigitsByMDigits(n, m) {
  if (!areParamsDefined()) {
    let a = randomIntWithNDigits(n);
    let b = randomIntWithNDigits(m);
    let rem = a % b;
    let ans = `${Math.floor(a / b)}R${rem}`;

    addQuestion(`What is <b>${a.toLocaleString()}</b> / <b>${b}</b> ` +
               `(in the form <i>&ltquot&gt</i>R<i>&ltrem&gt</i>)?`);
    addAnswer(ans);
  }
  displayQuestion();
}

function convertToBase10(numDigits, fromBase) {
  if (!areParamsDefined()) {
    let n = randomIntWithNDigits(numDigits, fromBase);
    let digits = getDigits(n, fromBase);
    let numInBase = '';
    for (let i = numDigits; i > 0; --i) {
      numInBase += `${digits[i - 1]}`;
    }
    addQuestion(`What is the <b>base-${fromBase}</b> number ` +
                `<b>${numInBase}</b> in base 10?`);
    addAnswer(n);
  }
  displayQuestion();
}

function addInBase(numDigits, base) {
  if (!areParamsDefined()) {
    let n1 = randomIntWithNDigits(numDigits, base);
    let digits1 = getDigits(n1, base);
    let n1InBase = '';
    for (let i = numDigits; i > 0; --i) {
      n1InBase += `${digits1[i - 1]}`;
    }
    let n2 = randomIntWithNDigits(numDigits, base);
    let digits2 = getDigits(n2, base);
    let n2InBase = '';
    for (let i = numDigits; i > 0; --i) {
      n2InBase += `${digits2[i - 1]}`;
    }
    addQuestion(`What is the sum of the <b>base-${base}</b> numbers ` +
                `<b>${n1InBase}</b> and <b>${n2InBase}</b> in base-${base}?`);
    let ansDigits = getDigits(n1 + n2, base);
    let ans = '';
    for (let i = ansDigits.length; i > 0; --i) {
      ans += `${ansDigits[i - 1]}`;
    }
    ans += `in base-${base}`;
    addAnswer(ans);
  }
  displayQuestion();
}

function subtractInBase(numDigits, base) {
  if (!areParamsDefined()) {
    let n1 = randomIntWithNDigits(numDigits, base);
    let digits1 = getDigits(n1, base);
    let n1InBase = '';
    for (let i = numDigits; i > 0; --i) {
      n1InBase += `${digits1[i - 1]}`;
    }
    let n2 = randomIntInRange(0, n1);
    let digits2 = getDigits(n2, base);
    let n2InBase = '';
    for (let i = digits2.length; i > 0; --i) {
      n2InBase += `${digits2[i - 1]}`;
    }
    addQuestion(`What is the difference between the <b>base-${base}</b> ` +
                `numbers <b>${n1InBase}</b> and <b>${n2InBase}</b> in ` +
                `base-${base}?`);
    let ansDigits = getDigits(n1 - n2, base);
    let ans = '';
    for (let i = ansDigits.length; i > 0; --i) {
      ans += `${ansDigits[i - 1]}`;
    }
    ans += ` in base-${base}`;
    addAnswer(ans);
  }
  displayQuestion();
}
