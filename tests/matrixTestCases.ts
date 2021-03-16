import { Matrix } from ".."

//3x3 matricies
export interface Test {
  startCorner: Matrix.Corner,
  stripPattern:  Matrix.Pattern,
  stripDirection: Matrix.Direction,
  matrix: number[][]
}

export const testCases: Test[] =[
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
