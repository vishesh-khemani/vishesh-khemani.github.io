var number = Math.round(Math.random()*100+0.5);
var guess = prompt("Guess a number between 1 and 100:");
while( guess != number) {
  if (guess > number) {
    alert("Too high.");
    guess = prompt("Guess again:")
  } else if (guess < number) {
    alert("Too low.");
    guess = prompt("Guess again:")
  }
}
alert("Spot on! You guessed the right number.");
