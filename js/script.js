const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playAgainButton = document.querySelector(".play-again button");
const enterLetter = document.querySelector("input");
const guessedLettersArray = [];
let remainingGuesses = 8
let word = "magnolia";

const getWord = async function () {
    const results = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await results.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor((Math.random() * wordArray.length));
    const randomWord = wordArray[randomIndex];
    word = randomWord.trim();
    placeholder(word);
};

getWord();

 const placeholder = function (word) {
    const emptyArray = [];
    for (let letter of word){
        emptyArray.push("●")
    }
    wordInProgress.innerText = emptyArray.join("");
 };

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
    countRemainingGuesses(letterGuessed);
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

const countRemainingGuesses = function(letterGuessed) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(letterGuessed)) {
        message.innerText = `Sorry, the letter ${letterGuessed} is not in the word.`;
        remainingGuesses -=1;
    } else {
        message.innerText = `Good work! The letter ${letterGuessed} is in the word!`
    }
    if (remainingGuesses === 0) {
        message.innerText = `Game Over! Nice try, the word was ${wordUpper}`;
        remainingSpan.innerText = "0 guesses";
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = "1 guess"
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`
    }
    
}

const didYouWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};

