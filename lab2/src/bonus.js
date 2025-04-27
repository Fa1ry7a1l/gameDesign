export default class Bonus {
    constructor(x, y, time) {
        this.x = x;
        this.y = y;
        this.w = 18;
        this.h = 18;
        this.isDead = false;
        this.timeToLive = time;
    }

    update(time) {
        if (this.timeToLive < time) this.isDead = true;
    }

    draw(ctx) {                      // «3 пули в квадратике»
        ctx.fillStyle = '#444';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 5, this.y + 4, 2, 6);
        ctx.fillRect(this.x + 11, this.y + 4, 2, 6);
        ctx.fillRect(this.x + 8, this.y + 8, 2, 6);
    }
}