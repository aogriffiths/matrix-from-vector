
import { expect } from "chai";
import { Matrix } from "../lib/index"

describe('Matrix', function() {
  it('should have a default constuctor', function() {
    const m = new Matrix({
    })
    expect(m.fullVectorLength).equal(0)
  })

  it('should constuct with width and height', function() {
    const m = new Matrix({
      width: 4,
      height: 6
    })
    expect(m.fullVectorLength).equal(4*6)
    expect(m.subVectorCount * m.subVectorLength).equal(4*6)
  })

  //3x3 matricies
  interface Test {
    startCorner: Matrix.Corner,
    stripPattern:  Matrix.Pattern,
    stripDirection: Matrix.Direction,
    matrix: number[][]
  }
  const tests: Test[] =
    [
    {
      startCorner: Matrix.Corner.TopLeft,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [0, 1, 2],
        [5, 4, 3],
        [6, 7, 8],
      ]
    },
    {
      startCorner: Matrix.Corner.TopLeft,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [0, 5, 6],
        [1, 4, 7],
        [2, 3, 8],
      ]
    },
    {
      startCorner: Matrix.Corner.TopLeft,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]
    },
    {
      startCorner: Matrix.Corner.TopLeft,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ]
    },

    {
      startCorner: Matrix.Corner.TopRight,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [2, 1, 0],
        [3, 4, 5],
        [8, 7, 6],
      ]
    },
    {
      startCorner: Matrix.Corner.TopRight,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [6, 5, 0],
        [7, 4, 1],
        [8, 3, 2],
      ]
    },
    {
      startCorner: Matrix.Corner.TopRight,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [2, 1, 0],
        [5, 4, 3],
        [8, 7, 6],
      ]
    },
    {
      startCorner: Matrix.Corner.TopRight,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [6, 3, 0],
        [7, 4, 1],
        [8, 5, 2],
      ]
    },

    {
      startCorner: Matrix.Corner.BottomLeft,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [6, 7, 8],
        [5, 4, 3],
        [0, 1, 2],
      ]
    },
    {
      startCorner: Matrix.Corner.BottomLeft,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [2, 3, 8],
        [1, 4, 7],
        [0, 5, 6],
      ]
    },
    //THE DEFAULT
    {
      startCorner: Matrix.Corner.BottomLeft,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [6, 7, 8],
        [3, 4, 5],
        [0, 1, 2],
      ]
    },
    {
      startCorner: Matrix.Corner.BottomLeft,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [2, 5, 8],
        [1, 4, 7],
        [0, 3, 6],
      ]
    },

    {
      startCorner: Matrix.Corner.BottomRight,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [8, 7, 6],
        [3, 4, 5],
        [2, 1, 0],
      ]
    },
    {
      startCorner: Matrix.Corner.BottomRight,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [8, 3, 2],
        [7, 4, 1],
        [6, 5, 0],
      ]
    },
    {
      startCorner: Matrix.Corner.BottomRight,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [8, 7, 6],
        [5, 4, 3],
        [2, 1, 0],
      ]
    },
    {
      startCorner: Matrix.Corner.BottomRight,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.Y,
      matrix: [
        [8, 5, 2],
        [7, 4, 1],
        [6, 3, 0],
      ]
    },
    {
      startCorner: Matrix.Corner.BottomLeft,
      stripPattern: Matrix.Pattern.zigzag,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [16, 17, 18, 19],
        [15, 14, 13, 12],
        [8, 9, 10, 11],
        [7, 6, 5, 4],
        [0, 1, 2, 3],
      ]
    },{
      startCorner: Matrix.Corner.BottomLeft,
      stripPattern: Matrix.Pattern.loop,
      stripDirection: Matrix.Direction.X,
      matrix: [
        [0]
      ]
    },
  ]
  tests.forEach(function(test: Test) {
   var height = test.matrix.length
   var width =  test.matrix[0].length
    it(`should create ${width}x${height} with '${Matrix.Corner[test.startCorner]}' start, '${Matrix.Pattern[test.stripPattern]}' pattern, '${Matrix.Direction[test.stripDirection]}' direction`, function() {
      var m = new Matrix({
        width,
        height,
        startCorner: test.startCorner,
        pattern: test.stripPattern,
        direction: test.stripDirection,
      })
      expect(m.fullVectorLength).equal(height * width)
      var actualmatrix: number[][]
      actualmatrix = new Array(height)
      for(var jr = 0; jr <  height; jr++){
        var j = height - jr - 1
        actualmatrix[jr] = new Array(width);
        for(var i = 0; i<width;i++){
          actualmatrix[jr][i]=m.getVectorIndex(i,j)
        }
      }
      //console.log(actualmatrix)
      //console.log(test.matrix)
      expect(actualmatrix).to.eql(test.matrix)
    })
  })

})
