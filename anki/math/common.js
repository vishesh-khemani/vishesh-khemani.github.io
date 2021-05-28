function addFormAndDisplay(html, checkFunc) {
  html += `<form id="answerForm">\n` +
          `  <input type="text" name="answer" value="">` +
          `  <input type="submit" value="Check">\n` +
          `</form>`;
  document.getElementById('front').innerHTML = html;
  document.getElementById('answerForm').onsubmit = (event) => {
    [isCorrect, answer] =
      checkFunc(document.forms.answerForm.elements.answer.value);
    let html = '';
    if (isCorrect) {
      html = `<div style="background-color:green;">Correct!</div>`;
    } else {
      html = `<div style="background-color:yellow;">` +
             `Well, I think it is ${answer}</div>`;
    }
    document.getElementById('checkAnswer').innerHTML = html;
    event.preventDefault();
  }
}
