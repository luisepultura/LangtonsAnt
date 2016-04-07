'use strict';
let Langton = require('./langton');
let Ant = require('./ant');
let direction = require('./direction');


var LangtonView = function(options) {
    this.canvas = options.canvas;
    this.size = options.size;
    this.pixels = options.pixels;
    this.speed = options.speed;
    this.ants = options.ants;
    this.grid = [];
    this.context = options.canvas.getContext("2d");
    //     ctx.fillStyle = "green";
    // ctx.fillRect(10, 10, 100, 100);
};

LangtonView.prototype = {
    createGrid: function() {
        this.canvas.width = this.size * this.pixels;
        this.canvas.height = this.size * this.pixels;
        for (let y = 0; y < this.size; y++) {
            grid[y] = [];
            for (let x = 0; x < this.size; x++) {
                grid[y][x] = 0;
            }
        }
    },
    next: function() {
        this.ants.forEach((ant, index) => {
            if (!this.isOutOfRange(ant)) {
                let isBlack = !!this.board[ant.x][ant.y];
                if (isBlack) {
                    this.context.fillStyle = '#fff';
                    this.board[ant.x][ant.y] = 0;
                    ant.turnLeft().forward();
                }
                else {
                    this.context.fillStyle = '#000';
                    this.board[ant.x][ant.y] = 1;
                    ant.turnRight().forward();
                }
            }
            else {
                this.ants.splice(index, 1);
            }
        });
    },
    play: function() {        
        this.createGrid();

    }
};

// let LangtonView = (size) => {
//     let grid = [];
//     let ants = [new Ant(size / 2, size / 2, direction.keys.north)];
//     let timer;
//     let createGrid = () => {
//         for (let y = 0; y < size; y++) {
//             grid[y] = [];
//             for (let x = 0; x < size; x++) {
//                 grid[y][x] = 0;
//             }
//         }
//         return grid;
//     };
//     let game = new Langton(createGrid(), ants);
//     let play = () => {
//         game.next();
//         console.log(game + '\n');
//         if (game.ants.length) {
//             setTimeout(play, 1000);
//         }
//     };

//     return {
//         play: play
//     };
// };

module.exports = LangtonView;