$(document).ready(function(){
var wordChoice = ["Fresh Prince", "Family Matters", "Living Single", "Smart Guy", 
                 "Sister Sister", "Cousin Skeeter", "The Hughleys", "Martin",
                 "A Different World", "Doug", "Moesha", "The Wayans Brothers",
                 "The Parkers", "The Jaime Fox Show", "Kenan And Kel", "Amen",
                 "In Living Color", "My Brother And Me", "The PJs"];

const maxGuess = 10;
var pauseGame = false;
var guessedLetters = [];
var guessingWord = [];
var wordToMatch;
var numGuess = 9;
var wins = 0;

resetGame()
document.onkeypress = function(event) {
    if (isAlpha(event.key) && !pauseGame) {
        checkForLetter(event.key.toUpperCase())
    } 
}

function checkForLetter(letter){
    var foundLetter = false;
    for (var i=0, j=wordToMatch.length; i<j; i++) {
        if (letter === wordToMatch[i]){
            guessingWord[i] = letter;
            foundLetter = true;
            if(guessingWord.join("") === wordToMatch) {
                wins++;
                pauseGame = true;
                updateDisplay();
                setTimeout(resetGame, 5000);
            }
        }
    }
    if (!foundLetter){
        if (!guessedLetters.includes(letter)){
            guessedLetters.push(letter);
            numGuess--;
            updateDisplay();
        }
       if (numGuess === 0) {
           guessingWord = wordToMatch.split();
           pauseGame = true;
           setTimeout(resetGame, 5000);
       } 
    }
    updateDisplay();
}
function isAlpha (ch){
    return /^[A-z]$/i.test(ch);
}

function resetGame() {
    numGuess = maxGuess;
    pauseGame = false;
    wordToMatch = wordChoice[Math.floor(Math.random()* wordChoice.length)].toUpperCase();
    console.log(wordToMatch);
    guessedLetters = [];
    guessingWord = [];
    
    for (var i=0, j=wordToMatch.length; i < j; i++){
        if (wordToMatch[i] === " "){
            guessingWord.push(" ");
        } else {
            guessingWord.push("_");
        }
    }
    updateDisplay();
}
function updateDisplay () {
    // numGuess = 9;
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = guessingWord.join(" ");
    document.getElementById("remainingGuesses").innerText = numGuess;
    document.getElementById("guessedLetters").innerText= guessedLetters.join(" ");
}
})
