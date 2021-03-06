'use strict';

var clone2DArray = function clone2DArray(array) {
    return array.slice().map(function (row) {
        return row.slice();
    });
};

var clone1DArray = function clone1DArray(array) {
    return array.slice();
};

var Langton = function Langton(options) {
    this.width = options.width;
    this.height = options.height;
    this.pixels = options.pixels;
    this.speed = options.speed;
    this.ants = options.ants;
    this.prevAnts = [];
    this.grid = [];
    this.createGrid();
};

Langton.prototype = {
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
        //console.log(me + '\n');
        if (this.ants.length) {
            setTimeout(function () {
                me.play();
            }, me.speed);
        }
    },
    toString: function toString() {
        return this.grid.map(function (row) {
            return row.join(' ');
        }).join('\n');
    }
};

module.exports = Langton;