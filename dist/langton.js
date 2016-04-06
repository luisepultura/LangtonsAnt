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