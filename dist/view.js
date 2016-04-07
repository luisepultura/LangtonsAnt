'use strict';

var Langton = require('./langton');
var Ant = require('./ant');
var direction = require('./direction');

var view = function view(size) {
    var grid = [];
    var ants = [new Ant(size / 2, size / 2, direction.keys.north)];
    var timer = void 0;
    var createGrid = function createGrid() {
        for (var y = 0; y < size; y++) {
            grid[y] = [];
            for (var x = 0; x < size; x++) {
                grid[y][x] = 0;
            }
        }
        return grid;
    };
    var game = new Langton(createGrid(), ants);
    var play = function play() {
        game.next();
        console.log(game + '\n');
        if (game.ants.length) {
            setTimeout(play, 1000);
        }
    };

    return {
        play: play
    };
};

module.exports = view;