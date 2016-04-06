'use strict';

// 'use strict';
// let Langton = require('./langton');
// let Ant = require('./ant');
// let direction = require('./direction');

// let view = (size) => {
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
//let ant = new Ant(50, 50, direction.keys.north);
//let langton = new Langton(view().createGrid(100), [ant]);
//console.log(view(6).play() + '\n');

(function UMD(name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } //works for Node
    else if (typeof define === 'function' && define.amd) {
            define(definition);
        } //works for amd
        else {
                context[name] = definition(name, context);
            } //works for browser
})('Langton', undefined, function DEF(name, context) {
    //'use strict';
    var hello = function hello() {
        console.log('hello');
    };

    return {
        hello: hello
    };
});