import { Matrix } from 'matrix-scan'
/**
 * Using new style ECMAScript module (ESM) import, Supported since  Node.js 13.2.0
 *
 * @heading ESM Import
 */
var m = new Matrix({height:3, width:3})
m.
// SPLIT

// logging this for unit tests:
console.log(`[[3*3=${m.fullVectorLength}]]`)
// logging this in english
console.log(`Full vector length for a 3x3 matrix is ${m.fullVectorLength} pixels`)
