export default class BalkGraphics extends PIXI.Graphics {
  public balkWidth: number;
  public balkHeight: number;
  public balkColor: number;
  public balkLineColor: number;
  public balkLineWidth: number;
  public balkLineAlpha: number;

  constructor(width: number, height: number, color: number, lineWidth: number = 0, lineColor: number = 0x000000, lineAlpha: number = 0) {
    super();

    this.balkWidth = width;
    this.balkHeight = height;
    this.balkColor = color;
    this.balkLineWidth = lineWidth;
    this.balkLineColor = lineColor;
    this.balkLineAlpha = lineAlpha;

    this.lineStyle(this.balkLineWidth, this.balkLineColor, this.balkLineAlpha);
    this.beginFill(this.balkColor);
    this.drawRect(0, 0, this.balkWidth, this.balkHeight);
    this.endFill();
  }
}