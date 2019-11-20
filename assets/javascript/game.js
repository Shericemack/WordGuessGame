var wordList = ["Family Matters", "Fresh Prince", "Living Single", "Smart Guy", "Sister, Sister", "Cousin Skeeter", "The Hughleys"];
console.log(wordList.length);
//solution should be here
var chosenWord = "";
//this will break the solution into individual letters to be stored in array
var lettersInChosenWord = [];
//Numbers of blanks we show based on the solution
var numBlanks = 0;
//an array that holds a mix of blank and solved letters ( ex: 'n, _ _ , n, _)
var blanksAndSuccesses = [];
//hold all the wrong guesses
var wrongGuesses = [];


//Game Counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;
function startGame (){
    //resets the guesses back to zero
    numGuesses = 9;
    //solution is chosen randomly from word list
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    //the word is broken into individual letters
    lettersInChosenWord = chosenWord.split("");
    //we count the number of letters in the word.
    numBlanks = lettersInChosenWord.length;
    //for testing we print the solution
    console.log(chosenWord);
    //CRITICAL LINE _ here we reset the guesses and success array at each round
    blanksAndSuccesses = [];
    //CRITICAL LINE _ reset the wrong guesses at each round
    wrongGuesses = [];
    //fill up the blanksandsuccesses list with appropriate number of blanks
    //this is based on the number of letters in the solution
    // let maskedWord = "";

    for (var i = 0; i < numBlanks; i++){
        blanksAndSuccesses.push("_");
    }
        // let space = " ";
		// let nextCharacter = wordList.charAt(i) === space ? space : "_";
		// maskedWord += nextCharacter;
    
  
    //print initial blanks to console
    console.log(blanksAndSuccesses);
    document.getElementById("guesses-left").innerHtml =numGuesses;
    document.getElementById("word-blanks").innerHTML =blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML =wrongGuesses.join(" ");
    // console.log(blanksAndSuccesses);
    // document.getElementById("guesses-left").innerHTML = numGuesses;
    // //print the blanks at the beginning of round int html
    // document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    // //clears the wrong guesses from the previous round
    // document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}
//check letters functions
//where the comparison to our matches will be done
function checkletters(letter){
    //this is a boolean it will toggle on if the letter is found in the word
    var letterInWord = false;
    //loop that checks if a letter exists inside the array at all
    for (var i =0; i <numBlanks; i ++){
        if(chosenWord[i] ===letter){
            //if letter exits boolean is true
            letterInWord = true;
        }
    }
    //if letter exists somewhere in the word then 
    //figure out exactly where (which index)
    if(letterInWord) {
        //loop through word
        for(var j = 0; j < numBlanks; j++) {
            //populate blanksAndSuccesses with every instance of letter.
            if (chosenWord[j] === letter) {
                //this sets the specific space in blanks and letter equal
                //to the letter when there is a match
                blanksAndSuccesses [j] = letter;
            }
        }
    
    //log for testing
    console.log(blanksAndSuccesses);
    //if letter doesnt exist at all 
    }
    else {
        //then add the letter to the list of wrong guesses and subtract a guess
        wrongGuesses.push(letter);
        numGuesses --;
    }
}
//Main process (code that controls what is actually run)
//======================================================

//starts the Game
startGame();

document.onkeyup = function(event) {
    if(event.keycode >= 65 && event.keyCode <=90) {
        var letterGuessed = event.key.toLowerCase();
        checkletters(letterGuessed);
        roundComplete();
    }
}
//then initiate the function for caputring the key press
// document.onkeyup = function(event) {
//     //check if the key pressed is a letter
//     if (event.keyCode >= 65 && event.keyCode <=90){
//         //converts all ke clicks to lower calse
//         var letterGuessed = event.key.toLowerCase();
//         //runs the code to check for correctness
//         checkletters(letterGuessed);
//         //runs the code after round is complete
//         // roundComplete();
//     }
// }

