/**
 * Using old style CommonJS (CJS) `require()`
 *
 * @heading CommonJS
 */
var ms = require('matrix-scan')
var Matrix = ms.Matrix
var m = new Matrix({height:3, width:3})
// SPLIT

// logging this for unit tests:
console.log(`[[3*3=${m.fullArrayLength}]]`)
// logging this in english
console.log(`Full array length for a 3x3 matrix is ${m.fullArrayLength} pixels`)
