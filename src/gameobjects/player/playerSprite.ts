import { gameOptions } from '../../../config/game.config';

export default class PlayerSprite extends PIXI.Sprite {
    private ticker: PIXI.ticker.Ticker;
    private _vy: number = 0;
    private _vx: number = 0;
    private _ay: number = 0;
    private gravity = gameOptions.GRAVITY_VALUE;

    constructor(app: PIXI.Application, texture: PIXI.Texture) {
        super(texture);

        this.ticker = app.ticker;
        this.gravityFactor();
        this.moveHorizontaly();
    }

    get vy(): number {
        return this._vy;
    }

    set vy(val: number) {
        this._vy = val;
    }

    get vx(): number {
        return this._vx;
    }

    set vx(val: number) {
        this._vx = val;
    }

    get ay(): number {
        return this._ay;
    }

    set ay(val: number) {
        this._ay = val;
    }

    private moveVerticaly() {
        this.ticker.add((delta) => {
            this.vy += this.ay * delta;
            this.y += this.vy * delta;
        });
    }

    private moveHorizontaly() {
        this.ticker.add((delta) => {
            this.vx > 0 ? this.vx -= 1 * delta : this.vx < 0 ? this.vx += 1 * delta : this.vx = 0;
            this.x += this.vx * delta;
        });
    }

    private gravityFactor() {
        this.ticker.add((delta) => {
            this.ay < this.gravity ? this.ay += 2.2 * gameOptions.GRAVITY_VALUE * delta : this.ay = this.gravity;
        });
    }

    public startFalling() {
        this.ay = this.gravity;
        this.moveVerticaly();
    }

    public jump() {
        this.ay = -gameOptions.JUMP_FORCE;
        this.vy = 0;
    }

    public strafe(direction: string) {
        if (direction === 'left') {
            this.vx = -gameOptions.STRAFE_SPEED;
        }

        if (direction === 'right') {
            this.vx = gameOptions.STRAFE_SPEED;
        }
    }
}