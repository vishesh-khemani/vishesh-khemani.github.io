function translate2D(numPoints) {
  if (!areParamsDefined()) {
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

    let html = `Translate the following:<br>` +
               `<ol>`;
    for (let i = 0; i < numPoints; ++i) {
      html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
    }
    html = html + `</ol>` +
                  `By (${by.x()}, ${by.y()}).`
    addQuestion(html);
    addAnswer(ans);
  }
  displayQuestion();
}

function reflectAcrossHorizontal(numPoints) {
  if (!areParamsDefined()) {
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

    let html = `Reflect the following:<br>` +
               `<ol>`;
    for (let i = 0; i < numPoints; ++i) {
      html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
    }
    html = html + `</ol>` +
                  `Across the line <i>y = ${shift}</i>.`;
    addQuestion(html);
    addAnswer();
  }
  displayQuestion(ans);
}

function reflectAcrossVertical(numPoints) {
  if (!areParamsDefined()) {
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

    let html = `Reflect the following:<br>` +
               `<ol>`;
    for (let i = 0; i < numPoints; ++i) {
      html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
    }
    html = html + `</ol>` +
                  `Across the line <i>x = ${shift}</i>.`;
    addQuestion(html);
    addAnswer(ans);
  }
  displayQuestion();
}

function rotateAroundOrigin(numPoints) {
  if (!areParamsDefined()) {
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

    let html = `Rotate the following:<br>` +
               `<ol>`;
    for (let i = 0; i < numPoints; ++i) {
      html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
    }
    html = html + `</ol>` +
                  `Counterclockwise about the origin by ` +
                  `<i>${num90Counter * 90} degrees</i>.`;
    addQuestion(html);
    addAnswer(ans);
  }
  displayQuestion();
}

function dilateAtOrigin(numPoints) {
  if (!areParamsDefined()) {
    let scale = (Math.random() < 0.5 ? randomIntInRange(2, 5) : 0.5);
    let ans = '';
    let points = [];
    for (let i = 0; i < numPoints; ++i) {
      let p = new Point(randomIntInRange(-5, 6), randomIntInRange(-5, 6));
      points.push(p);
      let pImage = p.dilateAtOrigin(scale);
      ans = ans + `(${pImage.x()}, ${pImage.y()}) `;
    }
    ans = ans.trim();

    let html = `Dilate the following:<br>` +
               `<ol>`;
    for (let i = 0; i < numPoints; ++i) {
      html = html + `<li>(${points[i].x()}, ${points[i].y()})</li> `
    }
    html = html + `</ol>` +
                  `By <i>${scale}</i>, centered at the origin.`;
    addQuestion(html);
    addAnswer(ans);
  }
  displayQuestion();
}
