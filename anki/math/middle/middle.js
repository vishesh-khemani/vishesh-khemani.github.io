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
    addAnswer(ans);
  }
  displayQuestion();
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

function supplementaryAngles() {
  if (!areParamsDefined()) {
    let a = randomIntInRange(1, 180);
    let html = `Angles APE and BPE are supplementary. ` +
               `The angle <b>APE</b> is <b>${a}</b> degrees. ` +
               `What is the angle <b>BPE</b>?`
    addQuestion(html);
    addAnswer(`${180 - a} degrees`);
  }
  displayQuestion();
}

function complementaryAngles() {
  if (!areParamsDefined()) {
    let a = randomIntInRange(1, 90);
    let html = `Angles ABP and CBP are complementary. ` +
               `The angle <b>ABP</b> is <b>${a}</b> degrees. ` +
               `What is the angle <b>CBP</b>?`
    addQuestion(html);
    addAnswer(`${90 - a} degrees`);
  }
  displayQuestion();
}

function anglesInSlashedParallelLines() {
  if (!areParamsDefined()) {
    let angles = new Map();
    let a = randomIntInRange(1, 90);
    angles.set('EPB', a);
    angles.set('APQ', angles.get('EPB'));  // opposite
    angles.set('APE', 180 - angles.get('EPB'));  // supplementary
    angles.set('BPQ', angles.get('APE'));  // opposite
    angles.set('PQD', angles.get('EPB'));  // corresponding
    angles.set('CQF', angles.get('PQD'));
    angles.set('CQP', angles.get('APE'));
    angles.set('DQF', angles.get('BPQ'));
    let keys = Array.from(angles.keys());
    let given = keys[randomIntInRange(0, angles.size)];
    let find = given;
    while (find === given) {
      find = keys[randomIntInRange(0, angles.size)];
    }
    let html = `AB and CD are parallel lines. ` +
               `The line EF intersects AB at P and CD at Q. ` +
               `The angle <b>${given}</b> is <b>${angles.get(given)}</b> ` +
               `degrees. Find the angle <b>${find}</b>.<br>\n` +
               `<img src='./slashed-parallel-lines.png' width=200>`
    addQuestion(html);
    addAnswer(`${angles.get(find)} degrees`);
  }
  displayQuestion();
}
