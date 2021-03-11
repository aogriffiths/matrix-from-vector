
import { expect } from "chai";
import { Matrix, generateCoordinates } from "../lib/index"
import  {Test, testCases} from "./matrixTestCases"

describe('Matrix', function() {
  describe('#new', function() {
    it('should have a default constuctor', function() {
      const m = new Matrix({
      })
      expect(m.fullArrayLength).equal(0)
    })

    it('should constuct with width and height', function() {
      const m = new Matrix({
        width: 4,
        height: 6
      })
      expect(m.fullArrayLength).equal(4*6)
      expect(m.subArrayCount * m.subArrayLength).equal(4*6)
    })
  })


  testCases.forEach(function(test){
    var height = test.matrix.length
    var width =  test.matrix[0].length
    describe(`${width}x${height}; ${Matrix.Corner[test.startCorner]}; ${Matrix.Pattern[test.stripPattern]}; ${Matrix.Direction[test.stripDirection]}`, function() {
      var matricies : {m:Matrix, name:string}[]= []
      matricies.push({
        name: "no chaching",
        m: new Matrix({
          width,
          height,
          startCorner: test.startCorner,
          pattern: test.stripPattern,
          direction: test.stripDirection,
          cacheAlgorithm: false,
          cacheData: false
        })
      })

      matricies.push({
       name: "caching the algorithm",
       m: new Matrix({
         width,
         height,
         startCorner: test.startCorner,
         pattern: test.stripPattern,
         direction: test.stripDirection,
         cacheAlgorithm: true,
         cacheData: false
       })
      })

      matricies.push({
       name: "caching the data",
       m: new Matrix({
         width,
         height,
         startCorner: test.startCorner,
         pattern: test.stripPattern,
         direction: test.stripDirection,
         cacheAlgorithm: true,
         cacheData: true
       })
      })

      describe('#getArrayIndex', function() {
        matricies.forEach(function (matrix){
          it(`should be correct with ${matrix.name}`, function() {
            expect(matrix.m.fullArrayLength).equal(height * width)
            var matrix_produced: number[][] = Array.from(Array(height), () => new Array(width))
            for(let coord of generateCoordinates(width, height)){
              matrix_produced[coord.yReverse][coord.x]=matrix.m.getArrayIndex(coord.x, coord.y)
            }
            expect(matrix_produced).to.eql(test.matrix)
          })
        })
      })

      describe('#setValue', function() {
        let matrix = new Matrix({
          width,
          height,
          startCorner: test.startCorner,
          pattern: test.stripPattern,
          direction: test.stripDirection
        })
        let array: string[] = []
        matrix.useArray(array)

        it(`should set the correct value in an array`, function() {
          for(let coord of generateCoordinates(width, height)){
            let index = test.matrix[coord.yReverse][coord.x]
            let value = `${coord.x}_${coord.y}_${index}`
            expect(array[index]).to.be.undefined
            matrix.setValue(coord.x, coord.y, value)
            expect(array[index]).to.equal(value)
          }
        })
      })

    })
  })
})
