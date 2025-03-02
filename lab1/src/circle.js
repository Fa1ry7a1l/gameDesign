import { Shape } from './shape.js';

export class Circle extends Shape {
    constructor(x, y, radius, speedX, speedY, color)
    {
        super(x, y, radius, speedX, speedY, color);
        this.top = -radius
        this.left = -radius
        this.bottom = -radius
        this.right = -radius
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}