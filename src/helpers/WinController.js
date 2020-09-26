export default class WinController {
    constructor() {
        this._currentWin = 0;
        this._readyForWin = false;
        this._maxWin = this.getMaxWin();
    }
    get currentWin() {
        return this._currentWin;
    }
    set currentWin(val) {
        this._currentWin = val;
    }
    get maxWin() {
        return this._maxWin;
    }
    set maxWin(val) {
        this._maxWin = val;
    }
    get readyForWin() {
        return this._readyForWin;
    }
    set readyForWin(val) {
        this._readyForWin = val;
    }
    getMaxWin() {
        try {
            return Number.parseInt(localStorage.getItem('maxwin')) || 0;
        }
        catch (error) {
            console.error(`Error: ${error}`);
        }
    }
    increment() {
        if (this.readyForWin) {
            this.currentWin++;
            this.readyForWin = false;
        }
    }
    saveWin() {
        try {
            this.maxWin = this.getMaxWin();
            if (this.currentWin > this.maxWin)
                localStorage.setItem('maxwin', this.currentWin.toString());
        }
        catch (error) {
            console.error(`Error: ${error}`);
        }
    }
}
