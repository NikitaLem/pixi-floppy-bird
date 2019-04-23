import * as PIXI from 'pixi.js';
import PlayerGraphics from './gameobjects/player/playerGraphics';
import PlayerSprite from './gameobjects/player/playerSprite';
import Balks from './gameobjects/balks/balks';
import HitDetection from './helpers/HitDetection';
import WinController from './helpers/WinController';
import { options } from '../config/view.config';
import { gameOptions } from '../config/game.config';
import WinText from './gameobjects/wintext/WinText';
import GameOver from './gameobjects/gameover/GameOver';

document.addEventListener('DOMContentLoaded', () => {
    const app = new PIXI.Application(options);

    let gameState: boolean = true;
    let player: PlayerSprite;
    let balks: Balks;
    let winController: WinController;
    let winText: WinText;
    let gameOver: GameOver;

    //замедление тикера
    app.ticker.speed = 0.1;
    app.ticker.deltaTime = 0.1;

    //создание игровых объектов
    const init = function initializeGameObjects() {
        //создание игрока
        const playerGraphics = new PlayerGraphics(gameOptions.PLAYER_WIDTH, gameOptions.PLAYER_HEIGHT, 0xee5533);
        player =  new PlayerSprite(app, app.renderer.generateTexture(playerGraphics));
        player.x = 50;
        player.y = (app.view.height - player.height) / 2;
        app.stage.addChild(player);
        player.startFalling();

        //создание палок-препятствий
        balks = new Balks(app, 4);
        balks.balks.forEach(balk => app.stage.addChild(balk));

        //создание вин контроллера
        winController = new WinController();

        //создание текста с очками игрока
        winText = new WinText('Score:', 'Max score:', winController.maxWin);
        winText.create();
        winText.x = app.view.width - 1.1 * winText.width;
        winText.y = 10;
        app.stage.addChild(winText);

        //создание экрана конца игры
        gameOver = new GameOver();
        gameOver.x = (app.view.width - gameOver.width) / 2;
        gameOver.y =  (app.view.height - gameOver.height) / 2;
        app.stage.addChild(gameOver);

        gameOver.on(GameOver.ON_GAME_OVER_PRESSED, () => {
            restartGame();
        });

        gameState = true;
    }

    init();

    //удаление игровых объектов
    const destroyObjects = function destroyGameObjects() {
        app.stage.removeChild(player);
        balks.balks.forEach(balk => app.stage.removeChild(balk));
        app.stage.removeChild(winText);
        app.stage.removeChild(gameOver);
    }

    //перезапустить игру
    const restartGame = function deleteThanInitGame() {
        destroyObjects();
        init();
        app.ticker.start();
    }

    //функция для остановки игры и сохранения результатов
    const stopGame = function gameOverWithSave() {
        app.ticker.stop();
        winController.saveWin();
        gameOver.showGameOver(winController.currentWin);
        gameState = false;
    }

    //добавление хит детекшена игрока с палками и границами канваса и увеличения счетчика игрока
    app.ticker.add(delta => {
        if (HitDetection.hitTheGap(player, balks.balks) === undefined) {
            winController.readyForWin = true;
        }

        if (HitDetection.hitTheGap(player, balks.balks) === true) {
            winController.increment();
            winText.updateWin(winController.currentWin);
        }

        if (HitDetection.hitTheGap(player, balks.balks) === false) {
            stopGame();
        }

        if (HitDetection.hitBorders(player, { width: app.view.width, height: app.view.height })) {
            stopGame();
        }
    });

    //дабавление управления игроком
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 37 || event.keyCode === 65) {
            player.strafe('left');
        }

        if (event.keyCode === 39 || event.keyCode === 68) {
            player.strafe('right');
        }
    });

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 32)
            gameState ? player.jump() : restartGame();
    });

    document.body.appendChild(app.view);
}, false);
