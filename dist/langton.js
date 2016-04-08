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
            if (_this.isInRange(ant)) {
                var isCellBlack = !!_this.grid[ant.x][ant.y];
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
    isInRange: function isInRange(ant) {
        return ant.x > 0 || ant.x < this.width || ant.y > 0 || ant.y < this.height;
    },
    toString: function toString() {
        return this.board.map(function (row) {
            return row.join(' ');
        }).join('\n');
    }
};

module.exports = Langton;