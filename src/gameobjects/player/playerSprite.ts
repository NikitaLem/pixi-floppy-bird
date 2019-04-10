import { gameOptions } from '../../../config/game.config';

export default class PlayerSprite extends PIXI.Sprite {
    private ticker: PIXI.ticker.Ticker;
    private _vy: number = 0;
    private _ay: number = 0;
    private gravity = gameOptions.GRAVITY_VALUE;

    constructor(app: PIXI.Application, texture: PIXI.Texture) {
        super(texture);

        this.ticker = app.ticker;
    }

    get vy(): number {
        return this._vy;
    }

    set vy(val: number) {
        this._vy = val;
    }

    get ay(): number {
        return this._ay;
    }

    set ay(val: number) {
        this._ay = val;
    }

    public startFalling() {
        this.ticker.add((delta) => {
            this.ay = this.gravity;
            this.vy += this.ay * delta;
            this.y += this.vy * delta + this.ay**2 * delta / 2;
        });
    }

    public jump() {
        this.ay = -100;
        this.startFalling();
    }
}