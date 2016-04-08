'use strict';
if (typeof window !== 'undefined') {
    let Ant = require('./ant');
    let direction = require('./direction');
    let LangtonView = require('./langtonView');
    let LangtonGame = window.LangtonGame || {};
    LangtonGame.create = (options) => { return new LangtonView(options); };
    window.LangtonGame = LangtonGame;

    (() => {
        let ants = [new Ant(25, 25, direction.keys.north),
            new Ant(75, 25, direction.keys.south),
            new Ant(25, 75, direction.keys.west),
            new Ant(75, 75, direction.keys.east)];
        let options = { canvas: document.getElementById('grid'), width: 100, height: 100, pixels: 4, speed: 100, ants: ants };
        let game = LangtonGame.create(options);
        game.play();
    })();
}
else {
    let view = require('./view');
    view(4).play();
}