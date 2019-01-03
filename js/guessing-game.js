/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber(){
  return Math.floor(Math.random() * 100) + 1 
}

let winningNumber = generateWinningNumber()

function shuffle(array){
    for (let i=0; i<array.length; i++){
      let rand = Math.floor(Math.random() * array.length)
      let temp = array[rand]
      array[rand] = array[i]
      array[i] = temp
    }
    return array.reverse();
}

class Game {
  constructor(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.guessCount = 5;
  }
  
  difference(){
    //returns absolute val of difference between playersGuess and winningNumber
    return Math.abs(this.playersGuess - this.winningNumber)
  };
  isLower(){
    return (this.playersGuess < this.winningNumber)? true : false
  };
  playersGuessSubmission(num){
    if (num < 1 || num > 100 || typeof num !== 'number') throw 'That is an invalid guess.'
    this.playersGuess = num;
    return this.checkGuess()
  };
  checkGuess(){
    if (this.playersGuess === this.winningNumber) {
      return 'You Win!';
    }
    
    if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    }  
    
    if (this.playersGuess !== this.winningNumber && !(this.pastGuesses.includes(this.playersGuess)) && this.playersGuess!==null) {
      this.pastGuesses.push(this.playersGuess)
      this.playersGuess = null
    }
    
    if (this.pastGuesses.length>=5) {
      return 'You Lose.';
    }
      
    if (this.difference() < 10 ) {
      return 'You\'re burning up!';
    }
      
    if (this.difference() < 25 ) {
      return 'You\'re lukewarm.';
    }  
    if (this.difference() < 50 ) {
      return 'You\'re a bit chilly.';
    }
    if (this.difference() < 100 ) {
      return 'You\'re ice cold!';
    }
  }; 
  provideHint(){
    let hintArray = [this.winningNumber]
    hintArray.push(generateWinningNumber())
    hintArray.push(generateWinningNumber())
    return shuffle(hintArray)
  }; 
}

function newGame(){
  return new Game()
};

let game = newGame()

const submit = document.getElementById("submit");
const textbox = document.getElementById('textbox');
const restart = document.getElementById('restart');
const hint = document.getElementById('hint')

submit.addEventListener("click", function(event){
   let guess = parseInt(textbox.value)
   game.playersGuessSubmission(guess)
   textbox.value = ""
   let pastGuesses = document.getElementById('pastGuesses')
   console.log('guess:', game.playersGuess)
   console.log('pastGuesses:', game.pastGuesses)
   console.log('winning:', game.winningNumber)
   let guessArray = game.pastGuesses
   pastGuesses.innerHTML = `<strong>Guesses:</strong> ${guessArray.join(" ")}`
   let hintNumbers = document.getElementById('hints')
    hintNumbers.classList.remove('visible')
    hintNumbers.classList.add('hidden')
    let remaining = document.getElementById('remaining')
    game.guessCount--
    remaining.innerHTML = `You have ${game.guessCount} guesses remaining...`
    let tempRating = document.getElementById('temp')
   tempRating.innerHTML = game.checkGuess()
   tempRating.classList.remove('hidden')
   tempRating.classList.add('visible')
   
});

restart.addEventListener("click", function(event){
  game = newGame()
  let hintNumbers = document.getElementById('hints')
  hintNumbers.classList.remove('visible')
  hintNumbers.classList.add('hidden')
  let tempRating = document.getElementById('temp')
   tempRating.classList.remove('visible')
   tempRating.classList.add('hidden')
  game.guessCount = 5
  let remaining = document.getElementById('remaining')
  remaining.innerHTML = `You have ${game.guessCount} guesses remaining...`
});

hint.addEventListener("click", function(event){
  let hints = game.provideHint()
  let hintNumbers = document.getElementById('hints')
  hintNumbers.innerHTML = `The secret number is ${hints[0]}, ${hints[1]}, or ${hints[2]}`
  hintNumbers.classList.remove('hidden')
  hintNumbers.classList.add('visible')
});
