export default class Cannon {
  constructor(x, y, sprite) {
    this.x = x;
  	this.y = y;
    this.w = sprite.w;
    this.h = sprite.h;
    this._sprite = sprite;
  }

  draw(ctx, time) {
    ctx.drawImage(
      this._sprite.img,
      this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h,
      this.x, this.y, this._sprite.w, this._sprite.h
    );
  }
}
