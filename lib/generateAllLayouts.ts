import * as matrix from "./index"

export interface Startcorner{
  name: string
  id: number
  enum: matrix.startCorner
  imageFile?: string
}

export interface Direction{
  name: string
  id: number
  enum: matrix.stripDirection
  startcorner?: Startcorner[]
}

export interface Pattern{
  name: string
  id: number
  enum: matrix.stripPattern
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
  for (const patternName of enumValues(matrix.stripPattern)) {
    var direction: Direction[] = []
    pattern.push({
      name: matrix.stripPattern[patternName] + "",
      id:pattern.length+1,
      enum: patternName,
      direction: direction
    })
    for (const directionName of enumValues(matrix.stripDirection)) {
      var startcorner:Startcorner[] = []
      direction.push({
        name: matrix.stripDirection[directionName] + "",
        id:direction.length+1,
        enum: directionName,
        startcorner: startcorner
      })
      for (const  startcornerName of enumValues(matrix.startCorner)) {
        startcorner.push({
          name: matrix.startCorner[startcornerName] + "",
          id:startcorner.length+1,
          enum: startcornerName,
        })
      }
    }
  }
  return  {pattern}
}
