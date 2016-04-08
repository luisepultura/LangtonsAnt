'use strict';
let clone1DArray = (array) => {
    return array.slice();
};

var LangtonView = function(options) {
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
    createGrid: function() {
        for (let y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = 0;
            }
        }
    },
    next: function() {
        this.prevAnts = clone1DArray(this.ants);
        this.prevAnts.forEach((ant, index) => {
            if (this.isInRange(ant)) {
                let isCellBlack = !!this.grid[ant.x][ant.y];
                this.grid[ant.x][ant.y] = 1 ^ this.grid[ant.x][ant.y];//switch flag
                this.context.fillStyle = isCellBlack ? '#fff' : '#000';//switch color
                this.context.fillRect(ant.x * this.pixels, ant.y * this.pixels, this.pixels, this.pixels);
                if (isCellBlack) {
                    ant.turnLeft().forward();
                }
                else {
                    ant.turnRight().forward();
                }
            }
            else {
                this.ants.splice(index, 1);
            }
        });
    },
    isInRange: function(ant) {
        return (ant.x > 0 || ant.x < this.width || ant.y > 0 || ant.y < this.height);
    },
    play: function() {
        let me = this;
        this.next();
        if (this.ants.length) {
            setTimeout(() => { me.play(); }, me.speed);
        }
    }
};

module.exports = LangtonView;