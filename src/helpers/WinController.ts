export default class WinController {
    private _currentWin: number;
    private _maxWin: number;
    private _readyForWin: boolean;
    
    constructor() {
        this._currentWin = 0;
        this._readyForWin = false;
        this._maxWin = this.getMaxWin();
    }

    get currentWin(): number {
        return this._currentWin;
    }

    set currentWin(val: number) {
        this._currentWin = val;
    }

    get maxWin(): number {
        return this._maxWin;
    }

    set maxWin(val: number) {
        this._maxWin = val;
    }

    get readyForWin(): boolean {
        return this._readyForWin;
    }

    set readyForWin(val: boolean) {
        this._readyForWin = val;
    }

    private getMaxWin(): number | undefined {
        try {
            return Number.parseInt(localStorage.getItem('maxwin')) || 0;
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    public increment() {
        if (this.readyForWin) {
            this.currentWin++;
            this.readyForWin = false;
        }
    }

    public saveWin() {
        try {
            this.maxWin = this.getMaxWin();
            if (this.currentWin > this.maxWin) localStorage.setItem('maxwin', this.currentWin.toString());
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
}