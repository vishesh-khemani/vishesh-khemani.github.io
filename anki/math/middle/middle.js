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

  let html = `<div align="left";>` +
             `Translate the following:<br>` +
             `<ol>`;
  for (let i = 0; i < numPoints; ++i) {
    html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
  }
  html = html + `</ol>` +
                `By (${by.x()}, ${by.y()}).<br><br>` +
                `Express the answer in the form <i>(x1, y1) (x2 y2) ...</i>` +
                `</div>`;

  addFormAndDisplay(html, (guess) => {
    guess = guess.trim();
    return [ans == guess, ans];
  })
}

function reflectAcrossHorizontal(numPoints) {
  let shift = randomIntInRange(-5, 6);
  let ans = '';
  let points = [];
  for (let i = 0; i < numPoints; ++i) {
    let p = new Point(randomIntInRange(-5, 6), randomIntInRange(-5, 6));
    points.push(p);
    let pImage = p.reflectAcrossHorizontal(shift);
    ans = ans + `(${pImage.x()}, ${pImage.y()}) `;
  }
  ans = ans.trim();

  let html = `<div align="left";>` +
             `Reflect the following:<br>` +
             `<ol>`;
  for (let i = 0; i < numPoints; ++i) {
    html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
  }
  html = html + `</ol>` +
                `Across the line <i>y = ${shift}</i>.<br><br>` +
                `Express the answer in the form <i>(x1, y1) (x2 y2) ...</i>` +
                `</div>`;

  addFormAndDisplay(html, (guess) => {
    guess = guess.trim();
    return [ans == guess, ans];
  })
}

function reflectAcrossVertical(numPoints) {
  let shift = randomIntInRange(-5, 6);
  let ans = '';
  let points = [];
  for (let i = 0; i < numPoints; ++i) {
    let p = new Point(randomIntInRange(-5, 6), randomIntInRange(-5, 6));
    points.push(p);
    let pImage = p.reflectAcrossVertical(shift);
    ans = ans + `(${pImage.x()}, ${pImage.y()}) `;
  }
  ans = ans.trim();

  let html = `<div align="left";>` +
             `Reflect the following:<br>` +
             `<ol>`;
  for (let i = 0; i < numPoints; ++i) {
    html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
  }
  html = html + `</ol>` +
                `Across the line <i>x = ${shift}</i>.<br><br>` +
                `Express the answer in the form <i>(x1, y1) (x2 y2) ...</i>` +
                `</div>`;

  addFormAndDisplay(html, (guess) => {
    guess = guess.trim();
    return [ans == guess, ans];
  })
}

function rotateAroundOrigin(numPoints) {
  let num90Counter = randomIntInRange(1, 4);
  let ans = '';
  let points = [];
  for (let i = 0; i < numPoints; ++i) {
    let p = new Point(randomIntInRange(-5, 6), randomIntInRange(-5, 6));
    points.push(p);
    let pImage = p.rotateAroundOrigin(num90Counter);
    ans = ans + `(${pImage.x()}, ${pImage.y()}) `;
  }
  ans = ans.trim();

  let html = `<div align="left";>` +
             `Rotate the following:<br>` +
             `<ol>`;
  for (let i = 0; i < numPoints; ++i) {
    html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
  }
  html = html + `</ol>` +
                `Counterclockwise about the origin by ` +
                `<i>${num90Counter * 90} degrees</i>.<br><br>` +
                `Express the answer in the form <i>(x1, y1) (x2 y2) ...</i>` +
                `</div>`;

  addFormAndDisplay(html, (guess) => {
    guess = guess.trim();
    return [ans == guess, ans];
  })
}
