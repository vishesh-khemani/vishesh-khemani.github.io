// Requires util.js and common.js.

function placeValue(numDigits) {
  let placeStrings = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands',
                      'hundred thousands', 'millions', 'ten millions',
                      'hundred millions'];
  [num, digits] = randomIntWithNDigits(numDigits);
  let place = randomIntInrange(0, numDigits);

  // Question.
  let html = `What is the digit at the ${placeStrings[place]} place in ` +
            `${num}?\n`;

  addFormAndDisplay(html, (guess) => {
    let answer = digits[place];
    return [answer == guess, answer];
  })
}

function piesFraction() {
  // Params.
  let numPies = randomIntInRange(2, 6);
  let numSlicesPerPie = randomIntInRange(2, 17);
  let numSlicesPicked = randomIntInRange(1, numPies * numSlicesPerPie + 1);
  let answer = math.fraction(numSlicesPicked, numSlicesPerPie);

  // Question.
  let html = `There are ${numPies} pies, each cut into ${numSlicesPerPie} ` +
             `equal pieces. You eat ${numSlicesPicked} pieces. How much pie ` +
             `did you eat?`;

  addFormAndDisplay(html, (guess) => {
    let isCorrect = false;
    try {
      let f = math.fraction(guess);
      isCorrect = f.equals(answer);
    } catch (err) {}
    return [isCorrect, answer.toFraction(true)];
  });
}

function compareFractionsSameDenominator() {
  // Params.
  let d = randomIntInRange(1, 20);
  let f1 = math.fraction(randomIntInRange(0, 20), d);
  let f2 = math.fraction(randomIntInRange(0, 20), d);

  // Question.
  let html = `Compare ${f1.toFraction()} to ${f2.toFraction()}. ` +
             `Is the first fraction '>', '=', or '<'?`;

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

function compareFractionsSameNumerator() {
  // Params.
  let n = randomIntInRange(1, 20);
  let f1 = math.fraction(n, randomIntInRange(1, 20));
  let f2 = math.fraction(n, randomIntInRange(1, 20));

  // Question.
  let html = `Compare ${f1.toFraction()} to ${f2.toFraction()}. ` +
             `Is the first fraction '>', '=', or '<'?`;

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

function compareFractions() {
  // Params.
  let f1 = math.fraction(randomIntInRange(0, 20), randomIntInRange(1, 20));
  let f2 = math.fraction(randomIntInRange(0, 20), randomIntInRange(1, 20));

  // Question.
  let html = `Compare ${f1.toFraction()} to ${f2.toFraction()}. ` +
             `Is the first fraction '>', '=', or '<'?`;

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
