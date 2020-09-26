export default class BalkGraphics extends PIXI.Graphics {
    constructor(width, height, color, lineWidth = 0, lineColor = 0x000000, lineAlpha = 0) {
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
