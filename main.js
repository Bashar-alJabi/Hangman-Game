const toggleBtn = document.getElementById("toggle-btn");
toggleBtn.addEventListener("click", function () {
	const body = document.body;
	body.classList.toggle("light-mode");
	body.classList.toggle("dark-mode");
	toggleBtn.classList.toggle("light-mode");
	toggleBtn.classList.toggle("dark-mode");
	if (body.classList.contains("light-mode")) {
		toggleBtn.innerText = "Light Mode";
	} else {
		toggleBtn.innerText = "Dark Mode";
	}
});

const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
	let span = document.createElement("span");
	let theLetter = document.createTextNode(letter);
	span.appendChild(theLetter);
	span.className = "letter-box";
	lettersContainer.appendChild(span);
});

const words = {
	programming: [
		"javascript",
		"php",
		"go",
		"r",
		"mysql",
		"python",
		"java",
		"dart",
	],
	movies: [
		"Inception",
		"Alice In Borderland",
		"Friends",
		"Family Guy",
		"Game Of Thrones",
	],
	people: [
		"Albert Einstein",
		"Hitchcock",
		"Alexander",
		"Cleopatra",
		"Mahatma Ghandi",
	],
	countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
document.querySelector(".game-info .category span").innerHTML = randomPropName;
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach((letter) => {
	let emptySpan = document.createElement("span");
	if (letter === " ") {
		emptySpan.className = "with-space";
	}
	lettersGuessContainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
	let theStatus = false;
	if (e.target.className === "letter-box") {
		e.target.classList.add("clicked");
		let theClickedLetter = e.target.innerHTML.toLowerCase();
		let theChosenWord = Array.from(randomValueValue.toLowerCase());
		theChosenWord.forEach((wordLetter, WordIndex) => {
			if (theClickedLetter == wordLetter) {
				theStatus = true;
				guessSpans.forEach((span, spanIndex) => {
					if (WordIndex === spanIndex) {
						span.innerHTML = theClickedLetter;
					}
				});
			}
		});
		if (theStatus !== true) {
			wrongAttempts++;
			theDraw.classList.add(`wrong-${wrongAttempts}`);
			document.getElementById("fail").play();
			if (wrongAttempts === 8) {
				endGame();
				lettersContainer.classList.add("finished");
				document.getElementById("game-over").play();
			}
		} else {
			document.getElementById("success").play();
			checkWin();
		}
	}
});

function endGame() {
	let div = document.createElement("div");
	let divText = document.createTextNode(
		`Game Over, The Word Is: ${randomValueValue}`
	);
	div.appendChild(divText);
	div.className = "popup";
	document.body.appendChild(div);
	let divReload = document.createElement("div");
	divReload.appendChild(document.createTextNode("↻"));
	div.appendChild(divReload);
	document.body.appendChild(div);
	divReload.className = "reload";
	document.querySelector(".reload").onclick = () => location.reload();
}

function winGame() {
	let div = document.createElement("div");
	let divText = document.createTextNode(`You Won!`);
	div.appendChild(divText);
	div.className = "popup";
	document.body.appendChild(div);
	let divReload = document.createElement("div");
	divReload.appendChild(document.createTextNode("↻"));
	div.appendChild(divReload);
	document.body.appendChild(div);
	divReload.className = "reload";
	document.querySelector(".reload").onclick = () => location.reload();
}

function checkWin() {
	let guessWord = document
		.querySelector(".letters-guess")
		.innerText.replace(/\n/g, "")
		.toLowerCase();
	let randomValueNoSpace = randomValueValue.replace(/\s+/g, "").toLowerCase();
	if (guessWord === randomValueNoSpace) {
		winGame();
		lettersContainer.classList.add("finished");
		document.getElementById("win-game").play();
	}
}
