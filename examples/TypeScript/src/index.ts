import { Matrix } from 'matrix-scan'

var m = new Matrix({height:3, width:3})

console.log(`[[3*3=${m.fullVectorLength}]]`)

console.log(`Full vector length for a 3x3 matrix is ${m.fullVectorLength} pixels`)
