import BalkSprite from "./balkSprite";
import BalkGraphics from "./balkGraphics";
import { gameOptions } from "../../../config/game.config";

export default class Balks extends PIXI.Container {

  private _balks: BalkSprite[] = [];
  private _amount: number;
  public app: PIXI.Application;

  constructor(app: PIXI.Application, amount: number) {
    super();

    this.app = app;
    this._amount = amount;

    this
      .createBalks()
      .setPosition()
      .moveBalks();
  }

  get balks(): BalkSprite[] {
    return this._balks;
  }

  get amount(): number {
    return this._amount;
  }

  private moveBalks() {
    this.balks.forEach(balk => {
      balk.moveLeft();
    });

    return this;
  }

  private setPosition() {
    this.balks.forEach((balk, index) => {
      balk.x = (index + 1) * this.app.view.width / this.amount;
    });

    return this;
  }

  private createBalks() {
    const balkGraphics = new BalkGraphics(gameOptions.BALK_WIDTH, this.app.view.height, 0x222222);

    for (let i = 0; i < this.amount; i++) {
      this.balks.push(new BalkSprite(this.app, this.app.renderer.generateTexture(balkGraphics)));
    }

    return this;
  }
}