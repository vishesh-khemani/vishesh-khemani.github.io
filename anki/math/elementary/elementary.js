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
  // Params.
  let numPies = randomIntInRange(2, 10);
  let numSlicesPerPie = randomIntInRange(2, 9);
  let numSlicesPicked = randomIntInRange(1, numPies * numSlicesPerPie + 1);
  let answer = math.fraction(numSlicesPicked, numSlicesPerPie);

  // Question.
  let html = `There are <b>${numPies}</b> pies. Each pie is cut into ` +
             `<b>${numSlicesPerPie}</b> equal pieces. You eat ` +
             `<b>${numSlicesPicked}</b> pieces. How much pie did you eat ` +
             `(as a fraction of a pie)?`;

  addFormAndDisplay(html, (guess) => {
    let isCorrect = false;
    try {
      let f = math.fraction(guess);
      isCorrect = f.equals(answer);
    } finally {
      return [isCorrect, answer.toFraction(true)];
    }
  });
}

function equivalentFractions() {
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

  let html = `<b>${n1}/${d1}</b> = <b>${n2}/${d2}</b>`;
  addFormAndDisplay(html, (guess) => {
    return [guess == ans, ans];
  });
}

function compareFractions(sameNumerator, sameDenominator) {
  // Params.
  let d1 = randomIntInRange(1, 13);
  let d2 = (sameDenominator ? d1 : randomIntInRange(1, 13));
  let n1 = randomIntInRange(1, 13);
  let n2 = (sameNumerator ? n1 : randomIntInRange(1, 13));

  // Question.
  let html = `Consider the two fractions <b>${n1}/${d1}</b> and ` +
             `<b>${n2}/${d2}</b>. ` +
             `Is the first fraction '>', '=', or '<' compared to the second ` +
             `fraction?`;

  addFormAndDisplay(html, (guess) => {
    let f1 = math.fraction(n1, d1);
    let f2 = math.fraction(n2, d2);
    switch (f1.compare(f2)) {
      case 0:
        return [guess == '=', '='];
      case -1:
        return [guess == '<', '<'];
      case 1:
        return [guess == '>', '>'];
    }
  });
}

function multiplyByPowersOfTen(p) {
  let a = randomIntInRange(1, 1_000);
  let b = Math.pow(10, p);
  let ans = a * b;

  let html = `What is <b>${a.toLocaleString()}</b> x <b>${b}</b>?`;

  addFormAndDisplay(html, (guess) => {
    return [guess == ans, ans];
  });
}

function divideByPowersOfTen(p) {
  let b = Math.pow(10, p);
  let a = randomIntInRange(1, Math.max(1_000, b * 10));
  let rem = a % b;
  let ans = `${Math.floor(a / b)}R${rem}`;

  let html = `What is <b>${a.toLocaleString()}</b> / <b>${b}</b> ` +
             `(in the form <i>&ltquot&gt</i>R<i>&ltrem&gt</i>)?`;

  addFormAndDisplay(html, (guess) => {
    return [guess == ans, ans];
  });
}

function multiplyNDigitsByMDigits(n, m) {
  let a = randomIntWithNDigits(n);
  let b = randomIntWithNDigits(m);
  let ans = a * b;

  let html = `What is <b>${a.toLocaleString()}</b> x <b>${b}</b>?`;

  addFormAndDisplay(html, (guess) => {
    return [guess == ans, ans];
  });
}

function divideNDigitsByMDigits(n, m) {
  let a = randomIntWithNDigits(n);
  let b = randomIntWithNDigits(m);
  let rem = a % b;
  let ans = `${Math.floor(a / b)}R${rem}`;

  let html = `What is <b>${a.toLocaleString()}</b> / <b>${b}</b> ` +
             `(in the form <i>&ltquot&gt</i>R<i>&ltrem&gt</i>)?`;

  addFormAndDisplay(html, (guess) => {
    return [guess == ans, ans];
  });
}
