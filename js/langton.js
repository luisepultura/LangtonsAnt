'use strict';
let clone2DArray = (array) => {
    return array.slice().map(function(row) { return row.slice(); });
};

let clone1DArray = (array) => {
    return array.slice();
};

var Langton = function(board, ants) {
    this.height = board.length;
    this.width = board[0].length;
    this.board = board;
    this.ants = ants;
    this.prevAnts = [];
};

Langton.prototype = {
    next: function() {
        this.prevAnts = clone1DArray(this.ants);
        this.prevAnts.forEach((ant, index) => {
            if (!this.isOutOfRange(ant)) {
                let isBlack = !!this.board[ant.x][ant.y];
                if (isBlack) {
                    this.board[ant.x][ant.y] = 0;
                    ant.turnLeft().forward();
                }
                else {
                    this.board[ant.x][ant.y] = 1;
                    ant.turnRight().forward();
                }
            }
            else {
                this.ants.splice(index, 1);
            }
        });
    },
    isOutOfRange: function(ant) {
        return (ant.x < 0 || ant.x > this.width || ant.y < 0 || ant.y > this.height);
    },
    toString: function() {
        return this.board.map(function(row) {
            return row.join(' ');
        }).join('\n');
    }
};

module.exports = Langton;