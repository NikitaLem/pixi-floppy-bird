import { gameOptions } from "../../../config/game.config";
import { Graphics } from "pixi.js";

export default class BalkSprite extends PIXI.Sprite {

  private ticker: PIXI.ticker.Ticker;
  private _vy: number = 0;
  private _vx: number = gameOptions.BALK_SPEED;
  public app: PIXI.Application;
  public balkMask: PIXI.Graphics;
  public randomHeight: number;
    
  constructor(app: PIXI.Application, texture: PIXI.Texture) {
    super(texture);

    this.app = app;
    this.ticker = app.ticker;
    this.createRandomMask();
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

  private createRandomMask() {
    if (this.balkMask) this.removeChild(this.balkMask);

    this.randomHeight = Math.floor(Math.random() * (this.app.view.height - gameOptions.BALK_GAP));

    this.balkMask = new Graphics();
    this.balkMask.beginFill(0x1);
    this.balkMask.drawRect(0, 0, gameOptions.BALK_WIDTH, this.randomHeight);
    this.balkMask.drawRect(0, this.randomHeight + gameOptions.BALK_GAP, gameOptions.BALK_WIDTH, gameOptions.BALK_GAP);
    this.balkMask.endFill();
    this.mask = this.balkMask;
    this.addChild(this.balkMask);
  }

  public moveLeft() {
    this.ticker.add((delta) => {
      this.x -= this.vx * delta;
      if (this.x <= -gameOptions.BALK_WIDTH) {
        this.x = this.app.view.width + gameOptions.BALK_WIDTH;
        this.createRandomMask();
      }
    });
  }
}