'use strict';

var Langton = require('./langton');
var Ant = require('./ant');
var direction = require('./direction');

var clone2DArray = function clone2DArray(array) {
    return array.slice().map(function (row) {
        return row.slice();
    });
};

var clone1DArray = function clone1DArray(array) {
    return array.slice();
};

var LangtonView = function LangtonView(options) {

    Langton.call(this, { width: options.width,
        height: options.height,
        pixels: options.pixels,
        speed: options.speed,
        ants: options.ants });

    this.canvas = options.canvas;
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.width * this.pixels;
    this.canvas.height = this.height * this.pixels;
};

LangtonView.prototype = Object.create();

LangtonView.prototype = {
    next: function next() {
        var _this = this;

        this.prevAnts = clone1DArray(this.ants);
        this.prevAnts.forEach(function (ant, index) {
            if (_this.isInRange(ant)) {
                var isCellBlack = !!_this.board[ant.x][ant.y];
                _this.board[ant.x][ant.y] = 1 ^ _this.board[ant.x][ant.y]; //switch flag
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
    },
    toString: function toString() {
        return this.board.map(function (row) {
            return row.join(' ');
        }).join('\n');
    }
};

module.exports = LangtonView;