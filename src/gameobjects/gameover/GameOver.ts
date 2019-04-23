export default class GameOver extends PIXI.Container {
    public static ON_GAME_OVER_PRESSED = 'on_game_over_pressed';

    private _finalScore: number = 0;
    private finalScoreText: PIXI.Text;
    
    constructor() {
        super();

        const style = {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: '#ffffff'
        };

        const gameOverText = new PIXI.Text(`GAME OVER!`, {
            ...style,
            fontSize: 42
        });
        this.addChild(gameOverText);

        this.finalScoreText = new PIXI.Text(`Your final score: ${this._finalScore}`, style);
        this.finalScoreText.y = 50;
        this.addChild(this.finalScoreText);

        gameOverText.x = (this.finalScoreText.width - gameOverText.width) / 2;

        this.visible = false;

        const restart = new PIXI.Text(`RESTART`, {
            ...style,
            fontSize: 42
        });
        restart.x = (this.finalScoreText.width - restart.width) / 2;
        restart.y = 130;
        restart.interactive = true;
        restart.buttonMode = true;
        this.addChild(restart);

        restart.on('pointerdown', () => {
            this.emit(GameOver.ON_GAME_OVER_PRESSED);
        });
    }

    set finalScore(val: number) {
        this._finalScore = val;
    }

    public showGameOver(score: number) {
        this.finalScore = score;
        this.finalScoreText.text = `Your final score: ${this._finalScore}`;
        this.visible = true;
    }
}