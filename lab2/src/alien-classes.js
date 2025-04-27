import Bullet from './bullet';
import { ALIEN_HORZ_SPEED, ALIEN_DESCENT,
  ALIEN_SHOOT_MIN, ALIEN_SHOOT_MAX } from './constants';

/* ===== базовый инопланетянин ===== */
export class AlienBase {
  constructor(x, y, [spriteA, spriteB]) {
    this.x = x; this.y = y;
    this._spriteA = spriteA;
    this._spriteB = spriteB;
    this.w = spriteA.w;  this.h = spriteA.h;

    this.dir = Math.random() < .5 ? 1 : -1;
    this.edgeHits = 0;

    this.shootDelay = 3000 +
        Math.random() * (3000);
    this.nextShoot = 0;
    this.isDead = false;
  }

  /* ─ движения, развороты, спуск после 3‑го касания ─ */
  move(canvas) {
    this.x += ALIEN_HORZ_SPEED * this.dir;

    const hitL = this.dir === -1 && this.x <= 0;
    const hitR = this.dir ===  1 && this.x + this.w >= canvas.width;
    if (hitL || hitR) {
      this.dir *= -1;
      this.edgeHits++;
      this.x = Math.max(0, Math.min(this.x, canvas.width - this.w));
    }
    if (this.edgeHits >= 3 && this.canDescend()) {
      this.y += ALIEN_DESCENT;
      this.edgeHits = 0;
    }
  }

  /* можно ли опуститься на строчку вниз? */
  canDescend() { return true; }   // уточняют наследники

  /* отрисовка одинакова для всех */
  draw(ctx, time) {
    const sp = (Math.ceil(time / 1000) % 2 ? this._spriteA : this._spriteB);
    ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h,
        this.x, this.y, sp.w, sp.h);
  }

  /* ======  МЕТОД СТРЕЛЬБЫ ДОЛЖЕН ПЕРЕОПРЕДЕЛИТЬСЯ  ====== */
  shoot(gameState, time) { /* abstract */ }
}

/* === класс: BottomShooter – стреляет только снизу колонки === */
export class BottomShooterAlien extends AlienBase {
  canDescend() {
    return !this._lowerMate;      // see setter in update loop
  }
  shoot(gameState, time) {
    if (time < this.nextShoot || this._lowerMate) return;

    gameState.bullets.push(
        new Bullet(this.x + (this.w>>1)-1, this.y + this.h, 1, 2, 6, '#0f0', 'alien')
    );
    this.nextShoot = time + this.shootDelay;
  }
}

/* === класс: RapidFire – стреляет всегда, но с коротким кулдауном === */
export class RapidFireAlien extends AlienBase {
  constructor(...args) {
    super(...args);
    this.shootDelay = 3000 + Math.random() * 3000;   // 0.3‑0.6 c
  }
  shoot(gameState, time) {
    if (time < this.nextShoot) return;          // кулдаун ещё не прошёл

    const alienCX = this.x + (this.w >> 1);     // центр пришельца по X

    /* --- ищем любую цель под собой --- */
    const targetBelow = (() => {
      // функция‑проверка для объекта с x, y, w
      const fits = (o) =>
          Math.abs((o.x + (o.w >> 1)) - alienCX) <= 20 &&  // в «коридоре» 20 px
          o.y > this.y;                                    // цель ниже
      return fits(gameState.cannon)
    })();

    if (!targetBelow) return;                            // нет цели — не стреляем

    /* --- выстрел --- */
    gameState.bullets.push(
        new Bullet(alienCX - 1, this.y + this.h, 3, 2, 6, '#ff0', 'alien')
    );
    this.nextShoot = time + this.shootDelay;             // обновляем кулдаун
  }
}