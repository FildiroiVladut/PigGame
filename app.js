/*
PIG GAME :
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the input score points OR 50 if there is no input on GLOBAL score wins the game
- If a player hits 6 twice in a row he loses all his score.
*/

var score,
  roundScore,
  activePlayer,
  gamePlaying = true,
  lastDice;

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // Setter BY ID
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //CSS MANIPULATION
  document.querySelector(".dice").style.display = "none";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

init();

/*
WRITE WITH QUERY SELECTOR
SETTER!
var dice = Math.floor(Math.random() * 6) + 1;
document.querySelector("#current-" + activePlayer).textContent = dice;
document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
*/

/*

READ WITH QUERY SELECTOR
GETTER!

var x = document.querySelector("#score-0").textContent;
console.log(x);
*/

//Next player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  /* REMOVE AND ADD A CLASS But we use TOGGLE XD
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.add("active");
    */

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

//EVENTLISTENER

document.querySelector(".btn-rules").addEventListener("click", function () {
  alert(
    "PIG GAME\n The game has 2 players, playing in rounds.\n In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.\n BUT, if the player rolls a 1, all his ROUND score gets lost.\n After that, is the next player's turn.\n The player can choose to Hold, which means that his ROUND score gets added to his GLOBAL score.\n After that, its the next player's turn.\n The first player to reach the input score points OR 50 points by default on GLOBAL score wins the game.\n If a player hits 6 twice in a row he loses all his score."
  );
});

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // Update the round score if the rolled number was 1
    if (dice === 6 && lastDice === 6) {
      //Player loses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      alert(" Too damn lucky :( ");
      nextPlayer();
    } else if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }

    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // ADD current score to Global Score
    scores[activePlayer] += roundScore;

    // UPDATE THE UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;
    // undefined, 0, null, "", are COERCED TO FALSE, anything else is true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 50;
    }
    //Chech if the player WON the game

    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";

      /* It is not a good practice to mix frequently css with js, so it's better to create a CLASS in the CSS and activate that with querySelector.classList.add*/
      document.querySelector(".dice").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next player

      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);
