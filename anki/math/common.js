function areParamsDefined() {
  return window["params"] != undefined;
}

function addQuestion(questionHTML) {
  if (!areParamsDefined()) {
    window.params = {};
  }
  window.params["question"] = questionHTML;
}

function addAnswer(answerHTML) {
  if (!areParamsDefined()) {
    window.params = {};
  }
  window.params["answer"] = answerHTML;
}

function displayQuestion() {
  document.getElementById('front').innerHTML = window.params["question"];
}

function displayAnswer() {
  document.getElementById('back').innerHTML = `The correct answer is <b>` +
                                              `${window.params["answer"]}</b>`;
}

function addFormAndDisplay(html, checkFunc) {
  html += `<form id="answerForm">\n` +
          `  <input type="text" name="answer" id="answer" value="">` +
          `  <input type="submit" value="Check">\n` +
          `</form>`;
  document.getElementById('front').innerHTML = html;
  document.getElementById('answer').focus();
  document.getElementById('answerForm').onsubmit = (event) => {
    [isCorrect, answer] =
      checkFunc(document.forms.answerForm.elements.answer.value);
    let html = '';
    if (isCorrect) {
      html = `<div style="background-color:green;">` +
             `Correct! It is ${answer}.` +
             `</div>`;
    } else {
      html = `<div style="background-color:yellow;">` +
             `Hmm, think again because I think it is ${answer}.` +
             `</div>`;
    }
    document.getElementById('checkAnswer').innerHTML = html;
    document.getElementById('answer').blur();
    event.preventDefault();
  }
}
