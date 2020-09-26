export default class WinText extends PIXI.Container {
    constructor(label, maxLabel, maxWin) {
        super();
        this.label = label;
        this._win = 0;
        this.maxLabel = maxLabel;
        this._maxWin = maxWin;
    }
    get win() {
        return this._win;
    }
    set win(val) {
        this._win = val;
    }
    get maxWin() {
        return this._maxWin;
    }
    set maxWin(val) {
        this.maxWin = val;
    }
    create() {
        const style = {
            fontFamily: 'Arial',
            fontSize: 28,
            fill: '#ffffff',
        };
        const labelText = new PIXI.Text(this.label, style);
        this.addChild(labelText);
        this.winText = new PIXI.Text(this.win.toString(), style);
        this.winText.x = 90;
        this.winText.y = 1;
        this.addChild(this.winText);
        const maxLabelText = new PIXI.Text(this.maxLabel, style);
        maxLabelText.y = 30;
        this.addChild(maxLabelText);
        this.maxWinText = new PIXI.Text(this.maxWin.toString(), style);
        this.maxWinText.x = 145;
        this.maxWinText.y = 31;
        this.addChild(this.maxWinText);
    }
    updateWin(val) {
        this.win = val;
        this.winText.text = this.win.toString();
    }
}
