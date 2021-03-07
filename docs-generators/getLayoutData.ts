import * as matrix from "../lib/index"

export interface Startcorner{
  name: string
  id: number
  enum: matrix.MatrixCorner
  imageFile?: string
}

export interface Direction{
  name: string
  id: number
  enum: matrix.VectorDirection
  startcorner?: Startcorner[]
}

export interface Pattern{
  name: string
  id: number
  enum: matrix.VectorPattern
  direction?: Direction[]
}

export interface AllLayouts{
  pattern?: Pattern[]
}

function enumValues<T extends string>(enumObj: { [ key: string ]: T }): IterableIterator<T>;
function enumValues<T extends string | number>(enumObj: { [ key: string ]: T }): IterableIterator<Exclude<T, string>>;
function* enumValues<T>(enumObj: { [ key: string ]: T }): IterableIterator<T> {
  let isStringEnum = true;
  for (const property in enumObj) {
    if (typeof enumObj[property] === 'number') {
      isStringEnum = false;
      break;
    }
  }
  for (const property in enumObj) {
    if (isStringEnum || typeof enumObj[property] === 'number') {
      yield enumObj[property];
    }
  }
}

export function getLayoutData(){
  var pattern: Pattern[] = []
  for (const patternName of enumValues(matrix.VectorPattern)) {
    var direction: Direction[] = []
    pattern.push({
      name: matrix.VectorPattern[patternName] + "",
      id:pattern.length+1,
      enum: patternName,
      direction: direction
    })
    for (const directionName of enumValues(matrix.VectorDirection)) {
      var startcorner:Startcorner[] = []
      direction.push({
        name: matrix.VectorDirection[directionName] + "",
        id:direction.length+1,
        enum: directionName,
        startcorner: startcorner
      })
      for (const  startcornerName of enumValues(matrix.MatrixCorner)) {
        startcorner.push({
          name: matrix.MatrixCorner[startcornerName] + "",
          id:startcorner.length+1,
          enum: startcornerName,
        })
      }
    }
  }
  return  {pattern}
}
