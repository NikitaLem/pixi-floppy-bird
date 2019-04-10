import * as PIXI from 'pixi.js';
import { options } from '../config/view.config';
import PlayerGraphics from './gameobjects/player/playerGraphics';
import PlayerSprite from './gameobjects/player/playerSprite';
import Balks from './gameobjects/balks/balks';
import { gameOptions } from '../config/game.config';

document.addEventListener('DOMContentLoaded', () => {
    const app = new PIXI.Application(options);
    app.ticker.speed = 0.1;
    app.ticker.deltaTime = 0.1;

    const playerGraphics = new PlayerGraphics(gameOptions.PLAYER_WIDTH, gameOptions.PLAYER_HEIGHT, 0xee5533);
    const player =  new PlayerSprite(app, app.renderer.generateTexture(playerGraphics));
    player.x = 50;
    player.y = (app.view.height - player.height) / 2;

    app.stage.addChild(player);
    player.startFalling();

    const balks = new Balks(app, 4);
    balks.balks.forEach(balk => app.stage.addChild(balk));

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 37 || event.keyCode === 65) {
            player.strafe('left');
        }

        if (event.keyCode === 39 || event.keyCode === 68) {
            player.strafe('right');
        }
    });

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 32) player.jump();
    });

    document.body.appendChild(app.view);
}, false);
