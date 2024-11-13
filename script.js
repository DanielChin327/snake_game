// Select game area, score display, and start button from the HTML
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

// Game settings
const gameAreaSize = 400; // Game area dimensions
const tileSize = 20; // Size of each square (snake and food)

// Game variables
let snake, direction, food, score, interval;

// Function to start or restart the game
function startGame() {
  // Set initial snake position, direction, score, and place food
  snake = [{ x: 200, y: 200 }];
  direction = { x: tileSize, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  placeFood();

  // Start game loop
  clearInterval(interval); // Clear any previous game loop
  interval = setInterval(gameLoop, 150); // Run game loop every 100 ms. This is the speed of the snake.

  // Listen for arrow key presses to change direction
  document.addEventListener("keydown", changeDirection);
}

// Function to place food at a random position in the game area
function placeFood() {
  food = {
    x: Math.floor(Math.random() * (gameAreaSize / tileSize)) * tileSize,
    y: Math.floor(Math.random() * (gameAreaSize / tileSize)) * tileSize,
  };
}

// Function to change snake's direction based on arrow key input
function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction.x === 0) direction = { x: -tileSize, y: 0 };
  else if (event.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -tileSize };
  else if (event.key === "ArrowRight" && direction.x === 0) direction = { x: tileSize, y: 0 };
  else if (event.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: tileSize };
}

// Main game loop: handles movement, collision, and drawing
function gameLoop() {
  // Move snake's head to the new position
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check if snake hits boundaries or itself
  if (
    newHead.x < 0 || newHead.x >= gameAreaSize ||
    newHead.y < 0 || newHead.y >= gameAreaSize ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    clearInterval(interval); // Stop the game loop
    alert("Game Over! Your score: " + score); // Show game over message
    startBtn.textContent = "Restart Game"; // Change button text
    return;
  }

  // Add the new head to the snake body
  snake.unshift(newHead);

  // Check if snake eats food
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10; // Increase score
    scoreDisplay.textContent = score; // Update score display
    placeFood(); // Place new food
  } else {
    snake.pop(); // Remove the last segment if no food eaten
  }

  // Draw the game
  gameArea.innerHTML = ""; // Clear previous drawings
  snake.forEach(segment => {
    const snakePart = document.createElement("div");
    snakePart.style.left = `${segment.x}px`;
    snakePart.style.top = `${segment.y}px`;
    snakePart.classList.add("snake"); // Style with CSS class
    gameArea.appendChild(snakePart);
  });

  // Draw the food
  const foodElement = document.createElement("div");
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
  foodElement.classList.add("food"); // Style with CSS class
  gameArea.appendChild(foodElement);
}

// Start or restart the game when button is clicked
startBtn.addEventListener("click", startGame);
