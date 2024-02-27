const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuesses = document.querySelector(".remaining span");
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again button");
const enterLetter = document.querySelector("input");

const word = "magnolia"

 const placeholder = function (word) {
    const emptyArray = [];
    for (let letter of word){
        emptyArray.push("●")
        // console.log(emptyArray);
    }
    wordInProgress.innerText = emptyArray.join("");
 };

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    let letterGuessed = enterLetter.value;
    // console.log(letterGuessed);
    enterLetter.value = "";
});
