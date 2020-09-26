import { gameOptions } from '../../../config/game.config';
export default class PlayerSprite extends PIXI.Sprite {
    constructor(app, texture) {
        super(texture);
        this._vy = 0;
        this._vx = 0;
        this._ay = 0;
        this.gravity = gameOptions.GRAVITY_VALUE;
        this.ticker = app.ticker;
        this.gravityFactor();
        this.moveHorizontaly();
    }
    get vy() {
        return this._vy;
    }
    set vy(val) {
        this._vy = val;
    }
    get vx() {
        return this._vx;
    }
    set vx(val) {
        this._vx = val;
    }
    get ay() {
        return this._ay;
    }
    set ay(val) {
        this._ay = val;
    }
    moveVerticaly() {
        this.ticker.add((delta) => {
            this.vy += this.ay * delta;
            this.y += this.vy * delta;
        });
    }
    moveHorizontaly() {
        this.ticker.add((delta) => {
            this.vx > 0 ? this.vx -= 1 * delta : this.vx < 0 ? this.vx += 1 * delta : this.vx = 0;
            this.x += this.vx * delta;
        });
    }
    gravityFactor() {
        this.ticker.add((delta) => {
            this.ay < this.gravity ? this.ay += 2.2 * gameOptions.GRAVITY_VALUE * delta : this.ay = this.gravity;
        });
    }
    startFalling() {
        this.ay = this.gravity;
        this.moveVerticaly();
    }
    jump() {
        this.ay = -gameOptions.JUMP_FORCE;
        this.vy = 0;
    }
    strafe(direction) {
        if (direction === 'left') {
            this.vx = -gameOptions.STRAFE_SPEED;
        }
        if (direction === 'right') {
            this.vx = gameOptions.STRAFE_SPEED;
        }
    }
}
