import { Matrix } from 'matrix-scan'

// SPLIT
/**
 * Here are the basic properties and their possible values
 * @heading Basic properties
 */

// In the constuctor (all optional)
var m = new Matrix({
  height:3,
  width:3,
  startCorner: Matrix.Corner.BottomLeft,
  direction: Matrix.Direction.X,
  pattern: Matrix.Pattern.zigzag
})

// where startCorner can be:
Matrix.Corner.BottomLeft
Matrix.Corner.BottomRight
Matrix.Corner.TopLeft
Matrix.Corner.TopRight

// and direction can be:
Matrix.Direction.Y
Matrix.Direction.Y

// and pattern can be:
Matrix.Pattern.loop
Matrix.Pattern.zigzag

// alos, they can be get or set after constuction:
m.height = 4
m.width = 5
m.startCorner =  Matrix.Corner.TopLeft
m.direction =  Matrix.Direction.Y
m.pattern =  Matrix.Pattern.loop
// SPLIT
/**
 * These properties can also be get and/or set on a Matrix object, but they are
 * calculated (on get) or have side effects (on set).
 * @heading Caculated properties
 */

// Read only. Will alows be m.height * m.width
m.fullArrayLength

// Read write. This is the length of each continuous run of values across the
// matrix. It will either be m.height or m.width debding on m.direction
m.subArrayLength

// Read write. This is the number of sub arrays needed to cover the
// matrix. It will either be m.height or m.width debding on m.direction
m.subArrayCount
// SPLIT

/**
 * These give simple true/false information about the direction of the
 * matrix. They can be understood by where the first and last element of the matrix.
 * is.
 * @heading Booleam tests
 */

//First element of the matrix is..
m.isTopStart()    // ..on the top row (last could be left, right or bottom)
m.isBottomStart() // ..on the bottom row (last could be left, right or top)
m.isLeftStart()   // ..on the left row (last could be right, top or bottom)
m.isRightStart()  // ..on the right row (last could be left, top or bottom)

m.isTopDown()     // ..on the top row, last is on the bottom
m.isBottomUp()    // ..on the bottom row, last is on the top
m.isLeftRight()   // ..on the left column, last is on the right
m.isRightLeft()   // ..on the right column, last is on the left
// SPLIT

/**
 * Getting array indexes for given matrix coordinates
 * @heading Scanning from matrix to array
 */
// get induvidual possitions. Returns an index, aka "n"
m.getArrayIndex(0,0) // x,y = 0,0. Bottom left corner
m.getArrayIndex(1,1) // x,y = 1,1. Center of a 3x3 matrix
m.getArrayIndex(0,2) // x,y = 0,2. Top left corner of a 3x3 matrix

// get all possitions. Returns an array of {x,y,n} positions.
m.getAllPositions()
// SPLIT


// logging this for unit tests:
console.log(`[[3*3=${m.fullArrayLength}]]`)
// logging this in english
console.log(`Full array length for a 3x3 matrix is ${m.fullArrayLength} pixels`)
