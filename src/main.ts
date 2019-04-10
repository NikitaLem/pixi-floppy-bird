import * as PIXI from 'pixi.js';
import { options } from '../config/view.config';
import PlayerGraphics from './gameobjects/player/playerGraphics';
import PlayerSprite from './gameobjects/player/playerSprite';

document.addEventListener('DOMContentLoaded', () => {
    const app = new PIXI.Application(options);
    app.ticker.speed = 0.1;
    app.ticker.deltaTime = 0.1;

    const playerGraphics = new PlayerGraphics(50, 50, 0xee5533);
    const player =  new PlayerSprite(app, app.renderer.generateTexture(playerGraphics));
    player.x = 50;
    player.y = (app.view.height - player.height) / 2;

    app.stage.addChild(player);
    player.startFalling();

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 32) {
            player.jump();
        }
    });

    document.body.appendChild(app.view);
}, false);
