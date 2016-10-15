import { Component } from '@angular/core';
import preload from './preload';
import create from './create';
import update from './update';

@Component({
    template: ''
})

export default class GameComponent {
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
            preload: preload,
            create: create,
            update: update
        });
        this.game.scope = {
            cursors:undefined
        }
    }
}