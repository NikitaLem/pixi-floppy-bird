import { gameOptions } from "../../../config/game.config";
import { Graphics } from "pixi.js";

export default class BalkSprite extends PIXI.Sprite {

  private ticker: PIXI.ticker.Ticker;
  private _vy: number = 0;
  private _vx: number = gameOptions.BALK_SPEED;
  public app: PIXI.Application;
    
  constructor(app: PIXI.Application, texture: PIXI.Texture) {
    super(texture);

    this.app = app;
    this.ticker = app.ticker;

    const mask = new Graphics();
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

  public moveLeft() {
    this.ticker.add((delta) => {
      this.x -= this.vx * delta;
      if (this.x <= -gameOptions.BALK_WIDTH) this.x = this.app.view.width + gameOptions.BALK_WIDTH;
    });
  }
}