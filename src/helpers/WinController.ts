export default class WinController {
    private _currentWin: number;
    private _maxWin: number;
    
    constructor(maxWin: number = 0) {
        this._currentWin = 0;
        this._maxWin = maxWin;
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

    
}