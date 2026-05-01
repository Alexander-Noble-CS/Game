// Game variables
let score = 0;
let timeLeft = 10;
let gameInterval;
let moveInterval;

// Get elements from HTML
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameArea = document.getElementById("gameArea");

// Start the game
function startGame() {
  score = 0;
  timeLeft = 10;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  target.style.display = "block";

  // Move target every 700ms
  moveInterval = setInterval(moveTarget, 1000);

  // Countdown timer every 1 second
  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Move target to random position
function moveTarget() {
  const maxX = gameArea.clientWidth - 50;
  const maxY = gameArea.clientHeight - 50;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  target.style.left = randomX + "px";
  target.style.top = randomY + "px";
}

// When target is clicked
target.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;

  moveTarget(); // move immediately after click
});

// End the game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(moveInterval);

  target.style.display = "none";

  // Send score to PHP
  fetch("save_score.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "score=" + score
  })
  .then(response => response.text())
  .then(data => {
    alert("Game Over! Your score: " + score);
  });
}
