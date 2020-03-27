// Elements
const scoreNum = document.getElementById("score-num");

const saveScore = document.createElement("button")
const startButtonDiv = document.getElementById("save-score")
const level2Div = document.getElementById("level-2")
const level2Button = document.createElement("button")
const saveScoreBtn = document.createElement("button")
const timerNumber = document.getElementById("timer-num");
const counterContainer = document.getElementById("counters-container");
const buttonsDiv = document.getElementById("game-buttons")

// Visibility
saveScoreBtn.innerText = "Save Score";
buttonsDiv.appendChild(saveScoreBtn);
noDisplay(saveScoreBtn);
		
// Images
const virusImg = "assets/virus.png";
const virusWhackedImg = "assets/clean.png";

// Game Parameters
const gameTime = 12000;
let minPopUpTime = 1050;
const maxPopUpTime = 2000;

// Variables
let timeUp = false;
let score = 0;
let gameTimer = null;
let popUpTimer = null;
let decrementSeconds = null;
let gameDuration = 1000;
let seconds = gameDuration/1000;

// Random virus
const viruses = document.getElementsByClassName("virus-pic")
let numViruses = viruses.length;
let virus = randomVirus(viruses);

// Event Listeners
startButton.addEventListener("click", () => {
	welcomeDiv.remove();
	setDisplay(gameContainer);
	init();
	buttonsDiv.appendChild(pauseButton)
	buttonsDiv.appendChild(endButton)
	buttonsDiv.appendChild(newButton)
	}
)

pauseButton.addEventListener("click", () => {
	if(pauseButton.innerText == "Pause Game"){
		pauseButton.innerText = "Resume Game";
		stop();
	}
	else if (pauseButton.innerText == "Resume Game"){
		timeUp = false;
		pauseButton.innerText = "Pause Game"
		let newTime = seconds*1000;
		gameTimer = setTimeout(gameTimerFn, newTime);
		decrementSeconds = setInterval(decrementSecondsFn, 1000);
		popUp();
	}
})

newButton.addEventListener("click", () => {
	stop();
	score = 0;
	timerNumber.innerText = "Starting new game...";
	seconds = gameDuration/1000;
	init();
	}
)

endButton.addEventListener("click", () => {
	stop();
	gameOver();
	setDisplay(saveScoreBtn);
})

// Start
function init() {
	setDisplay(pauseButton);
	setDisplay(endButton);
	setDisplay(newButton);
	noDisplay(saveScoreBtn);
	// in case of press 'pause' then 'new'
	pauseButton.innerText = "Pause Game";
	popUp();
	scoreNum.innerText = score;
	timeUp = false;
	startButton.innerText = "Stop Game";
	popUp();
	gameTimer = setTimeout(() => {
		console.log("Game Over...");
		startButton.innerText = "Start Game";
		timeUp = true;
	}, gameTime);		
	decrementSeconds = setInterval(function(){
		if (seconds > 0) {
			console.log("set interval is running")
			seconds -= 1;
			timerNumber.innerText = seconds + " seconds left!";
		}
		else {
			timerNumber.innerText = `Time's up! Your score is ${score}`
			saveScore.innerText = "Save Score"
			saveScore.addEventListener("click", function(){
					updateScoreForPlayer();
				
			})
			if (score > 6){
				setDisplay(level2Button);
				level2Button.innerText = "Play Level 2"
				buttonsDiv.appendChild(level2Button)
				level2Button.addEventListener("click", function(){
					startLevel2();
				})
			}
		}
	}, 1000)
	}
	
function stop(){
	console.log("Game Stopped...");
	startButton.innerText = "Start Game";
	timeUp = true;
	Array.prototype.map.call(viruses, virus => virus.classList.remove("up"))
	clearInterval(popUpTimer);
	clearInterval(gameTimer);
	clearInterval(decrementSeconds);

}

// Viruses Appear
function popUp(){
	let time = randomTime(minPopUpTime, maxPopUpTime);
	let virus = randomVirus(viruses);
	virus.classList.add("up");
	virus.addEventListener("click", () => {
		if(!virus.classList.contains("whacked")) {
		virus.src = virusWhackedImg
		virus.classList.remove("up")
		virus.classList.add("whacked")
		score++;
		scoreNum.innerText = score;
		}
	})
	popUpTimer = setTimeout(() => {
		virus.classList.remove("up", "whacked");
		virus.src = virusImg;
		if(timeUp === false){
			popUp();
		}
	}, time);
}
	
// Stop
	
function stop(){
	console.log("Game Stopped...");
	timeUp = true;
	Array.prototype.map.call(viruses, virus => {
		virus.classList.remove("up", "whacked");
		virus.src = virusImg;})
	clearInterval(popUpTimer);
	clearTimeout(gameTimer);
	clearInterval(decrementSeconds);
}

// Timer Functions

function gameTimerFn() {
	console.log("Game Over...");
	timeUp = true;
}

function decrementSecondsFn() {
	if (seconds > 0) {
		console.log("set interval is running")
		seconds -= 1;
		timerNumber.innerText = seconds + " seconds left!";
	}
	else {
		gameOver();
	}
}

// Game over
function gameOver() {
	stop();
	noDisplay(pauseButton);
	noDisplay(endButton);
	timerNumber.innerText = `Game over!`
	scoreNum.innerText = `Final score: ${score}`
	setDisplay(saveScoreBtn);
	if (score > 6){
		setDisplay(level2Button);
		level2Button.innerText = "Play Level 2"
		buttonsDiv.appendChild(level2Button)
		level2Button.addEventListener("click", function(){
			startLevel2();
		})
	}
}

saveScoreBtn.addEventListener("click", function(event){
	updateScoreForPlayer(event);
})

// Random Selectors
function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
	
function randomVirus(viruses) {
	const virusNum = Math.floor(Math.random() * numViruses);
	const virus = viruses[virusNum];
	return virus;
}

