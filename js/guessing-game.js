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
    this.guessDirection = null;
  }
  
  difference(){
    //returns absolute val of difference between playersGuess and winningNumber
    return Math.abs(this.playersGuess - this.winningNumber)
  };
  isLower(){
    return (this.playersGuess < this.winningNumber)? true : false
  };
  playersGuessSubmission(num){
    if (num < 1 || num > 100 || typeof num !== 'number' || isNaN(num)) throw 'That is an invalid guess.'
    this.playersGuess = num
    return this.checkGuess(num)
  };
  guessLowerOrHigher(num){
    if (num > this.winningNumber){
      this.guessDirection = 'lower'
    }
    if (num < this.winningNumber){
      this.guessDirection = 'higher'
    }
    return this.guessDirection
  };
  checkGuess(guess){
    //if the guess is correct, the player wins!
    if (guess === this.winningNumber) {
      let bawdy = document.getElementById('body')
      bawdy.classList.remove('playing')
      bawdy.classList.add('won')
      return 'You Win!';
    } 
    //if the guess has already been submitted...
    if (this.pastGuesses.includes(guess)) {
      return 'You have already guessed that number.';
    } 
    
    //if the guess is wrong, but it hasn't been guessed before, add it to the list of past guesses
    if (guess !== this.winningNumber && !(this.pastGuesses.includes(guess))) {
    this.pastGuesses.push(guess)
    }
    
    if (this.pastGuesses.length>=5) {
      return `You Lose! The correct number was ${this.winningNumber}.`;
    }
      
    if (this.difference() < 10 ) {
      return `You're burning up! Go a teensy bit ${game.guessLowerOrHigher(guess)}!`;
    }
      
    if (this.difference() < 25 ) {
      return `You're lukewarm. Try going ${game.guessLowerOrHigher(guess)}`;
    }  
    if (this.difference() < 50 ) {
      return `You're a bit chilly. Guess ${game.guessLowerOrHigher(guess)}`;
    }
    if (this.difference() < 100 ) {
      return `You're ice cold! Go ${game.guessLowerOrHigher(guess)}`;
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
const cat = document.getElementById('cat')

function updateGuessDisplay(){
  let pastGuessText = document.getElementById('pastGuesses')
  let guessArray = game.pastGuesses
  pastGuessText.innerHTML = `<strong>Guesses:</strong> ${guessArray.join(" ")}`
}

function clearGuessDisplay(){
  let pastGuessText = document.getElementById('pastGuesses')
  pastGuessText.innerHTML = `<strong>Guesses:</strong>`
}

function clearHints(){
  let hintNumbers = document.getElementById('hints')
  hintNumbers.classList.remove('visible')
  hintNumbers.classList.add('hidden')
}

function updateGuessCount(){
  let remaining = document.getElementById('remaining')
  game.guessCount = 5-(game.pastGuesses.length)
  remaining.innerHTML = `You have ${game.guessCount} guesses remaining...`
}

function updateTextResponse(){
  let guess = parseInt(textbox.value)
  let responseText = document.getElementById('temp')
  //console.log(game)
  responseText.innerHTML = game.playersGuessSubmission(guess)
  responseText.classList.remove('hidden')
  responseText.classList.add('visible')
}

//SUBMIT BUTTON
submit.addEventListener("click", function(event){
    
   clearHints();
   updateTextResponse()
   updateGuessCount();
   updateGuessDisplay();
  
  textbox.value = ""
  
  console.log('guess:', game.playersGuess)
  console.log('pastGuesses:', game.pastGuesses)
  console.log('winning:', game.winningNumber)
  console.log('difference:', game.difference())
});

//RESTART BUTTON
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
  clearGuessDisplay()
  let bawdy = document.getElementById('body')
  bawdy.classList = 'playing'
});

//HINT BUTTON
hint.addEventListener("click", function(event){
  let hints = game.provideHint()
  let hintNumbers = document.getElementById('hints')
  hintNumbers.innerHTML = `The secret number is ${hints[0]}, ${hints[1]}, or ${hints[2]}`
  hintNumbers.classList.remove('hidden')
  hintNumbers.classList.add('visible')
});

//CAT BUTTON
cat.addEventListener("click", function(event){
  let cats = ['playing', 'won', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']
  let cat = cats[Math.floor(Math.random()*cats.length)];
  console.log(cat)
  let bgArea = document.getElementById('body')
  bgArea.classList = cat
});
