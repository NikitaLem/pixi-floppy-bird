export default class PlayerGraphics extends PIXI.Graphics {
    constructor(width, height, color, lineWidth = 0, lineColor = 0x000000, lineAlpha = 0) {
        super();
        this.playerWidth = width;
        this.playerHeight = height;
        this.playerColor = color;
        this.playerLineWidth = lineWidth;
        this.playerLineColor = lineColor;
        this.playerLineAlpha = lineAlpha;
        this.lineStyle(this.playerLineWidth, this.playerLineColor, this.playerLineAlpha);
        this.beginFill(this.playerColor);
        this.drawRect(0, 0, this.playerWidth, this.playerHeight);
        this.endFill();
    }
}
