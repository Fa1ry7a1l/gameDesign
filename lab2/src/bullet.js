export default class Bullet {
    constructor(x, y, vy, w, h, color, owner) {
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.prevX = x;
        this.prevY = y;
        this.color = color;
        this.owner = owner;
        this.isDead = false;
    }

    update(canvas) {
        this.prevX = this.x;
        this.prevY = this.y;
        this.y += this.vy;
        // уходит за экран – помечаем на удаление
        if (this.y + this.h < 0 || this.y > canvas.height) this.isDead = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
