//nx = "O", n = 16
//f = e => { if (e.innerHTML == "") {
    //nx = nx == "O" ? "X" : "O"
    //e.innerHTML = nx, e.setAttribute('class', nx)
    //x = e.cellIndex, y = e.parentElement.rowIndex, t[x][y] = nx
    //setTimeout(() => [[1,1],[1,0],[0,1],[-1,1]].forEach( d => {
        //xp=x, yp=y, maxh=0, [vx, vy] = d
        //while (t[xp][yp] === nx) xp += vx, yp += vy, maxh++
        //xp=x, yp=y
        //while (t[xp][yp] === nx) xp -= vx, yp -= vy, maxh++
        //if (maxh > 5) alert(`Nyert: ${nx}`), init()
    //}), 100)
//}}
//(init = () => {
    //t = Array(n).fill().map(() => Array(n).fill())
    //document.getElementById('t').innerHTML = `
    //<table>
        //${Array(n).fill(`
        //<tr>
        //${Array(n).fill(`<td onmouseup="f(this)" />`).join('')}
        //</tr>
        //`).join('')}
    //</table>`
//})()

var blockSize = 25;
var rows = 20;
var cols = 40;
var board;
var context; 

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var snakeX2 = blockSize * 30;
var snakeY2 = blockSize * 15;

var velocityX2 = 0;
var velocityY2 = 0;

var snakeBody2 = [];


var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); 
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="blue";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="gold";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    if (snakeX2 == foodX && snakeY2 == foodY) {
        snakeBody2.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    for (let i = snakeBody2.length-1; i > 0; i--) {
        snakeBody2[i] = snakeBody2[i-1];
    }
    if (snakeBody2.length) {
        snakeBody2[0] = [snakeX2, snakeY2];
    }

    context.fillStyle="red";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    context.fillStyle="green";
    snakeX2 += velocityX2 * blockSize;
    snakeY2 += velocityY2 * blockSize;
    context.fillRect(snakeX2, snakeY2, blockSize, blockSize);
    for (let i = 0; i < snakeBody2.length; i++) {
        context.fillRect(snakeBody2[i][0], snakeBody2[i][1], blockSize, blockSize);
    }


    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Player 1 won");
    }
    if (snakeX2 < 0 || snakeX2 > cols*blockSize || snakeY2 < 0 || snakeY2 > rows*blockSize) {
        gameOver = true;
        alert("Player 1 won");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Player 2 won");
        }
    }
    for (let i = 0; i < snakeBody2.length; i++) {
        if (snakeX == snakeBody2[i][0] && snakeY == snakeBody2[i][1]) {
            gameOver = true;
            alert("Player 2 won");
        }
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX2 == snakeBody[i][0] && snakeY2 == snakeBody[i][1]) {
            gameOver = true;
            alert("Player 2 won");
        }
    }
    for (let i = 0; i < snakeBody2.length; i++) {
        if (snakeX2 == snakeBody2[i][0] && snakeY2 == snakeBody2[i][1]) {
            gameOver = true;
            alert("Player 2 won");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    if (e.code == "KeyW" && velocityY2 != 1) {
        velocityX2 = 0;
        velocityY2 = -1;
    }
    else if (e.code == "KeyS" && velocityY2 != -1) {
        velocityX2 = 0;
        velocityY2 = 1;
    }
    else if (e.code == "KeyA" && velocityX2 != 1) {
        velocityX2 = -1;
        velocityY2 = 0;
    }
    else if (e.code == "KeyD" && velocityX2 != -1) {
        velocityX2 = 1;
        velocityY2 = 0;
    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}