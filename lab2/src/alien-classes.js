import Bullet from './bullet';
import {
    ALIEN_HORZ_SPEED,
    ALIEN_DESCENT,
    ALIEN_SHOOT_MIN,
    ALIEN_SHOOT_MAX,
    KILL_STREAK,
    STREAK_BUFF_MS,
    ALIEN_REFLECT_TIMES,
    ALIEN_PRICE,
    RAPID_BULLET_SPEED,
    BOTTOM_BULLET_SPEED
} from './constants';

/* ===== базовый инопланетянин ===== */
export class AlienBase {
    constructor(x, y, [spriteA, spriteB]) {
        this.x = x;
        this.y = y;
        this._spriteA = spriteA;
        this._spriteB = spriteB;
        this.w = spriteA.w;
        this.h = spriteA.h;

        this.dir = Math.random() < .5 ? 1 : -1;
        this.edgeHits = 0;

        this.shootDelay = 3000 +
            Math.random() * (3000);
        this.nextShoot = 0;
        this.isDead = false;
    }

    /* ─ движения, развороты, спуск после 3‑го касания ─ */
    move(canvas, speedMul = 1) {
        this.x += ALIEN_HORZ_SPEED * speedMul * this.dir;

        const hitL = this.dir === -1 && this.x <= 0;
        const hitR = this.dir === 1 && this.x + this.w >= canvas.width;
        if (hitL || hitR) {
            this.dir *= -1;
            this.edgeHits++;
            this.x = Math.max(0, Math.min(this.x, canvas.width - this.w));
        }
        if (this.edgeHits >= ALIEN_REFLECT_TIMES && this.canDescend()) {
            this.y += ALIEN_DESCENT;
            this.edgeHits = 0;
        }
    }

    /* можно ли опуститься на строчку вниз? */
    canDescend() {
        return true;
    }   // уточняют наследники

    /* отрисовка одинакова для всех */
    draw(ctx, time) {
        const sp = (Math.ceil(time / 1000) % 2 ? this._spriteA : this._spriteB);
        ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h,
            this.x, this.y, sp.w, sp.h);
    }

    /* ======  МЕТОД СТРЕЛЬБЫ ДОЛЖЕН ПЕРЕОПРЕДЕЛИТЬСЯ  ====== */
    shoot(gameState, time) { /* abstract */
    }

    effectiveDelay(time, base, gameState) {             // вызываем из потомков
        return (time < gameState.alienBuffUntil) ? base / 1.5 : base;
    }

    dead(time, gameState) {
        gameState.currentScore += ALIEN_PRICE
        this.isDead = true;
        gameState.killCount++;
        if (gameState.killCount % KILL_STREAK === 0) {
            gameState.alienBuffUntil = gameState.alienSpeedBuffUntil =
                time + STREAK_BUFF_MS;
        }
    }
}

/* === класс: BottomShooter – стреляет только снизу колонки === */
export class BottomShooterAlien extends AlienBase {
    canDescend() {
        return !this._lowerMate;      // see setter in update loop
    }

    shoot(gameState, time) {
        if (time < this.nextShoot || this._lowerMate) return;

        // цель под пришельцем: пушка ИЛИ бонус
        const cx = this.x + (this.w >> 1);
        const targetBelow = obj =>
            Math.abs((obj.x + (obj.w >> 1)) - cx) <= 20 && obj.y > this.y;

        const hasTarget = targetBelow(gameState.cannon) ||
            gameState.bonuses.some(targetBelow);
        if (!hasTarget) return;
        if (gameState.playerBuffUntil > time) {
            gameState.bullets.push(
                new Bullet(this.x + (this.w >> 1) - 1, this.y + this.h, BOTTOM_BULLET_SPEED * 2, 2, 6, '#00fff7', 'alien')
            );
        } else {
            gameState.bullets.push(
                new Bullet(this.x + (this.w >> 1) - 1, this.y + this.h, BOTTOM_BULLET_SPEED, 2, 6, '#0f0', 'alien')
            );
        }
        this.nextShoot = time + this.effectiveDelay(time, this.shootDelay, gameState);
    }
}

/* === класс: RapidFire – стреляет всегда, но с коротким кулдауном === */
export class RapidFireAlien extends AlienBase {
    constructor(...args) {
        super(...args);
        this.shootDelay = 8000 + Math.random() * 3000;
    }

    shoot(gameState, time) {
        if (time < this.nextShoot) return;          // кулдаун ещё не прошёл

        const alienCX = this.x + (this.w >> 1);

        if (this._lowerMate && Math.random() < 0.95) return;
        if (gameState.playerBuffUntil > time) {
            gameState.bullets.push(
                new Bullet(alienCX - 1, this.y + this.h, RAPID_BULLET_SPEED * 2, 2, 6, '#ff5900', 'yellowAlien')
            );
        } else {
            gameState.bullets.push(
                new Bullet(alienCX - 1, this.y + this.h, RAPID_BULLET_SPEED, 2, 6, '#ff0', 'yellowAlien')
            );
        }

        this.nextShoot = time + this.effectiveDelay(time, this.shootDelay, gameState); // обновляем кулдаун
    }
}