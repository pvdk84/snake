// Simple Snake Game

var canvas;
var ctx;

var colorSnake = 'white';
var colorFood = 'white';
var snakeLength = 10;
var speed = 50;
var foodX;
var foodY;

var alive = true;
var movingLeft = false;
var movingRight = true;
var movingUp = false;
var movingDown = false;


const PIXEL = 10;
const C_HEIGHT = 400;
const C_WIDTH = 600;
const X_RANDOMIZER = C_WIDTH / PIXEL - 1;
const Y_RANDOMIZER = C_HEIGHT / PIXEL - 1;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(C_WIDTH);
var y = new Array(C_HEIGHT);

function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    makeSnake();
    makeFood();
    setInterval("playGame()", speed);
}

function makeSnake() {

    for (var z = 0; z < snakeLength; z++) {
        x[z] = 100 - (z * 10);
        y[z] = 100;
    }
}

function makeFood() {

    var random = Math.floor(Math.random() * X_RANDOMIZER);
    foodX = random * PIXEL;

    random = Math.floor(Math.random() * Y_RANDOMIZER);
    foodY = random * PIXEL;
}

function playGame() {

    if (alive) {

        makeColors();
        checkCollision();
        moveSnake();
        eatFood();
    } else {
        gameOver();
    }
}

function makeColors() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    // color the snake
    for (var z = 0; z < snakeLength; z++) {
        ctx.fillStyle = colorSnake;
        ctx.fillRect(x[z], y[z], PIXEL, PIXEL);
    }

    // color the food
    ctx.fillStyle = colorFood;
    ctx.fillRect(foodX, foodY, PIXEL, PIXEL);
}

function checkCollision() {

    for (var z = snakeLength; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            alive = false;
        }
    }

    if (y[0] >= C_HEIGHT) {

        alive = false;
    }

    if (y[0] < 0) {

        alive = false;
    }

    if (x[0] >= C_WIDTH) {

        alive = false;
    }

    if (x[0] < 0) {

        alive = false;
    }
}

function moveSnake() {

    for (var z = snakeLength; z > 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (movingLeft) {

        x[0] -= PIXEL;
    }

    if (movingRight) {

        x[0] += PIXEL;
    }

    if (movingUp) {

        y[0] -= PIXEL;
    }

    if (movingDown) {

        y[0] += PIXEL;
    }
}

function eatFood() {

    if ((x[0] == foodX) && (y[0] == foodY)) {

        snakeLength++;
        console.log(snakeLength);
        makeFood();
    }
}

function gameOver() {

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 36px serif';

    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

onkeydown = function (e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!movingRight)) {

        movingLeft = true;
        movingUp = false;
        movingDown = false;
    }

    if ((key == RIGHT_KEY) && (!movingLeft)) {

        movingRight = true;
        movingUp = false;
        movingDown = false;
    }

    if ((key == UP_KEY) && (!movingDown)) {

        movingUp = true;
        movingRight = false;
        movingLeft = false;
    }

    if ((key == DOWN_KEY) && (!movingUp)) {

        movingDown = true;
        movingRight = false;
        movingLeft = false;
    }
}