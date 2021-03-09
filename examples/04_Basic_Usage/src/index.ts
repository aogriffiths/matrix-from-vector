import { Matrix } from 'matrix-scan'

/**
 * Same syntax as ESM but TypeScript allows strong typed variables, useful for
 * static code validation and autocompletion in editors like atom and VSCode.
 *
 * @heading Basic Usage
 */
var  m = new Matrix({
  height:3,
  width:3,
  direction: Matrix.Direction.X
})

m.getVectorIndex

// SPLIT

// logging this for unit tests:
console.log(`[[3*3=${m.fullVectorLength}]]`)
// logging this in english
console.log(`Full vector length for a 3x3 matrix is ${m.fullVectorLength} pixels`)
