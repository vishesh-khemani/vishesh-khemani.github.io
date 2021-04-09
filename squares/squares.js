"use strict"

function isSquare(n) {
  let r = Math.sqrt(n);
  return r == Math.round(r);
}

function order(orderedBeginning, unorderedEnd) {
  if (unorderedEnd.length == 1) {
    let first = orderedBeginning[0];
    let penultimate = orderedBeginning[orderedBeginning.length - 1];
    let last = unorderedEnd[0];
    if (isSquare(first + last) && isSquare(penultimate + last)) {
      return orderedBeginning.concat(unorderedEnd);
    } else {
      return [];
    }
  }
  let n = orderedBeginning[orderedBeginning.length - 1];
  for (let i = 0; i < unorderedEnd.length; ++i) {
    if (isSquare(n + unorderedEnd[i])) {
      let newBeginning = [...orderedBeginning];
      newBeginning.push(unorderedEnd[i]);
      let newEnd = [...unorderedEnd];
      newEnd.splice(i, 1);
      let result = order(newBeginning, newEnd);
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
}
