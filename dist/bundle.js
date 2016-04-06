(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var direction = require('./direction');

var Ant = function Ant(x, y, cardinal) {
    this.prevX;
    this.prevY;
    this.prevCardinal;
    this.x = x;
    this.y = y;
    this.cardinal = cardinal;
};

Ant.prototype = {
    forward: function forward() {
        var coord = direction.directionCoord(this.cardinal);
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += coord[0];
        this.y += coord[1];
        return this;
    },
    turnLeft: function turnLeft() {
        this.prevCardinal = this.cardinal;
        this.cardinal = direction.turnLeft(this.cardinal);
        return this;
    },
    turnRight: function turnRight() {
        this.prevCardinal = this.cardinal;
        this.cardinal = direction.turnRight(this.cardinal);
        return this;
    },
    toString: function toString() {
        return [this.x, this.y].join(' ');
    }
};

module.exports = Ant;
},{"./direction":2}],2:[function(require,module,exports){
'use strict';

var direction = function direction() {
    var keys = { north: 'north', west: 'west', south: 'south', east: 'east' };
    var leftTurn = { north: 'west', west: 'south', south: 'east', east: 'north' };
    var rightTurn = { north: 'east', west: 'north', south: 'west', east: 'south' };
    var coord = { north: [0, 1], west: [-1, 0], south: [0, -1], east: [1, 0] };

    var turnLeft = function turnLeft(key) {
        return leftTurn[key];
    };

    var turnRight = function turnRight(key) {
        return rightTurn[key];
    };

    var directionCoord = function directionCoord(key) {
        return coord[key];
    };

    return {
        keys: keys,
        turnLeft: turnLeft,
        turnRight: turnRight,
        directionCoord: directionCoord
    };
};

module.exports = direction();
},{}],3:[function(require,module,exports){
'use strict';

var clone2DArray = function clone2DArray(array) {
    return array.slice().map(function (row) {
        return row.slice();
    });
};

var clone1DArray = function clone1DArray(array) {
    return array.slice();
};

var Langton = function Langton(board, ants) {
    this.height = board.length;
    this.width = board[0].length;
    this.board = board;
    this.ants = ants;
    this.prevAnts = [];
};

Langton.prototype = {
    next: function next() {
        var _this = this;

        this.prevAnts = clone1DArray(this.ants);
        this.prevAnts.forEach(function (ant, index) {
            if (!_this.isOutOfRange(ant)) {
                var isBlack = !!_this.board[ant.x][ant.y];
                if (isBlack) {
                    _this.board[ant.x][ant.y] = 0;
                    ant.turnLeft().forward();
                } else {
                    _this.board[ant.x][ant.y] = 1;
                    ant.turnRight().forward();
                }
            } else {
                _this.ants.splice(index, 1);
            }
        });
    },
    isOutOfRange: function isOutOfRange(ant) {
        return ant.x < 0 || ant.x > this.width || ant.y < 0 || ant.y > this.height;
    },
    toString: function toString() {
        return this.board.map(function (row) {
            return row.join(' ');
        }).join('\n');
    }
};

module.exports = Langton;
},{}],4:[function(require,module,exports){
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

module.exports = view(6).play();
},{"./ant":1,"./direction":2,"./langton":3}]},{},[4]);
