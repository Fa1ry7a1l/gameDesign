const MAX_HP = 5;

export default class Bunker {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this._sprite = sprite;
        this.w = sprite.w;
        this.h = sprite.h;
        this.hp = MAX_HP;
        this.isDead = false;
    }

    hit(by) {
        if (by === 'player') return;  // игнорируем «дружественный огонь»
        this.hp--;
        if (this.hp <= 0) this.isDead = true;
    }

    draw(ctx, time) {
        ctx.drawImage(
            this._sprite.img,
            this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h,
            this.x, this.y, this._sprite.w, this._sprite.h
        );
    }
}