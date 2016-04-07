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
    //     ctx.fillStyle = "green";
    // ctx.fillRect(10, 10, 100, 100);
};

LangtonView.prototype = {
    createGrid: function() {
        this.canvas.width = this.size * this.pixels;
        this.canvas.height = this.size * this.pixels;
        // for (let y = 0; y < size; y++) {
        //     grid[y] = [];
        //     for (let x = 0; x < size; x++) {
        //         grid[y][x] = 0;
        //     }
        // }
    },
    updateView: function() {

    },
    play: function() {
        let game = new Langton(createGrid(), ants);
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