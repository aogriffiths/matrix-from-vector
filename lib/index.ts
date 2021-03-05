
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

/**
 * The four corners of the matrix. The vector must start in one of these corners.
 * (beta)
 * @public
 */
export enum MatrixCorner{
  //% block="Top Left"
  TopLeft=1,
  //% block="Top Right"
  TopRight=2,
  //% block="Bottom Left"
  BottomLeft=3,
  //% block="Bottom Right"
  BottomRight=4,
}

/**
 * The directions the vector can travel across the matrix
 * (beta)
 * @public
 */
export enum VectorDirection{
  /**
   * In the X axis (left / right)
   */
  X=1,
  /**
   * In the Y axis (up / down)
   */
  Y=2,
}

/**
 * The possible vector patterns
 * (beta)
 * @public
 */
export enum VectorPattern{
  /**
   * The direction of the vector will alternate (forwards and reverse with respect the initial vector direction)
   */
  zigzag=1,
  /**
   * The direction of the vector will remain the same (always the same as the initial vector direction)
   */
  loop=2,
}

/**
 * Parameters for creating a Matrix.
 * Used by {@link Matrix | the Matrix constructor}.
 * (beta)
 * @public
 */
export interface MatrixConstuctor {
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
  startCorner?: MatrixCorner
  /**
   * The initial direction the vector travels from the start corner across
   * the matrix . Default `VectorDirection.X`
   */
  direction?: VectorDirection
  /**
   * Matrix pattern. Default `VectorPattern.zigzag`
   */
  pattern?: VectorPattern
}

/**
 * PixelPositions
 * An array of pixel numbers and their coordinates
 * (beta)
 * @public
 */
export interface PixelPosition{
  n:number //pixel number
  x:number //x coordinate
  y:number //y coordinate
}

//
//   y
//   TL. .TR
//   . . . .
//   . . . .
//   BL. .BR x

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
    start_corner: MatrixCorner
    /**
     * The initial direction the vector travels from the start corner across
     * the matrix
     */
    direction: VectorDirection
    /**
     * The repeating partern the vector follows to create the matrix
     */
    pattern: VectorPattern

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
     *   pattern: VectorPattern.loop,
     *   start_corner: VectorStartCorner.TopRight,
     *   direction: VectorDirection.Y,
     * })
     * ```
     */
    constructor(options: MatrixConstuctor) {
      this.width = options.width || 0
      this.height = options.height || 0
      this.start_corner = options.startCorner || MatrixCorner.BottomLeft
      this.direction = options.direction || VectorDirection.X
      this.pattern = options.pattern || VectorPattern.zigzag
    }

    /**
     * The full strip length for this matrix. Can not be set directly.
     * calculated based on the width and height of the matrix.
     * (beta)
     * @public
     */
    get fullstrip_length(): number {
      return this.width * this.height
    }

    /**
     * The sub strip length for this matrix. This will either be
     * the width or height of the matrix, depending on the strip direction.
     * (beta)
     * @public
     */
    get substrip_length(): number {
      return this.direction == VectorDirection.X
        ? this.width
        : this.height
    }
    // NOTE: For API Extractor don't write documentation for the setter.
    set substrip_length(newV: number) {
      this.direction == VectorDirection.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    /**
     * Gets or sets the sub strip count for this matrix. This will either be
     * the width or height of the matrix, depending on the strip direction.
     * (beta)
     * @public
     */
    get substrip_count(): number {
      return this.direction == VectorDirection.X
        ? this.height
        : this.width
    }
    // NOTE: For API Extractor don't write documentation for the setter.
    set substrip_count(newV: number) {
      this.direction == VectorDirection.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    /**
     * Returns whether this matrix has a <b>top down</b> patterm
     * (beta)
     * @public
     * @returns true or false
     */
    isTopDown():   boolean {return this.isTopStart() && this.direction == VectorDirection.X}
    /**
     * Returns whether this matrix has a <b>bottom up</b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isBotomUp():   boolean {return this.isBtmStart() && this.direction == VectorDirection.X}
    /**
     * Returns whether this matrix has a <b>left to right </b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isLeftRight(): boolean {return this.isLefStart() && this.direction == VectorDirection.Y}
    /**
     * Returns whether this matrix has a <b>right to left</b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isRightLeft(): boolean {return this.isRitStart() && this.direction == VectorDirection.Y}
    /**
     * Returns whether this matrix has a pattern starting at the <b>top</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isTopStart():  boolean {return this.start_corner == MatrixCorner.TopLeft || this.start_corner == MatrixCorner.TopRight}
    /**
     * Returns whether this matrix has a pattern starting at the <b>bottom</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isBtmStart():  boolean {return this.start_corner == MatrixCorner.BottomLeft || this.start_corner == MatrixCorner.BottomRight}
    /**
     * Returns whether this matrix has a pattern starting on the <b>left</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isLefStart():  boolean {return this.start_corner == MatrixCorner.TopLeft || this.start_corner == MatrixCorner.BottomLeft}
    /**
     * Returns whether this matrix has a pattern starting on the <b>right</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isRitStart():  boolean {return this.start_corner == MatrixCorner.TopRight || this.start_corner == MatrixCorner.BottomRight}

    /**
     * Return this 1D vector index of a pixel based on its 2D matrix coordinates
     * (beta)
     * @public
     * @param x - the x coordinate of the pixel
     * @param y - the y coordinate of the pixel
     * @returns - the pixel number on the strip that makes up this matrix
     */
    getPixel(x: number, y: number): number{
      //Correct for start corner (using negative coordinates for now)
      if ( this.start_corner == MatrixCorner.TopLeft ||
           this.start_corner == MatrixCorner.TopRight ) {
        y *= -1
        y += -1
      }
      if ( this.start_corner == MatrixCorner.BottomRight ||
           this.start_corner == MatrixCorner.TopRight ) {
        x *= -1
        x += -1
      }


      var res = {
         full: -1,
         rem: -1
      }

      //Correct for direction
      if(this.direction === VectorDirection.Y){
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
        res.full = this.substrip_count + res.full
      }
      if(res.rem < 0){
        res.rem = this.substrip_length + res.rem
      }

      //Correct for zigzag
      if(this.pattern === VectorPattern.zigzag){
        if((res.full % 2) != 0){
          res.rem = this.substrip_length - res.rem - 1
        }
      }

      return res.full * this.substrip_length + res.rem
    }


    /**
     * Return all pixel positions for the matrix
     * (beta)
     * @public
     * @returns - array of PixelPosition items
     */
    pixelPositions() : PixelPosition[]{
      var res:PixelPosition[]=[]
      for(let c of generateCoordinates(this.width, this.height)){
        let n = this.getPixel(c.x, c.y)
        res[n]={n, ...c}
      }
      return res
    }

}
