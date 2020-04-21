$(document).ready(function(){
var wordChoice = ["Kenan and Kel", "Family Matters", "Living Single", "Smart Guy", 
                 "The Wayans Bros", "Cousin Skeeter", "The Hughleys", "Martin",
                 "A Different World", "Doug", "Moesha", "The Cosby Show",
                 "The Parkers", "A Different World", "Amen", "Fresh Prince of Bel Air",
                 "The Pjs", "Sister Sister", "The Jaime Fox Show", "One on One",
                 "Girlfriends"];

const maxGuess = 10;
var pauseGame = false;
var guessedLetters = [];
var guessingWord = [];
var wordToMatch;
var numGuess = 9;
var wins = 0;
var losses = 0;

resetGame()
document.onkeypress = function(event) {
    if (isAlpha(event.key) && !pauseGame) {
        checkForLetter(event.key.toUpperCase())
    } 
}


    


function checkForLetter(letter){
    var foundLetter = false;
    var correctSound = document.createElement("audio")
    var incorrectSound = document.createElement("audio")
    correctSound.setAttribute("src", "assets/audio/all_that.wav")
    incorrectSound.setAttribute("src", "assets/audio/boo.wav")
    for (var i=0, j=wordToMatch.length; i<j; i++) {
        if (letter === wordToMatch[i]){
            guessingWord[i] = letter;
            foundLetter = true;
            if(guessingWord.join("") === wordToMatch) {
                wins++;
                pauseGame = true;
                updateDisplay();
                correctSound.play();
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
       else { (numGuess === 0) 
           guessingWord = wordToMatch.split("");
           pauseGame = true;
           losses++;
           updateDisplay();
           incorrectSound.play();
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
    document.getElementById("currentWord").innerText = guessingWord.join("");
    document.getElementById("remainingGuesses").innerText = numGuess;
    document.getElementById("guessedLetters").innerText= guessedLetters.join(" ");
    document.getElementById("totalLosses").innerText = losses;
}
})
