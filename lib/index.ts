
/**
 * generateCoordinates
 * Utiltiy function to generate list of all coordinates in a matrix
 * (beta)
 * @internal
 */
function* generateCoordinates(w: number, h: number) {
  for(var j:number = 0; j<h; j++){
    for(var i:number = 0; i<w; i++){
      yield {x:i, y:j}
    }
  }
}

//   y
//   ^
//   |
//   TL. .TR
//   . . . .
//   . . . .
//   BL. .BR  -> x

/**
 * A matrix based on a vector
 * (beta)
 * @public
 */
export class Matrix {

    /**
     * Height of the matrix
     */
    height: number
    /**
     * Width of the matrix
     */
    width: number
    /**
     * The corner of the matrix where the vector starts
     */
    startCorner: Matrix.Corner
    /**
     * The initial direction the vector travels from the start corner across
     * the matrix
     */
    direction: Matrix.Direction
    /**
     * The repeating partern the vector follows to create the matrix
     */
    pattern: Matrix.Pattern

    /**
     * Creates a new Matrix
     * (beta)
     * @public
     * @param options - constructor options
     * @example
     * A 3x4 example using the defaults. See the layout <a href="../layouts/layouts.md">here</a> with:
     * <ul>
     * <li> start_corner `BottomLeft`</li>
     * <li> direction: `X`</li>
     * <li> pattern: `zigzag`</li>
     * </ul>
     * ```
     * const matrix = new Matrix({
     *   height: 3,
     *   width: 4
     * })
     * ```
     * @example
     * An example with all options provided.
     * See the layout See the layout <a href="../layouts/layouts.md">here</a> with:
     * <ul>
     * <li> start_corner `TopRight`</li>
     * <li> direction: `Y`</li>
     * <li> pattern: `loop`</li>
     * </ul>
     * ```
     * const matrix = new Matrix({
     *   height: 10,
     *   width: 15,
     *   pattern: Matrix.Pattern.loop,
     *   start_corner: VectorStartCorner.TopRight,
     *   direction: Matrix.Direction.Y,
     * })
     * ```
     */
    constructor(options: Matrix.Constuctor) {
      this.width = options.width || 0
      this.height = options.height || 0
      this.startCorner = options.startCorner || Matrix.Corner.BottomLeft
      this.direction = options.direction || Matrix.Direction.X
      this.pattern = options.pattern || Matrix.Pattern.zigzag
    }

    /**
     * The full vector length for this matrix. Can not be set directly.
     * calculated based on the width and height of the matrix.
     * (beta)
     * @public
     */
    get fullArrayLength(): number {
      return this.width * this.height
    }

    /**
     * The sub vector length for this matrix. The full vector needs to be divided
     * in to smaller "sub" vectors which are laied out to cover the matrix. Each
     * subvector will have the same length which will be wither the width or height
     * of the matrix, depending on the vector direction.
     * (beta)
     * @public
     */
    get subArrayLength(): number {
      return this.direction == Matrix.Direction.X
        ? this.width
        : this.height
    }
    // NOTE: For API Extractor don't write documentation for the setter.
    set subArrayLength(newV: number) {
      this.direction == Matrix.Direction.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    /**
     * Gets or sets the sub vector count for this matrix. This will either be
     * the width or height of the matrix, depending on the vector direction.
     * (beta)
     * @public
     */
    get subArrayCount(): number {
      return this.direction == Matrix.Direction.X
        ? this.height
        : this.width
    }
    // NOTE: For API Extractor don't write documentation for the setter.
    set subArrayCount(newV: number) {
      this.direction == Matrix.Direction.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    /**
     * Returns whether this matrix has a <b>top down</b> patterm
     * (beta)
     * @public
     * @returns true or false
     */
    isTopDown():   boolean {return this.isTopStart() && this.direction == Matrix.Direction.X}
    /**
     * Returns whether this matrix has a <b>bottom up</b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isBottomUp():   boolean {return this.isBottomStart() && this.direction == Matrix.Direction.X}
    /**
     * Returns whether this matrix has a <b>left to right </b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isLeftRight(): boolean {return this.isLeftStart() && this.direction == Matrix.Direction.Y}
    /**
     * Returns whether this matrix has a <b>right to left</b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isRightLeft(): boolean {return this.isRightStart() && this.direction == Matrix.Direction.Y}
    /**
     * Returns whether this matrix has a pattern starting at the <b>top</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isTopStart():  boolean {return this.startCorner == Matrix.Corner.TopLeft || this.startCorner == Matrix.Corner.TopRight}
    /**
     * Returns whether this matrix has a pattern starting at the <b>bottom</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isBottomStart():  boolean {return this.startCorner == Matrix.Corner.BottomLeft || this.startCorner == Matrix.Corner.BottomRight}
    /**
     * Returns whether this matrix has a pattern starting on the <b>left</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isLeftStart():  boolean {return this.startCorner == Matrix.Corner.TopLeft || this.startCorner == Matrix.Corner.BottomLeft}
    /**
     * Returns whether this matrix has a pattern starting on the <b>right</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isRightStart():  boolean {return this.startCorner == Matrix.Corner.TopRight || this.startCorner == Matrix.Corner.BottomRight}

    /**
     * Return this 1D vector position of a value given it's 2D matrix coordinates
     * (beta)
     * @public
     * @param x - the x coordinate in the matrix
     * @param y - the y coordinate in the matrix
     * @returns - the corresponding possition in the vector ("`n`")
     */
    getVectorIndex(x: number, y: number): number{
      //Correct for start corner (using negative coordinates for now)
      if ( this.startCorner == Matrix.Corner.TopLeft ||
           this.startCorner == Matrix.Corner.TopRight ) {
        y *= -1
        y += -1
      }
      if ( this.startCorner == Matrix.Corner.BottomRight ||
           this.startCorner == Matrix.Corner.TopRight ) {
        x *= -1
        x += -1
      }


      var res = {
         full: -1,
         rem: -1
      }

      //Correct for direction
      if(this.direction === Matrix.Direction.Y){
        res = {
          full: x,
          rem: y
        }
      }else{
        res = {
          full: y,
          rem: x
        }
      }

      //Replace negative coordinates with absolute
      if(res.full < 0){
        res.full = this.subArrayCount + res.full
      }
      if(res.rem < 0){
        res.rem = this.subArrayLength + res.rem
      }

      //Correct for zigzag
      if(this.pattern === Matrix.Pattern.zigzag){
        if((res.full % 2) != 0){
          res.rem = this.subArrayLength - res.rem - 1
        }
      }

      return res.full * this.subArrayLength + res.rem
    }


    /**
     * Return all value positions with the `x,y` coordinates in the matrix and thier `n` possition in the vector
     * @public
     * @returns - array of Position items
     */
    getAllPositions() : Matrix.Position[]{
      var res:Matrix.Position[]=[]
      for(let c of generateCoordinates(this.width, this.height)){
        let n = this.getVectorIndex(c.x, c.y)
        res[n]={n, ...c}
      }
      return res
    }
}

/**
 * A matrix based on a vector
 * (beta)
 * @public
 */
export namespace Matrix {

  /**
   * The four corners of the matrix. The vector must start in one of these corners.
   * @public
   */
  export enum Corner{
    /**
     * Bottom left (x=0, y=0) (default vector start corner)
     * @public
     */
    BottomLeft,

    /**
     * Bottom right (x=max, y=0)
     * @public
     */
    BottomRight,

    /**
     * Top left (x=0, y=max)
     * @public
     */
    TopLeft,

    /**
     * Top right (x=max, y=max)
     * @public
     */
    TopRight
  }

  /**
   * The directions the vector can travel across the matrix
   * (beta)
   * @public
   */
  export enum Direction{
    /**
     * In the X axis (left / right)
     */
    X,
    /**
     * In the Y axis (up / down)
     */
    Y,
  }

  /**
   * The possible patterns the vector can follow to cover the matrix
   * @public
   */
  export enum Pattern{
    /**
     * The direction of the vector will alternate (forwards and reverse with respect the initial vector direction)
     */
    zigzag,
    /**
     * The direction of the vector will remain the same (always the same as the initial vector direction)
     */
    loop,
  }

  /**
   * Parameters for creating a Matrix.
   * Used by {@link (Matrix:class) | the Matrix constructor}.
   * (beta)
   * @public
   */
  export interface Constuctor {
    /**
     * Height of the matrix. Default `0`.
     */
    height?: number
    /**
     * Width of the matrix. Default `0`.
     */
    width?: number
    /**
     * The corner of the matrix where the vector starts. Default `VectorStartCorner.BottomLeft`
     */
    startCorner?: Corner
    /**
     * The initial direction the vector travels from the start corner across
     * the matrix . Default `Matrix.Direction.X`
     */
    direction?: Direction
    /**
     * Matrix pattern. Default `Matrix.Pattern.zigzag`
     */
    pattern?: Pattern
  }

  /**
   * The positions of a value, with it's `x,y` coordinate in the matrix and it's `n` possition in the vector
   * @public
   */
  export interface Position{
    /**
     * Position in the vector
     */
    n:number
    /**
     * x coordinate in the matrix
     */
    x:number
    /**
     * y coordinate in the matrix
     */
    y:number
  }
}
