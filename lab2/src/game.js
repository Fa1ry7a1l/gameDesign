import Sprite from './sprite'
import Cannon from './cannon'
import Bullet from './bullet'
import Bunker from "./bunker";
import { BottomShooterAlien, RapidFireAlien } from './alien-classes';
import EventBus from './event‑bus'
import { SHOOT_COOLDOWN } from './constants';
import InputHandler from "./input-handler";

import assetPath from '../assets/invaders.png'

let assets;
const sprites = {
    aliens: [],
    cannon: null,
    bunker: null
};
const gameState = {
    bullets: [],
    aliens:  [],
    cannon:  null,
    bunkers: [],
    canvas:  null,

    nextShootAllowed: 0,
    eventBus: null          // ← здесь будет шина
};
const inputHandler = new InputHandler();

export function preload(onPreloadComplete) {
    assets = new Image();
    assets.addEventListener("load", () => {
        sprites.cannon = new Sprite(assets, 62, 0, 22, 16);
        sprites.bunker = new Sprite(assets, 84, 8, 36, 24);
        sprites.aliens = [
            [new Sprite(assets, 0, 0, 22, 16), new Sprite(assets, 0, 16, 22, 16)],
            [new Sprite(assets, 22, 0, 16, 16), new Sprite(assets, 22, 16, 16, 16)],
            [new Sprite(assets, 38, 0, 24, 16), new Sprite(assets, 38, 16, 24, 16)]
        ]

        onPreloadComplete();
    });
    assets.src = assetPath;
}

export function init(canvas) {
    gameState.eventBus = new EventBus();
    const alienRows = [BottomShooterAlien, RapidFireAlien,
        BottomShooterAlien, RapidFireAlien,
        BottomShooterAlien, RapidFireAlien];

    alienRows.forEach((Cls, i) => {
        for (let j = 0; j < 10; j++) {
            const x = canvas.width / 10 * j + (Cls === RapidFireAlien ? 3 : 0);
            const y = 40 + i * 40;
            gameState.aliens.push(
                new Cls(x, y, sprites.aliens[i % sprites.aliens.length])
            );
        }
    });

    for(var i = 0; i < 10;i++)
    {
        let alienX = canvas.width/10 * i;
        let alienY = canvas.height - 150;
        gameState.bunkers.push(
            new Bunker(alienX, alienY, sprites.bunker)
        );
    }

    gameState.cannon = new Cannon(
        100, canvas.height - 100,
        sprites.cannon
    );
    gameState.canvas = canvas
}

export function update(time, stopGame) {
    /* ───── 1. УПРАВЛЕНИЕ ИГРОКА ───── */
    if (inputHandler.isDown('ArrowLeft'))  gameState.cannon.x -= 4;
    if (inputHandler.isDown('ArrowRight')) gameState.cannon.x += 4;

    const maxX = gameState.canvas.width - gameState.cannon.w;
    if (gameState.cannon.x < 0)    gameState.cannon.x = 0;
    if (gameState.cannon.x > maxX) gameState.cannon.x = maxX;

    if (inputHandler.isDown('Space') && time >= gameState.nextShootAllowed) {
        const bx = gameState.cannon.x + (gameState.cannon.w >> 1) - 1;
        const by = gameState.cannon.y;
        gameState.bullets.push(new Bullet(bx, by, -8, 2, 6, '#fff', 'player'));
        gameState.nextShootAllowed = time + SHOOT_COOLDOWN;
    }

    /* ───── 2. ДВИЖЕНИЕ ПРИШЕЛЬЦЕВ ───── */
    gameState.aliens.forEach(al => {
        al._lowerMate = gameState.aliens.some(o =>
            o !== al && Math.abs(o.x - al.x) < al.w && o.y > al.y);
        al.move(gameState.canvas);
    });

    /* ─── 2‑бис. СТОЛКНОВЕНИЯ АЛИЕН↔АЛИЕН ─── */
    for (let i = 0; i < gameState.aliens.length; i++) {
        const a = gameState.aliens[i];
        for (let j = i + 1; j < gameState.aliens.length; j++) {
            const b = gameState.aliens[j];
            if (!a.isDead && !b.isDead && isColliding(a, b)) {
                a.dir *= -1;  b.dir *= -1;
            }
        }
    }

    /* ───── 3. ИНДИВИДУАЛЬНАЯ СТРЕЛЬБА ───── */
    gameState.aliens.forEach(al => al.shoot(gameState, time));

    /* ───── 4. ОБНОВЛЯЕМ ПУЛИ ───── */
    gameState.bullets.forEach(b => b.update(gameState.canvas));

    /* ───── 5. СТОЛКНОВЕНИЯ ПУЛЬ ───── */
    gameState.bullets.forEach(bullet => {

        /* игрок → пришельцы */
        if (bullet.owner === 'player') {
            gameState.aliens.forEach(alien => {
                if (!alien.isDead && bulletHits(bullet, alien)) {
                    alien.isDead = true;
                    bullet.isDead = true;
                }
            });
        }

        /* 🔥  ПУЛЯ ПРИШЕЛЬЦА → ПРИШЕЛЕЦ (friendly‑fire)  🔥 */
        if (bullet.owner === 'alien') {
            gameState.aliens.forEach(alien => {
                if (!alien.isDead && bulletHits(bullet, alien)) {
                    alien.isDead = true;     // пришелец погибает
                    bullet.isDead = true;    // пуля тоже исчезает
                }
            });
        }

        /* любая пуля → бункеры */
        gameState.bunkers.forEach(bunker => {
            if (!bunker.isDead && bulletHits(bullet, bunker)) {
                bunker.hit(bullet.owner);
                bullet.isDead = true;
            }
        });


        /* пришелец → игрок */
        if (bullet.owner === 'alien' &&
            bulletHits(bullet, gameState.cannon)) {
            stopGame?.();               // ваша логика Game Over
            bullet.isDead = true;
        }
    });

    /* ───── 6. УДАЛЯЕМ МЁРТВЫХ ───── */
    gameState.bullets = gameState.bullets.filter(b => !b.isDead);
    gameState.aliens  = gameState.aliens .filter(a => !a.isDead);
    gameState.bunkers = gameState.bunkers.filter(b => !b.isDead);
}

export function draw(canvas, time) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameState.bunkers.forEach(a => a.draw(ctx, time));
    gameState.aliens.forEach(a => a.draw(ctx, time));
    gameState.cannon.draw(ctx);
    gameState.bullets.forEach(b => b.draw(ctx));
}

function isColliding(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function sweptCollide(bullet, target) {
    // 1) объединим позиции пули за два кадра
    const left   = Math.min(bullet.x, bullet.prevX);
    const right  = Math.max(bullet.x + bullet.w, bullet.prevX + bullet.w);
    const top    = Math.min(bullet.y, bullet.prevY);
    const bottom = Math.max(bullet.y + bullet.h, bullet.prevY + bullet.h);

    // 2) прямоугольники пересекаются?
    return (
        left < target.x + target.w &&
        right > target.x &&
        top < target.y + target.h &&
        bottom > target.y
    );
}

function bulletHits(bullet, target) {
    return isColliding(bullet, target) || sweptCollide(bullet, target);
}
