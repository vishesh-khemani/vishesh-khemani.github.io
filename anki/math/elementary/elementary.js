// Requires util.js and common.js.

function placeValue(numDigits) {
  let placeStrings = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands',
                      'hundred thousands', 'millions', 'ten millions',
                      'hundred millions'];
  [num, digits] = randomIntWithNDigits(numDigits);
  let place = randomIntInRange(Math.max(0, numDigits - 3), numDigits);

  // Question.
  let html = `What is the digit at the <b>${placeStrings[place]}</b> place ` +
             `in <b>${num.toLocaleString()}</b>?\n`;

  addFormAndDisplay(html, (guess) => {
    let answer = digits[numDigits - place -1];
    return [answer == guess, answer];
  })
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

function compareFractions(sameNumerator, sameDenominator) {
  // Params.
  let d1 = randomIntInRange(1, 13);
  let d2 = (sameDenominator ? d1 : randomIntInRange(1, 13));
  let n1 = randomIntInRange(1, 13);
  let n2 = (sameNumerator ? n1 : randomIntInRange(1, 13));
  let f1 = math.fraction(n1, d1);
  let f2 = math.fraction(n2, d2);

  // Question.
  let html = `Consider the two fractions <b>${f1.toFraction()}</b> and ` +
             `<b>${f2.toFraction()}</b>. ` +
             `Is the first fraction '>', '=', or '<' compared to the second ` +
             `fraction?`;

  addFormAndDisplay(html, (guess) => {
    let a = f1.compare(f2);
    switch (f1.compare(f2)) {
      case 0:
        return [guess == '=', '='];
      case -1:
        return [guess == '<', '<'];
      case 1:
        returb [guess == '>', '>'];
    }
  });
}
