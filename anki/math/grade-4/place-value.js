function placeValue(numDigits) {
  let placeStrings = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands',
  'hundred thousands', 'millions', 'ten millions', 'hundred millions'];

  // Generate number with numDigits digits.
  digits = [];
  for (let i = 0; i < numDigits; ++i) {
    let digit = Math.random();
    if (i == 0) {
      // [1, 9].
      digit = Math.ceil(digit * 9);
    } else {
      // [0, 9]
      digit = Math.floor(digit * 10);
    }
    digits.push(digit);
  }
  let num = 0;
  for (let i = 0; i < numDigits; ++i) {
    num = num + Math.pow(10, i) * digits[i];
  }

  // Generate place value to test.
  let place = Math.floor(Math.random() * numDigits);

  // Question.
  let html = `What is the digit at the ${placeStrings[place]} place in ${num}?\n`;
  html += `
  <form id="answerForm" onsubmit="event.preventDefault(); checkAnswer(${digits[place]});">
    <input type="text" name="answer" value=""><br>
    <input type="submit" value="Check">
  </form>`;
  return html;
}

function checkAnswer(correctAnswer) {
  let guess = document.forms.answerForm.elements.answer.value;
  let html = '';
  if (guess == correctAnswer) {
    html = "Correct!";
  } else {
    html = `Wrong. It is ${correctAnswer}`;
  }
  document.getElementById('checkAnswer').innerHTML = html;
}

// let html = placeValue(4);
// document.getElementById('front').innerHTML = html;
