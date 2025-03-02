import {checkCirclePolygonCollision, checkPolygonCollision} from './collision.js';
import {Circle} from "./circle";
import {Triangle} from "./triangle";
import {Hexagon} from "./hexagon";
import QuadTree from "./quad-tree";
import Rectangle from "./rectangle";

const canvas = document.getElementById("cnvs");

const gameState = {};
const eachTypeElementCount = 50;




function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        checkCollisions(gameState.lastTick)
        //checkCollisionsQuad(gameState.lastTick)
        update(gameState.lastTick)
        removeLosers()
    }
}

function removeLosers() {
    gameState.circles = gameState.circles.filter(x => x.hp > 0)
    gameState.hexagon = gameState.hexagon.filter(x => x.hp > 0)
    gameState.triangle = gameState.triangle.filter(x => x.hp > 0)
}

function checkCollisionsQuad(lastTick) {
    let tree = new QuadTree(new Rectangle(0,0,canvas.width,canvas.height),4);
    tree.buildTree(gameState)
    tree.calculateCollision(reactOnCollision)
}

function checkCollisions(tick) {
    for (let i = 0; i < gameState.circles.length; i++) {
        for (let j = i + 1; j < gameState.circles.length; j++) {
            if (gameState.circles[i].checkCollision(gameState.circles[j])) {
                reactOnCollision(gameState.circles[i], gameState.circles[j]);
            }
        }
        for (let j = 0; j < gameState.triangle.length; j++) {
            if(gameState.circles[i].checkCollision(gameState.triangle[j]) && checkCirclePolygonCollision(gameState.circles[i], gameState.triangle[j]))
            {
                reactOnCollision(gameState.circles[i], gameState.triangle[j]);
            }
        }
        for (let j = 0; j < gameState.hexagon.length; j++) {
            if(gameState.circles[i].checkCollision(gameState.hexagon[j]) && checkCirclePolygonCollision(gameState.circles[i], gameState.hexagon[j]))
            {
                reactOnCollision(gameState.circles[i], gameState.hexagon[j]);
            }
        }
    }
    for(let i = 0; i < gameState.triangle.length; i++) {
        for(let j = i+1; j < gameState.triangle.length; j++) {
            if(gameState.triangle[i].checkCollision(gameState.triangle[j]) && checkPolygonCollision(gameState.triangle[i], gameState.triangle[j]))
            {
                reactOnCollision(gameState.triangle[i], gameState.triangle[j]);
            }
        }
        for (let j = 0; j < gameState.hexagon.length; j++) {
            if(gameState.triangle[i].checkCollision(gameState.hexagon[j]) && checkPolygonCollision(gameState.triangle[i], gameState.hexagon[j]))
            {
                reactOnCollision(gameState.triangle[i], gameState.hexagon[j]);
            }
        }
    }

    for(let i = 0; i < gameState.hexagon.length; i++) {
        for(let j = i+1; j < gameState.hexagon.length; j++) {
            if(gameState.hexagon[i].checkCollision(gameState.hexagon[j]) && checkPolygonCollision(gameState.hexagon[i], gameState.hexagon[j]))
            {
                reactOnCollision(gameState.hexagon[i], gameState.hexagon[j]);
            }
        }
    }
}

function reactOnCollision(shape, shape2) {
    shape.hp--
    shape.color = getRandomColor()
    shape2.hp--
    shape2.color = getRandomColor()
    let angel = Math.abs(Math.atan2(shape.speedX - shape2.speedX, shape.speedY - shape2.speedY) * Math.PI - 90); // не лучший способ отскоков, но лучше не пришел в голову
    if (angel <= 60) {
        shape.speedX *= -1
        shape2.speedX *= -1
    }
    if (angel >= 30) {
        shape.speedY *= -1
        shape2.speedY *= -1
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
    context.fillStyle = "rgb(0, 0, 200)"
    gameState.circles.forEach((c) => c.draw(context))
    gameState.triangle.forEach((c) => c.draw(context))
    gameState.hexagon.forEach((c) => c.draw(context))

}

function update(tick) {
    gameState.circles.forEach(c => c.move(canvas));
    gameState.triangle.forEach(c => c.move(canvas));
    gameState.hexagon.forEach(c => c.move(canvas));
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

function getRandomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    gameState.circles = []
    gameState.triangle = []
    gameState.hexagon = []

    // gameState.triangle.push(new Triangle(270, 90, 30, 1, -2, getRandomColor()))
    // gameState.hexagon.push(new Hexagon(300, 50, 25, -1, 0, getRandomColor()))

    for (let i = 0; i < eachTypeElementCount; i++) {
        let radius = Math.random() * 50 + 10; // Радиус от 10 до 60 пикселей
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let speedX = Math.random() * 10 - 5;
        let speedY = Math.random() * 10 - 5;
        let color = getRandomColor();
        gameState.circles.push(new Circle(x, y, radius, speedX, speedY, color));
    }
    for (let i = 0; i < eachTypeElementCount; i++) {
        let radius = Math.random() * 50 + 10; // Радиус от 10 до 60 пикселей
        let x = Math.random() * (canvas.width - 2 * radius) + radius; //формула такая, чтобы спауниться не пересекая границу экрана, иначе фигура залипает в ней
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let speedX = Math.random() * 10 - 5;
        let speedY = Math.random() * 10 - 5;
        let color = getRandomColor();
        gameState.triangle.push(new Triangle(x, y, radius, speedX, speedY, color));
    }
    for (let i = 0; i < eachTypeElementCount; i++) {
        let radius = Math.random() * 50 + 10; // Радиус от 10 до 60 пикселей
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let speedX = Math.random() * 10 - 5;
        let speedY = Math.random() * 10 - 5;
        let color = getRandomColor();
        gameState.hexagon.push(new Hexagon(x, y, radius, speedX, speedY, color));
    }


}

setup();
run();
