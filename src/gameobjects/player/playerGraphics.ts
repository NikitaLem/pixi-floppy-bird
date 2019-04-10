export default class PlayerGraphics extends PIXI.Graphics {
    public playerWidth: number;
    public playerHeight: number;
    public playerColor: number;
    public playerLineColor: number;
    public playerLineWidth: number;
    public playerLineAlpha: number;

    constructor(width: number, height: number, color: number, lineWidth: number = 0, lineColor: number = 0x000000, lineAlpha: number = 0) {
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