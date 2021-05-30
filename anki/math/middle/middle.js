function translate2D(numPoints) {
  let by = new Point(randomIntInRange(-5, 6), randomIntInRange(-5, 6));
  let ans = '';
  let points = [];
  for (let i = 0; i < numPoints; ++i) {
    let p = new Point(randomIntInRange(-5, 6), randomIntInRange(-5, 6));
    points.push(p);
    let pImage = p.translate(by);
    ans = ans + `(${pImage.x()}, ${pImage.y()}) `;
  }
  ans = ans.trim();

  let html = `Translate the following:<br>`;
  html = html + `<ol>`
  for (let i = 0; i < numPoints; ++i) {
    html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
  }
  html = html + `</ol>`
  html = html + `By (${by.x()}, ${by.y()}).<br>`
  html = html + `Express the answer in the form <i>(x1, y1) (x2 y2) ...</i>`

  addFormAndDisplay(html, (guess) => {
    guess = guess.trim();
    return [ans == guess, ans];
  })
}
