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
        this.top = 0
        this.bottom = 0
        this.left = 0
        this.right = 0
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
        return this.cachedVertices.slice(1);
    }

    getTop()
    {
        return this.y + this.top;
    }
    getBottom()
    {
        return this.y + this.bottom;
    }
    getLeft()
    {
        return this.x + this.left;
    }
    getRight()
    {
        return this.x + this.right;
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