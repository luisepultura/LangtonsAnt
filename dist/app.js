'use strict';

if (typeof window !== 'undefined') {
    (function () {
        var Ant = require('./ant');
        var direction = require('./direction');
        var LangtonView = require('./langtonView');
        var LangtonGame = window.LangtonGame || {};
        LangtonGame.create = function (options) {
            return new LangtonView(options);
        };
        window.LangtonGame = LangtonGame;

        (function () {
            var ants = [new Ant(25, 25, direction.keys.north), new Ant(75, 25, direction.keys.south), new Ant(25, 75, direction.keys.west), new Ant(75, 75, direction.keys.east)];
            var options = { canvas: document.getElementById('grid'), width: 100, height: 100, pixels: 4, speed: 100, ants: ants };
            var game = LangtonGame.create(options);
            game.play();
        })();
    })();
} else {
    var view = require('./view');
    view(4).play();
}