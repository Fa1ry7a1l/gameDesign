import Vector2 from 'phaser/src/math/Vector2'

const eps = 20;

const radius = 200


export class Slime extends Phaser.Physics.Arcade.Sprite { // пойдет как объект - контекст
    constructor(scene, x, y, name, frame, steering, speed = 20) {
        super(scene, x, y, name, frame);
        this.steering = steering;
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.player = scene.player;
        this.playerPrev = {x: 0, y: 0};
        this.playerCur = {x: 0, y: 0};
        this.hidePlaces = scene.green
        this.sceneCenter = new Vector2(400,270)
        this.speed = speed
    }

    update() {
        this.playerPrev = this.playerCur
        this.playerCur = {x: this.player.x, y: this.player.y}

        this.steering.update(this);


        this.updateAnimation();
    }

    updateAnimation() {
        const animsController = this.anims;
        if (this.wantToJump) {
            animsController.play(this.animations[1], true);
        } else {
            animsController.play(this.animations[0], true);
        }

    }

    hasArrived() {
        return this.pointOfInterest === undefined || this.pointOfInterest.distance(this.body.position) < eps;
    }
}

export class Steering {

    update(slime) {

    }

    moveToPointOfInterest(slime) {
        if (slime.hasArrived()) {
            return
        }

        const body = slime.body;
        const position = body.position;
        body.setVelocity(slime.pointOfInterest.x - position.x, slime.pointOfInterest.y - position.y);
        if (body.velocity.length() > slime.speed) {
            slime.body.velocity.normalize().scale(slime.speed)
        }
    }
}

export class SteeringInterceptor extends Steering {
    update(slime) {
        slime.pointOfInterest = new Vector2(2 * slime.playerCur.x - slime.playerPrev.x,
            2 * slime.playerCur.y - slime.playerPrev.y);

        this.moveToPointOfInterest(slime);
    }
}

export class HideInterceptor extends Steering {
    update(slime) {
        let hidePoints = []
        for (let i = 0; i < slime.hidePlaces.length; i++) {
            let vec = new Vector2(slime.hidePlaces[i].x - slime.player.x, slime.hidePlaces[i].y - slime.player.y);
            vec.normalize()
            vec.scale(2 * eps)
            hidePoints.push(vec.add(slime.hidePlaces[i]).subtract(slime))
        }
        hidePoints.sort((a, b) => a.length() - b.length())
        console.log(hidePoints)

        slime.pointOfInterest = hidePoints[0].add(slime);

        this.moveToPointOfInterest(slime);
    }
}


export class PathSteering extends Steering {

    update(slime) {
        if (!slime.pointOfInterest) {
            this.initPoint(slime)
        }

        if (slime.hasArrived()) {
            this.nextPoint(slime)
        }

        this.moveToPointOfInterest(slime);
    }

    initPoint(slime) {
        slime.pointOfInterest = (new Vector2(slime.x, slime.y)).subtract(slime.sceneCenter).normalize().scale(radius).add(slime.sceneCenter)
    }

    nextPoint(slime) {
        const angleRadians = Phaser.Math.DegToRad(20)
        slime.pointOfInterest.subtract(slime.sceneCenter).rotate(angleRadians).add(slime.sceneCenter)
    }
}
