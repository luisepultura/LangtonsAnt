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
},{"./direction":3}],2:[function(require,module,exports){
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
},{"./ant":1,"./direction":3,"./langtonView":5,"./view":6}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
                _this.board[ant.x][ant.y] = 1 ^ _this.board[ant.x][ant.y]; //switch flag
                if (isBlack) {
                    ant.turnLeft().forward();
                } else {
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
},{}],5:[function(require,module,exports){
'use strict';

var clone1DArray = function clone1DArray(array) {
    return array.slice();
};

var LangtonView = function LangtonView(options) {
    this.canvas = options.canvas;
    this.width = options.width;
    this.height = options.height;
    this.pixels = options.pixels;
    this.speed = options.speed;
    this.ants = options.ants;
    this.grid = [];
    this.prevAnts = [];
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.width * this.pixels;
    this.canvas.height = this.height * this.pixels;
    this.createGrid();
};

LangtonView.prototype = {
    createGrid: function createGrid() {
        for (var y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x] = 0;
            }
        }
    },
    next: function next() {
        var _this = this;

        this.prevAnts = clone1DArray(this.ants);
        this.prevAnts.forEach(function (ant, index) {
            if (_this.isInRange(ant)) {
                var isCellBlack = !!_this.grid[ant.x][ant.y];
                _this.grid[ant.x][ant.y] = 1 ^ _this.grid[ant.x][ant.y]; //switch flag
                _this.context.fillStyle = isCellBlack ? '#fff' : '#000'; //switch color
                _this.context.fillRect(ant.x * _this.pixels, ant.y * _this.pixels, _this.pixels, _this.pixels);
                if (isCellBlack) {
                    ant.turnLeft().forward();
                } else {
                    ant.turnRight().forward();
                }
            } else {
                _this.ants.splice(index, 1);
            }
        });
    },
    isInRange: function isInRange(ant) {
        return ant.x > 0 || ant.x < this.width || ant.y > 0 || ant.y < this.height;
    },
    play: function play() {
        var me = this;
        this.next();
        if (this.ants.length) {
            setTimeout(function () {
                me.play();
            }, me.speed);
        }
    }
};

module.exports = LangtonView;
},{}],6:[function(require,module,exports){
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
},{"./ant":1,"./direction":3,"./langton":4}]},{},[2]);
