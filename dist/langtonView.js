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