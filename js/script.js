const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuesses = document.querySelector(".remaining span");
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again button");
const enterLetter = document.querySelector("input");
const guessedLettersArray = [];
const word = "magnolia"

 const placeholder = function (word) {
    const emptyArray = [];
    for (let letter of word){
        emptyArray.push("●")
    }
    wordInProgress.innerText = emptyArray.join("");
 };

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    let letterGuessed = enterLetter.value;
    isInputALetter(letterGuessed);
    enterLetter.value = "";
});

const isInputALetter = function (letterGuessed) {
    const acceptedLetter = /[a-zA-Z]/;
    if (letterGuessed === "") {
        message.innerText = "You must enter a letter, try again."
    } else if (letterGuessed.length > 1) {
        message.innerText = "Please only enter 1 letter, try again."
    } else if (!letterGuessed.match(acceptedLetter)) {
        message.innerText = "Please enter a letter, try again."
    } else {
        makeGuess(letterGuessed);
    }
};

const makeGuess = function (letterGuessed) {
    letterGuessed = letterGuessed.toUpperCase();
    if (!guessedLettersArray.includes(letterGuessed)) {
    guessedLettersArray.push(letterGuessed);
    const li = document.createElement("li");
    li.innerText = letterGuessed;
    guessedLetters.append(li);
    } else {
        message.innerText = "You already guessed that letter, try again."
    }
    updateWord(guessedLettersArray);
};

const updateWord = function (guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const wordUpperArray = wordUpper.split("");
    const revealWord = [];
    for (let letter of wordUpperArray) {
        if (guessedLettersArray.includes(letter)) {
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    didYouWin();
};

const didYouWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};

