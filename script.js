const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const menu = document.querySelector(".menu");
const score = document.querySelector(".score");
const canvas2 = document.getElementById("snake-1");
const canvas3 = document.getElementById("snake-2");

const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");

canvas2.width = 190;
canvas2.height = 80;
canvas3.width = 190;
canvas3.height = 80;
canvas.width = 650;
canvas.height = 380;

let play = false;
let scoreP = 0;

class Apple {
    constructor(position, radio, color, context) {
        this.position = position;
        this.radio = radio;
        this.color = color;
        this.context = context;
    }
    draw() {
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radio, 0, 2 * Math.PI);
        this.context.fillStyle = this.color;
        this.context.shadowColor = this.color;
        this.context.shadowBlur = 10;
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }
    collision(snake) {
        let v1 = {
            x: this.position.x - snake.position.x,
            y: this.position.y - snake.position.y
        };
        let distance = Math.sqrt((v1.x * v1.x) + (v1.y * v1.y));

        if (distance < snake.radio + this.radio) {
            this.position = {
                x: Math.floor(Math.random() *
                    ((canvas.width - this.radio) - this.radio + 1)) + this.radio,
                y: Math.floor(Math.random() *
                    ((canvas.height - this.radio) - this.radio + 1)) + this.radio,
            };
            snake.createBody();
            scoreP++;
            score.textContent = scoreP;
        }
    }
}

// ... resto de clases SnakeBody y Snake ...

// 🟣 Serpiente principal morada
const snake = new Snake({ x: 200, y: 200 }, 11, "#8000FF", 1.5, 3, 12, ctx);
snake.initBody();

// 🟣 Serpiente morada en el menú
const snakeP1 = new Snake({ x: 165, y: 40 }, 11, "#8000FF", 1.5, 8, 12, ctx2);
snakeP1.initBody();
snakeP1.drawCharacter();

// 🟢 Serpiente verde (segunda opción)
const snakeP2 = new Snake({ x: 165, y: 40 }, 11, "#88FC03", 1.5, 24, 4, ctx3);
snakeP2.initBody();
snakeP2.drawCharacter();

const apple = new Apple({ x: 300, y: 300 }, 8, "red", ctx);

canvas2.addEventListener("click", () => {
    init(3, 12, "#8000FF");
});
canvas3.addEventListener("click", () => {
    init(8, 4, "#88FC03");
});

function init(length, pathLength, color) {
    snake.body.length = 0;
    snake.color = color;
    snake.length = length;
    snake.pathLength = pathLength;
    snake.position = { x: 200, y: 200 };
    snake.isDeath = false;
    snake.velocity = 1.5;
    snake.transparency = 1;
    snake.initBody();
    snake.keys.enable = true;
    play = true;
    menu.style.display = "none";
    scoreP = 0;
    score.textContent = scoreP;
}

function background() {
    ctx.fillStyle = "#1B1C30";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.height; i += 80) {
        for (let j = 0; j < canvas.width; j += 80) {
            ctx.fillStyle = "#23253C";
            ctx.fillRect(j + 10, i + 10, 70, 70);
        }
    }
}

function update() {
    background();
    if (play) {
        snake.update();
        apple.draw();
        apple.collision(snake);
    }
    requestAnimationFrame(update);
}
update();


