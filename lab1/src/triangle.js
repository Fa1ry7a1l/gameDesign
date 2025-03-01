import { Shape } from './shape.js';

export class Triangle extends Shape {

    constructor(x, y, radius, speedX, speedY, color)
    {
        super(x, y, radius, speedX, speedY, color);
        this.setVertices();
    }

    setVertices()
    {
        let vertices = [];
        for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
            vertices.push({
                x: this.radius * Math.cos(angle),
                y: this.radius * Math.sin(angle)
            });
        }
        this.vertices = vertices;
    }


    draw(ctx) {
        ctx.beginPath();
        let vertices = this.getVertices();
        for (let i = 0; i < 3; i++) {
            const px = vertices[i].x;
            const py = vertices[i].y;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}