"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {number} min  Floor for the random number
 * @param {number} max  Ceiling for the random number
 * @return {number}     Random within min and max
 */
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randomFloat = randomFloat;
