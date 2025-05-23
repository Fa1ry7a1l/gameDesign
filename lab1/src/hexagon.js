import { Shape } from './shape.js';

export class Hexagon extends Shape {

    constructor(x, y, radius, speedX, speedY, color)
    {
        super(x, y, radius, speedX, speedY, color);
        this.setVertices();
    }

    setVertices()
    {
        let vertices = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            vertices.push({
                x: this.radius * Math.cos(angle),
                y: this.radius * Math.sin(angle)
            });
        }
        this.vertices= vertices;
        this.top = Math.min(vertices.map( e => e.x))
        this.left = Math.min(vertices.map( e => e.y))
        this.bottom = Math.max(vertices.map( e => e.x))
        this.right = Math.max(vertices.map( e => e.y))
    }


    draw(ctx) {
        ctx.beginPath();
        let vertices = this.getVertices();
        for (let i = 0; i < 6; i++) {
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