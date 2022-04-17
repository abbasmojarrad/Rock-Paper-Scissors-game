import {svgLoading,svgLoadingTextWin,svgLoadingTextLoose,svgLoadingTextDraw,svgHeader} from './svg.js'

const answers = ["scissors", "rock", "paper"],
  player = document.querySelector(".answers  .player"),
  computer = document.querySelector(".answers  .computer"),
  resultElm = document.querySelector(".time"),
  box = document.querySelector(".boxes "),
  heroText = document.querySelector(".hero-text ");
 

let userChoice = null,
  computerChoice = null,
  setGame = null,
  time = null;

  heroText.innerHTML = svgHeader;

function gameRule() {
  switch (computerChoice) {
    case "scissors":
      return userChoice === "rock"
        ? svgLoadingTextWin
        : userChoice === "paper"
        ? svgLoadingTextLoose
        : svgLoadingTextDraw;

    case "paper":
      return userChoice === "scissors"
        ? svgLoadingTextWin
        : userChoice === "rock"
        ? svgLoadingTextLoose
        : svgLoadingTextDraw;

    case "rock":
      return userChoice === "paper"
        ? svgLoadingTextWin
        : userChoice === "scissors"
        ? svgLoadingTextLoose
        : svgLoadingTextDraw;
  }
}

function setBackground(prop, choiceValue) {
  const css = `background:url("./style/${prop}.png") no-repeat center ;
  background-size: 70%;
   transition:.5s;`;

  choiceValue === player
    ? (player.style.cssText = css)
    : (computer.style.cssText = css);
}

function gameRunTime() {

  if (time <= 0) {
    setBackground(computerChoice, computer);
    const result = gameRule();
    resultElm.innerHTML = result;
  }
  time--;
}

function boxClickHandler(e) {
  if (e.target.matches("li")) {
    player.style.cssText = "";
    computer.style.cssText = "";
    resultElm.innerHTML = svgLoading;
    clearInterval(setGame);
    time = 1;

    userChoice = e.target.className.split(" ")[0];
    computerChoice = answers[Math.floor(Math.random() * answers.length)];
  
    setGame = setInterval(gameRunTime, 700);
    setBackground(userChoice, player);
  }

}

box.addEventListener("click", boxClickHandler);
