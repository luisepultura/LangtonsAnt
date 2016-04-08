'use strict';
if (typeof window !== 'undefined') {
    let Ant = require('./ant');
    let direction = require('./direction');
    let Langton = require('./langton');
    let LangtonView = require('./langtonView');
    let LangtonGame = window.LangtonGame || {};
    LangtonGame.create = (options) => { return new LangtonView(options); };
    window.LangtonGame = LangtonGame;

    (() => {
        let ants = [new Ant(25, 25, direction.keys.north),
            new Ant(75, 25, direction.keys.south),
            new Ant(25, 75, direction.keys.west),
            new Ant(75, 75, direction.keys.east)];
        let options = { width: 100, height: 100, pixels: 4, speed: 100, ants: ants };
        let langton = new Langton(options);
        let canvas = document.getElementById('grid');
        let context = canvas.getContext("2d");
        canvas.width = options.width * options.pixels;
        canvas.height = options.height * options.pixels;
        let next = langton.next;
        let handler = {
            apply: (target, thisArg, argList) => {
                console.log(thisArg);
                //let isCellBlack = !!thisArg.grid[ant.x][ant.y];
                //context.fillStyle = isCellBlack ? '#fff' : '#000';//switch color
                //context.fillRect(ant.x * thisArg.pixels, ant.y * thisArg.pixels, thisArg.pixels, thisArg.pixels);
                //target.apply(...args);
            }
        };
        //let options = { canvas: document.getElementById('grid'), width: 100, height: 100, pixels: 4, speed: 100, ants: ants };
        // let play = LangtonGame.create(options).play;
        // let playProxy = new Proxy(play, handler);
        // playProxy();
        let nextProxy = new Proxy(next, handler);
        nextProxy();
        langton.play();
    })();
}
else {
    let view = require('./view');
    view(4).play();
}