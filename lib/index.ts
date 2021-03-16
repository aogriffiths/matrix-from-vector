// #if false
/// <reference path='../pxt/matrix.ts' />
/// <reference path='../pxt/enums.ts' />
// #endif

// #include "../pxt/enums.ts"
// #include "../pxt/matrix.ts"

/**
 * generateCoordinates
 * Utiltiy function to generate list of all coordinates in a matrix
 * (beta)
 * @internal
 */
export function* generateCoordinates(w: number, h: number) {
  for(var j:number = 0; j<h; j++){
    for(var i:number = 0; i<w; i++){
      yield {x:i, y:j, xReverse:w - i - 1, yReverse: h - j - 1}
    }
  }
}


/**
 * memoizeMatrixIndexGetter
 * Utiltiy function to memoize a getArrayIndex(x,y) function
 * (beta)
 * @internal
 */
const memoizeMatrixIndexGetter = (fn: indexGetterMemberFunction, matrix: matrixScan.Matrix) => {
  let cache : number[] = []
  let width = matrix.width
  return (x: number, y: number) => {
    let cache_i = x + y * width
    if (cache[cache_i] == undefined) {
      cache[cache_i] = fn.call(matrix, x, y)
    }
    return cache[cache_i]
  }
}

/**
 * indexGetterMemberFunction
 * Interfaces for an indexGetter function
 * (beta)
 * @internal
 */
interface indexGetterMemberFunction {
    (x: number, y: number): number
};





//function generateIndexGetterWithCache(m: Matrix): indexGetterMemberFunction {
//  var fnCache: string = generateIndexGetterBase(m)
//  fnCache =
//  //`if(false){
//  `if(this._dataCache[x + (100 * y)] !== undefined){
//    console.log("cache hit", x, y, this._dataCache)
//    return this._dataCache[x + (100 * y)]
//  }else{
//    console.log("cache miss", x, y, this._dataCache)
//    ${fnCache}
//    this._dataCache[x + (100 * y)] = result
//    return result
//  }`
//  return <indexGetterMemberFunction>(new Function('x', 'y', fnCache)).bind(m)
//}

function generateIndexGetter(m: matrixScan.Matrix): indexGetterMemberFunction {
  var fnCache: string = generateIndexGetterBase(m)
  fnCache =
  //`if(false){
  `${fnCache}
   return result
  `
  return <indexGetterMemberFunction>(new Function('x', 'y', fnCache)).bind(m)
}

function generateIndexGetterBase(m: matrixScan.Matrix): string {

    var fnCache = ""

    //Step 1: Correct for start corner
    if ( m.isTopStart() ) {
      fnCache += `
      y = ${m.height} - 1 - y`
    }
    if ( m.isRightStart() ) {
      fnCache += `
      x = ${m.width} - 1 - x`
    }

    //Step 2: Correct for direction
    if(m.isYDirection()){
      fnCache += `
      var res = {full: x, rem: y}`
    }else{
      fnCache += `
      var res = {full: y, rem: x}`
    }

    //Step 3: Correct for zigzag
    if(m.pattern === Matrix.Pattern.zigzag){
      fnCache += `
      if((res.full % 2) != 0){
        res.rem = ${m.subArrayLength} - res.rem - 1
      }`
    }

    fnCache += `
    var result = res.full * ${m.subArrayLength} + res.rem`

    return fnCache
}

export class Matrix extends matrixScan.Matrix {

}

/**
 * Namespace with same name as the Matrix class. Houses enumerations.
 * @public
 */
export namespace Matrix {
   export import Corner = matrixEnums.Corner
   export import Direction = matrixEnums.Direction
   export import Pattern = matrixEnums.Pattern
   export import Constructor = matrixScan.MatrixConstructor
   export import Position = matrixScan.Position
}
