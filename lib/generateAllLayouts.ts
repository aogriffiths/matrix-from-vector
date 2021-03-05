import * as matrix from "./index"

export interface Startcorner{
  name: string
  id: number
  enum: matrix.StripStartCorner
  imageFile?: string
}

export interface Direction{
  name: string
  id: number
  enum: matrix.StripDirection
  startcorner?: Startcorner[]
}

export interface Pattern{
  name: string
  id: number
  enum: matrix.StripPattern
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

export function generateAllLayouts(){
  var pattern: Pattern[] = []
  for (const patternName of enumValues(matrix.StripPattern)) {
    var direction: Direction[] = []
    pattern.push({
      name: matrix.StripPattern[patternName] + "",
      id:pattern.length+1,
      enum: patternName,
      direction: direction
    })
    for (const directionName of enumValues(matrix.StripDirection)) {
      var startcorner:Startcorner[] = []
      direction.push({
        name: matrix.StripDirection[directionName] + "",
        id:direction.length+1,
        enum: directionName,
        startcorner: startcorner
      })
      for (const  startcornerName of enumValues(matrix.StripStartCorner)) {
        startcorner.push({
          name: matrix.StripStartCorner[startcornerName] + "",
          id:startcorner.length+1,
          enum: startcornerName,
        })
      }
    }
  }
  return  {pattern}
}
