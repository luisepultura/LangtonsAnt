'use strict';

var direction = function direction() {
    var directionKeys = { north: 'north', west: 'west', south: 'south', east: 'east' };
    var leftTurn = { north: 'west', west: 'south', south: 'east', east: 'north' };
    var rightTurn = { north: 'east', west: 'north', south: 'west', east: 'south' };
    var coord = { north: [0, 1], west: [-1, 0], south: [0, -1], east: [1, 0] };

    var turnLeft = function turnLeft(key) {
        return leftTurn[key];
    };

    var turnRight = function turnRight(key) {
        return rightTurn[key];
    };

    var directionCoord = function directionCoord(key) {
        return coord[key];
    };

    return {
        directionKeys: directionKeys,
        turnLeft: turnLeft,
        turnRight: turnRight,
        directionCoord: directionCoord
    };
};

module.exports = direction();