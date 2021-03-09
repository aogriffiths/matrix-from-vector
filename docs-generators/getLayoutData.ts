import { Matrix } from "../lib/index"

export interface Startcorner{
  name: string
  id: number
  enum: Matrix.Corner
  imageFile?: string
}

export interface Direction{
  name: string
  id: number
  enum: Matrix.Direction
  startcorner?: Startcorner[]
}

export interface Pattern{
  name: string
  id: number
  enum: Matrix.Pattern
  direction?: Direction[]
}

export interface LayoutData{
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

export function getLayoutData(): LayoutData{
  var pattern: Pattern[] = []
  for (const patternName of enumValues(Matrix.Pattern)) {
    var direction: Direction[] = []
    pattern.push({
      name: Matrix.Pattern[patternName] + "",
      id:pattern.length+1,
      enum: patternName,
      direction: direction
    })
    for (const directionName of enumValues(Matrix.Direction)) {
      var startcorner:Startcorner[] = []
      direction.push({
        name: Matrix.Direction[directionName] + "",
        id:direction.length+1,
        enum: directionName,
        startcorner: startcorner
      })
      for (const  startcornerName of enumValues(Matrix.Corner)) {
        startcorner.push({
          name: Matrix.Corner[startcornerName] + "",
          id:startcorner.length+1,
          enum: startcornerName,
        })
      }
    }
  }
  return  {pattern}
}
