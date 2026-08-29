/**
 * Create a brand new canvas.
 * @returns {HTMLCanvasElement} new canvas
 */
const createCanvas = function () {
    return document.createElement('canvas');
}

/**
 * Get the 2d context of a canvas.
 * @param {HTMLCanvasElement} canvas
 * @returns {CanvasRenderingContext2D} 2d context
 */
const get2dContext = function (canvas) {
    return canvas.getContext('2d', {
        alpha: true,
        willReadFrequently: true
    });
}

/**
 * Disposes a canvas.
 * @param {HTMLCanvasElement} canvas
 */
const disposeCanvas = function (canvas) {
    canvas.width = 0;
    canvas.height = 0;
    canvas.remove();
};

module.exports = {
    createCanvas,
    get2dContext,
    disposeCanvas,
};
