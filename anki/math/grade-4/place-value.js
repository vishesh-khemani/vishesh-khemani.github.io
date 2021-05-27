window.problem = {
  a: Math.floor(Math.random() * 1_000_000_000),
  placeStrings: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions', 'hundred millions']
};
problem.place = Math.floor(Math.random() * 9);

let html = `What is the digit at the ${problem.placeStrings[problem.place]} place in ${problem.a}?\n`;
document.getElementById('front').innerHTML = html;
