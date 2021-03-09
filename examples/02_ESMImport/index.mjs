/**
 * Using new style ECMAScript module (ESM) import, supported since  Node.js 13.2.0
 *
 * @heading ESM Import
 */
import { Matrix } from 'matrix-scan'
var m = new Matrix({height:3, width:3})
// SPLIT

// logging this for unit tests:
console.log(`[[3*3=${m.fullArrayLength}]]`)
// logging this in english
console.log(`Full array length for a 3x3 matrix is ${m.fullArrayLength} pixels`)
