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