/**
 *
 * @param {number} min  Floor for the random number
 * @param {number} max  Ceiling for the random number
 * @return {number}     Random within min and max
 */
export function randomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
