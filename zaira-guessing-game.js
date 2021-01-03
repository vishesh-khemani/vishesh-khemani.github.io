var name = prompt("Welcome! What is your name?")
var number = Math.round(Math.random() * 100 + 0.5);
var guess = prompt("Guess a number between 1 and 100");
while(guess != number) {
  if ( guess > number ) {
    alert("Too high! Try again.");
  }
  else if ( guess < number ) {
    alert("Too low! Give it another shot.");
  }
  guess = prompt("Guess again:");
}
alert("You guessed it! Nice work!");
for(var n = 1; n<= 500; n = n + 1) {
  document.write(name + " wins! ");
}
