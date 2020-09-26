import BalkSprite from "./balkSprite";
import BalkGraphics from "./balkGraphics";
import { gameOptions } from "../../../config/game.config";
export default class Balks extends PIXI.Container {
    constructor(app, amount) {
        super();
        this._balks = [];
        this.app = app;
        this._amount = amount;
        this
            .createBalks()
            .setPosition()
            .moveBalks();
    }
    get balks() {
        return this._balks;
    }
    get amount() {
        return this._amount;
    }
    moveBalks() {
        this.balks.forEach(balk => {
            balk.moveLeft();
        });
        return this;
    }
    setPosition() {
        this.balks.forEach((balk, index) => {
            balk.x = (index + 1) * this.app.view.width / 4;
        });
        return this;
    }
    createBalks() {
        for (let i = 0; i < this.amount; i++) {
            const balkGraphics = new BalkGraphics(gameOptions.BALK_WIDTH, this.app.view.height, 0x222222);
            this.balks.push(new BalkSprite(this.app, this.app.renderer.generateTexture(balkGraphics)));
        }
        return this;
    }
}
