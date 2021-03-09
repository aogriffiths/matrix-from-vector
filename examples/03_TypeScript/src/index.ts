/**
 * Same syntax as ESM but TypeScript allows strong typed variables, useful for
 * static code validation and autocompletion in editors like atom and VSCode.
 *
 * @heading TypeScript Import
 */
import { Matrix } from 'matrix-scan'
// Trivial example of an explicit type annotation
var m: Matrix
m = new Matrix({height:3, width:3})
// SPLIT

// logging this for unit tests:
console.log(`[[3*3=${m.fullVectorLength}]]`)
// logging this in english
console.log(`Full vector length for a 3x3 matrix is ${m.fullVectorLength} pixels`)
