'use strict';
let direction = require('./direction');

var Ant = function(x, y, cardinal) {
    this.prevX;
    this.prevY;
    this.prevCardinal;
    this.x = x;
    this.y = y;
    this.cardinal = cardinal;
};

Ant.prototype = {
    forward: function() {
        let coord = direction.directionCoord(this.cardinal);
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += coord[0];
        this.y += coord[1];
        return this;
    },
    turnLeft: function() {
        this.prevCardinal = this.cardinal;
        this.cardinal = direction.turnLeft(this.cardinal);
        return this;
    },
    turnRight: function() {
        this.prevCardinal = this.cardinal;
        this.cardinal = direction.turnRight(this.cardinal);
        return this;
    },
    toString: function() {
        return [this.x, this.y].join(' ');
    }
};

module.exports = Ant;