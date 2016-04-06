'use strict';
let direction = () => {
    let keys = { north: 'north', west: 'west', south: 'south', east: 'east' };
    let leftTurn = { north: 'west', west: 'south', south: 'east', east: 'north' };
    let rightTurn = { north: 'east', west: 'north', south: 'west', east: 'south' };
    let coord = { north: [0, 1], west: [-1, 0], south: [0, -1], east: [1, 0] };

    let turnLeft = (key) => {
        return leftTurn[key];
    };

    let turnRight = (key) => {
        return rightTurn[key];
    };

    let directionCoord = (key) => {
        return coord[key];
    };

    return {
        keys: keys,
        turnLeft: turnLeft,
        turnRight: turnRight,
        directionCoord: directionCoord
    };
};


module.exports = direction();