import { gameOptions } from "../../../config/game.config";
import { Graphics } from "pixi.js";
export default class BalkSprite extends PIXI.Sprite {
    constructor(app, texture) {
        super(texture);
        this._vy = 0;
        this._vx = gameOptions.BALK_SPEED;
        this.app = app;
        this.ticker = app.ticker;
        this.createRandomMask();
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
    createRandomMask() {
        if (this.balkMask)
            this.removeChild(this.balkMask);
        this.randomHeight = Math.floor(Math.random() * (this.app.view.height - gameOptions.BALK_GAP));
        this.balkMask = new Graphics();
        this.balkMask.beginFill(0x1);
        this.balkMask.drawRect(0, 0, gameOptions.BALK_WIDTH, this.randomHeight);
        this.balkMask.drawRect(0, this.randomHeight + gameOptions.BALK_GAP, gameOptions.BALK_WIDTH, this.app.view.height - this.randomHeight - gameOptions.BALK_WIDTH);
        this.balkMask.endFill();
        this.mask = this.balkMask;
        this.addChild(this.balkMask);
    }
    moveLeft() {
        this.ticker.add((delta) => {
            this.x -= this.vx * delta;
            if (this.x <= -gameOptions.BALK_WIDTH) {
                this.x = this.app.view.width + gameOptions.BALK_WIDTH;
                this.createRandomMask();
            }
        });
    }
}
