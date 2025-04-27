import Sprite from './sprite'
import Cannon from './cannon'
import Bullet from './bullet'
import Bunker from "./bunker";
import {BottomShooterAlien, RapidFireAlien} from './alien-classes';
import EventBus from './event‑bus'
import {
    BONUS_ALIENS_MS,
    BONUS_PLAYER_MS,
    BONUS_SPAWN_EVERY,
    BONUS_TIME_TO_LIVE, DEATH_PRICE, PLAYER_BONUS_BULLET_SPEED, PLAYER_BULLET_SPEED,
    PLAYER_LIVES,
    SHOOT_COOLDOWN
} from './constants';
import InputHandler from "./input-handler";

import assetPath from '../assets/invaders.png'
import Bonus from "./bonus";

let assets;
const sprites = {
    aliens: [],
    cannon: null,
    bunker: null
};
const gameState = {
    startTime: 0,
    currentScore: 0,
    bullets: [],
    aliens: [],
    bonuses: [],
    cannon: null,
    bunkers: [],
    canvas: null,

    nextShootAllowed: 0,
    lives: PLAYER_LIVES,
    playerBuffUntil: 0,
    alienBuffUntil: 0,
    alienSpeedBuffUntil: 0,

    killCount: 0,
    nextBonusAt: 0,
    gameStopped: false,
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

export function init(canvas, time) {
    gameState.startTime = time;
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

    for (var i = 0; i < 5; i++) {
        let alienX = canvas.width / 5 * i;
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
    if (inputHandler.isDown('ArrowLeft')) gameState.cannon.x -= 4;
    if (inputHandler.isDown('ArrowRight')) gameState.cannon.x += 4;

    const maxX = gameState.canvas.width - gameState.cannon.w;
    if (gameState.cannon.x < 0) gameState.cannon.x = 0;
    if (gameState.cannon.x > maxX) gameState.cannon.x = maxX;
    const shootCd = (time < gameState.playerBuffUntil) ? SHOOT_COOLDOWN / 2 : SHOOT_COOLDOWN;
    if (inputHandler.isDown('Space') && time >= gameState.nextShootAllowed) {
        const bx = gameState.cannon.x + (gameState.cannon.w >> 1) - 1;
        const by = gameState.cannon.y;
        if(time < gameState.playerBuffUntil)
        {
            gameState.bullets.push(new Bullet(bx, by, PLAYER_BONUS_BULLET_SPEED, 2, 6, '#e048ff', 'player'));

        }
        else
        {
            gameState.bullets.push(new Bullet(bx, by, PLAYER_BULLET_SPEED, 2, 6, '#fff', 'player'));
        }
        gameState.nextShootAllowed = time + shootCd;
    }

    if (time >= gameState.nextBonusAt) {
        const x = Math.random() * (gameState.canvas.width - 18);
        gameState.bonuses.push(new Bonus(x, gameState.canvas.height * 2 / 3, time + BONUS_TIME_TO_LIVE));
        gameState.nextBonusAt = time + BONUS_SPAWN_EVERY;
    }
    gameState.bonuses.forEach(b => b.update(time));

    /* ───── 2. ДВИЖЕНИЕ ПРИШЕЛЬЦЕВ ───── */
    const speedMul = (time < gameState.alienSpeedBuffUntil) ? 2 : 1;
    gameState.aliens.forEach(al => {
        al._lowerMate = gameState.aliens.some(o =>
            o !== al && Math.abs(o.x - al.x) < al.w && o.y > al.y);
        al.move(gameState.canvas, speedMul);
    });

    /* ─── 2‑бис. СТОЛКНОВЕНИЯ АЛИЕН↔АЛИЕН ─── */
    for (let i = 0; i < gameState.aliens.length; i++) {
        const a = gameState.aliens[i];
        for (let j = i + 1; j < gameState.aliens.length; j++) {
            const b = gameState.aliens[j];
            if (!a.isDead && !b.isDead && isColliding(a, b)) {
                a.dir *= -1;
                b.dir *= -1;
            }
        }
    }

    /* ───── 3. ИНДИВИДУАЛЬНАЯ СТРЕЛЬБА ───── */
    gameState.aliens.forEach(al => al.shoot(gameState, time));

    /* ───── 4. ОБНОВЛЯЕМ ПУЛИ ───── */
    gameState.bullets.forEach(b => b.update(gameState.canvas));

    /* ───── 5. СТОЛКНОВЕНИЯ ПУЛЬ ───── */
    gameState.bullets.forEach(bullet => {

        /* игрок -> пришельцы */
        if (bullet.owner === 'player') {
            gameState.aliens.forEach(alien => {
                if (!alien.isDead && bulletHits(bullet, alien)) {
                    alien.dead(time, gameState);
                    bullet.isDead = true;
                }
            });
        }

        /*  ПУЛЯ ПРИШЕЛЬЦА -> ПРИШЕЛЕЦ  */
        if (bullet.owner === 'alien') { //желтые пули будут без ff
            gameState.aliens.forEach(alien => {
                if (!alien.isDead && bulletHits(bullet, alien)) {
                    alien.dead(time, gameState);    // пришелец погибает
                    bullet.isDead = true;    // пуля тоже исчезает

                }
            });
        }

        /* любая пуля -> бункеры */
        gameState.bunkers.forEach(bunker => {
            if (!bunker.isDead && bulletHits(bullet, bunker)) {
                bunker.hit(bullet.owner);
                bullet.isDead = true;
            }
        });


        gameState.bonuses.forEach(bonus => {
            if (!bonus.isDead && bulletHits(bullet, bonus)) {
                bonus.isDead = true;
                if (bullet.owner === 'player')      // игрок попал
                    gameState.playerBuffUntil = time + BONUS_PLAYER_MS;
                else                                // пришелец попал
                    gameState.alienBuffUntil = gameState.alienSpeedBuffUntil =
                        time + BONUS_ALIENS_MS;
                bullet.isDead = true;
            }
        });

        /* пришелец -> игрок */
        if (bullet.owner !== 'player' && bulletHits(bullet, gameState.cannon)) {
            gameState.lives--;
            bullet.isDead = true;
            gameState.bullets = [];
            gameState.bonuses = [];
            gameState.currentScore -= DEATH_PRICE;
            if (gameState.lives <= 0) stopGame?.(gameState.currentScore);
        }
    });


    /* ───── 6. УДАЛЯЕМ МЁРТВЫХ ───── */
    gameState.bullets = gameState.bullets.filter(b => !b.isDead);
    gameState.aliens = gameState.aliens.filter(a => !a.isDead);
    gameState.bunkers = gameState.bunkers.filter(b => !b.isDead);
    gameState.bonuses = gameState.bonuses.filter(b => !b.isDead);

    if(gameState.aliens.length  == 0 && ! gameState.gameStopped)
    {
        gameState.gameStopped = true;
        // window.open("https://www.youtube.com/watch?v=ecI1XvAGd5c", '_blank').focus();
        alert(`Ура победа, вы заработали ${gameState.currentScore}`)
    }
}

export function draw(canvas, time) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gameState.lives; i++) {
        const dx = 4 + i * 16;
        const dy = gameState.canvas.height - 20;
        ctx.drawImage(sprites.cannon.img, sprites.cannon.x, sprites.cannon.y,
            sprites.cannon.w, sprites.cannon.h,
            dx, dy, 14, 10);          // мини-вариант спрайта
    }

    gameState.bonuses.forEach(b => b.draw(ctx, time));
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
    const left = Math.min(bullet.x, bullet.prevX);
    const right = Math.max(bullet.x + bullet.w, bullet.prevX + bullet.w);
    const top = Math.min(bullet.y, bullet.prevY);
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
