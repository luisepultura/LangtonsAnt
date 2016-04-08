'use strict';
let clone2DArray = (array) => {
    return array.slice().map(function(row) { return row.slice(); });
};

let clone1DArray = (array) => {
    return array.slice();
};

var Langton = function(options) {
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
        //console.log(me + '\n');
        if (this.ants.length) {
            setTimeout(() => { me.play(); }, me.speed);
        }
    },
    toString: function() {
        return this.grid.map(function(row) {
            return row.join(' ');
        }).join('\n');
    }
};

module.exports = Langton;