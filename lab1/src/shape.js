export class Shape {
    constructor(x, y, radius, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.vertices = [];
        this.cachedVertices = [];
        this.hp=3;
    }

    move(canvas) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.speedX *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.speedY *= -1;
        }
    }

    getVertices() {
        if (this.cachedVertices.length <= 0 || this.cachedVertices[0].x != this.x || this.cachedVertices[0].y != this.y) {
            this.cachedVertices = [];
            this.cachedVertices.push({x: this.x, y: this.y});
            this.vertices.forEach(v => this.cachedVertices.push({x: v.x + this.x, y: v.y + this.y}));
        }
        let a =  this.cachedVertices.slice(1)
        return a;
    }

    draw() {
    }

    checkCollision(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + other.radius;
    }
}