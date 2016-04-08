'use strict';

if (typeof window !== 'undefined') {
    (function () {
        var Ant = require('./ant');
        var direction = require('./direction');
        var Langton = require('./langton');
        var LangtonView = require('./langtonView');
        var LangtonGame = window.LangtonGame || {};
        LangtonGame.create = function (options) {
            return new LangtonView(options);
        };
        window.LangtonGame = LangtonGame;

        (function () {
            var ants = [new Ant(25, 25, direction.keys.north), new Ant(75, 25, direction.keys.south), new Ant(25, 75, direction.keys.west), new Ant(75, 75, direction.keys.east)];
            var options = { width: 100, height: 100, pixels: 4, speed: 100, ants: ants };
            var langton = new Langton(options);
            var canvas = document.getElementById('grid');
            var context = canvas.getContext("2d");
            canvas.width = options.width * options.pixels;
            canvas.height = options.height * options.pixels;
            var next = langton.next;
            var handler = {
                apply: function apply(target, thisArg, argList) {
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
            var nextProxy = new Proxy(next, handler);
            nextProxy();
            langton.play();
        })();
    })();
} else {
    var view = require('./view');
    view(4).play();
}