const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Basket properties
const basket = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 30,
    width: 60,
    height: 10,
    dx: 5
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: 0,
    radius: 10,
    dy: 2
};

let rightPressed = false;
let leftPressed = false;
let score = 0;
let gameOver = false;

// Event listeners for key presses
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Draw the basket
function drawBasket() {
    ctx.beginPath();
    ctx.rect(basket.x, basket.y, basket.width, basket.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// Draw the score
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

// Update game elements
function update() {
    if (rightPressed && basket.x < canvas.width - basket.width) {
        basket.x += basket.dx;
    } else if (leftPressed && basket.x > 0) {
        basket.x -= basket.dx;
    }

    ball.y += ball.dy;

    // Check if the ball hits the basket
    if (
        ball.y + ball.radius > basket.y &&
        ball.x > basket.x &&
        ball.x < basket.x + basket.width
    ) {
        ball.y = 0;
        ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
        score++;
        ball.dy += 0.5;  // Increase speed after each catch
    }

    // Check if the ball hits the ground
    if (ball.y + ball.radius > canvas.height) {
        gameOver = true;
    }
}

// Draw game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawBall();
    drawScore();
}

// Game loop
function gameLoop() {
    if (!gameOver) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    } else {
        ctx.font = '30px Arial';
        ctx.fillStyle = '#0095DD';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    }
}

gameLoop();
