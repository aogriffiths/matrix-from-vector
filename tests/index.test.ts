/// <reference path="../pxt_modules/neopixel/neopixel.ts" />

import { expect } from "chai";
import * as matrix from "../lib/index"

describe('calculate', function() {
  it('add', function() {
    let result = 5+2;
    expect(result).equal(7);
  });
});

describe('Matrix', function() {
  it('should have a default constuctor', function() {
    const m = new matrix.Matrix({
    })
    expect(m.fullstrip_length).equal(0)
  })

  it('should constuct without substrip_length', function() {
    const m = new matrix.Matrix({
      fullstrip_length: 12,
      substrip_count: 4
    })
    expect(m.substrip_length).equal(12/4)
  })

  it('should constuct without fullstrip_length', function() {
    const m = new matrix.Matrix({
      substrip_length: 7,
      substrip_count: 4
    })
    expect(m.fullstrip_length).equal(4*7)
  })

  it('should constuct without substrip_count', function() {
    const m = new matrix.Matrix({
      fullstrip_length: 30,
      substrip_length: 6
    })
    expect(m.substrip_count).equal(30/6)
  })

  //3x3 matricies
  interface Test {
    startCorner: matrix.startCorner,
    stripPattern:  matrix.stripPattern,
    stripDirection: matrix.stripDirection,
    matrix: number[][]
  }
  const tests: Test[] =
    [
    {
      startCorner: matrix.startCorner.TopLeft,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [0, 1, 2],
        [5, 4, 3],
        [6, 7, 8],
      ]
    },
    {
      startCorner: matrix.startCorner.TopLeft,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [0, 5, 6],
        [1, 4, 7],
        [2, 3, 8],
      ]
    },
    {
      startCorner: matrix.startCorner.TopLeft,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]
    },
    {
      startCorner: matrix.startCorner.TopLeft,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ]
    },

    {
      startCorner: matrix.startCorner.TopRight,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [2, 1, 0],
        [3, 4, 5],
        [8, 7, 6],
      ]
    },
    {
      startCorner: matrix.startCorner.TopRight,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [6, 5, 0],
        [7, 4, 1],
        [8, 3, 2],
      ]
    },
    {
      startCorner: matrix.startCorner.TopRight,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [2, 1, 0],
        [5, 4, 3],
        [8, 7, 6],
      ]
    },
    {
      startCorner: matrix.startCorner.TopRight,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [6, 3, 0],
        [7, 4, 1],
        [8, 5, 2],
      ]
    },

    {
      startCorner: matrix.startCorner.BottomLeft,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [6, 7, 8],
        [5, 4, 3],
        [0, 1, 2],
      ]
    },
    {
      startCorner: matrix.startCorner.BottomLeft,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [2, 3, 8],
        [1, 4, 7],
        [0, 5, 6],
      ]
    },
    //THE DEFAULT
    {
      startCorner: matrix.startCorner.BottomLeft,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [6, 7, 8],
        [3, 4, 5],
        [0, 1, 2],
      ]
    },
    {
      startCorner: matrix.startCorner.BottomLeft,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [2, 5, 8],
        [1, 4, 7],
        [0, 3, 6],
      ]
    },

    {
      startCorner: matrix.startCorner.BottomRight,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [8, 7, 6],
        [3, 4, 5],
        [2, 1, 0],
      ]
    },
    {
      startCorner: matrix.startCorner.BottomRight,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [8, 3, 2],
        [7, 4, 1],
        [6, 5, 0],
      ]
    },
    {
      startCorner: matrix.startCorner.BottomRight,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [8, 7, 6],
        [5, 4, 3],
        [2, 1, 0],
      ]
    },
    {
      startCorner: matrix.startCorner.BottomRight,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.Y,
      matrix: [
        [8, 5, 2],
        [7, 4, 1],
        [6, 3, 0],
      ]
    },
    {
      startCorner: matrix.startCorner.BottomLeft,
      stripPattern: matrix.stripPattern.zigzag,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [16, 17, 18, 19],
        [15, 14, 13, 12],
        [8, 9, 10, 11],
        [7, 6, 5, 4],
        [0, 1, 2, 3],
      ]
    },{
      startCorner: matrix.startCorner.BottomLeft,
      stripPattern: matrix.stripPattern.loop,
      stripDirection: matrix.stripDirection.X,
      matrix: [
        [0]
      ]
    },
  ]
  tests.forEach(function(test: Test) {
   var height = test.matrix.length
   var width =  test.matrix[0].length
    it(`should create ${width}x${height} with '${matrix.startCorner[test.startCorner]}' start, '${matrix.stripPattern[test.stripPattern]}' pattern, '${matrix.stripDirection[test.stripDirection]}' direction`, function() {
      var m = new matrix.Matrix({
        substrip_count: test.stripDirection === matrix.stripDirection.X ? height : width,
        substrip_length: test.stripDirection === matrix.stripDirection.X ? width : height,
        start_corner: test.startCorner,
        pattern: test.stripPattern,
        direction: test.stripDirection,
      })
      expect(m.fullstrip_length).equal(height * width)
      var actualmatrix: number[][]
      actualmatrix = new Array(height)
      for(var jr = 0; jr <  height; jr++){
        var j = height - jr - 1
        actualmatrix[jr] = new Array(width);
        for(var i = 0; i<width;i++){
          actualmatrix[jr][i]=m.getPixel(i,j)
        }
      }
      //console.log(actualmatrix)
      //console.log(test.matrix)
      expect(actualmatrix).to.eql(test.matrix)
    })
  })

})
