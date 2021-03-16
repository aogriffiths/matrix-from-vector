
/// <reference path='./enums.ts' />

// Only using features supported by Static TypeScript
// see https://makecode.com/language
// and https://www.microsoft.com/en-us/research/publication/static-typescript/

/**
 * matrix scanning
 */
//% weight=5 color=#2699BF icon="\uf110"

namespace matrixScan {

  /**
   * Parameters for creating a MatrixEnum
   * Used by {@link (Matrix:class) | the Matrix constructor}.
   * (beta)
   * @public
   */
  export interface MatrixConstructor {
    /**
     * Height of the matrix. Default `0`.
     */
    height?: number
    /**
     * Width of the matrix. Default `0`.
     */
    width?: number
    /**
     * The corner of the matrix where the array starts. Default `VectorStartCorner.BottomLeft`
     */
    startCorner?: matrixEnums.Corner
    /**
     * The initial direction the array travels from the start corner across
     * the matrix . Default `Matrix.Direction.X`
     */
    direction?: matrixEnums.Direction
    /**
     * Matrix pattern. Default `Matrix.Pattern.zigzag`
     */
    pattern?: matrixEnums.Pattern

    /**
     * Whther to cahce the getArrayIndex algoritum or not (can give an 8x performance increase). Default True
     */
    cacheAlgorithm?: boolean

    /**
     * Whther to cahce the getArrayIndex data (the results) or not. Default False
     */
    cacheData?: boolean
  }
  /**
   * generateCoordinates
   * Utiltiy function to generate list of all coordinates in a matrix
   * (beta)
   * @internal
   */
  export function generateCoordinates(w: number, h: number) : MatrixCoordinate[] {
    let m : MatrixCoordinate[] = new Array()
    for(var j:number = 0; j<h; j++){
      for(var i:number = 0; i<w; i++){
        m.push({x:i, y:j, xFromRHS:w - i - 1, yFromTop: h - j - 1})
      }
    }
    return m
  }
  /**
   * The positions of a value, with it's `x,y` coordinate in the matrix and it's `n` possition in the array
   * @public
   */
  export interface MatrixCoordinate{
    /**
     * x coordinate in the matrix
     */
    x: number
    /**
     * y coordinate in the matrix
     */
    y: number
    /**
     * the x distance from the Right Hand Side (RHS) of the matrix to this
     * coordinate.
     * Always negative, maximum -1 on RHS of the matrix.
     */
    xFromRHS: number
    /**
     * the y distance from the top of the matrix to this coordinate.
     * Always negative, maximum -1 at top of the matrix.
     */
    yFromTop: number
  }


  /**
   * The positions of a value, with it's `x,y` coordinate in the matrix and it's `n` possition in the array
   * @public
   */
  export interface Position{
    /**
     * Position in the array
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

  /**
   * indexGetterMemberFunction
   * Interfaces for an indexGetter function
   * (beta)
   * @internal
   */
  interface ArrayLike<T>{
     setValue(index: number, value: T) : void
     getValue(index: number) : T
  };

  //   y
  //   ^
  //   |
  //   TL. .TR
  //   . . . .
  //   . . . .
  //   BL. .BR  -> x

  /**
   * A matrix based on a array
   * (beta)
   * @public
   */
  export class Matrix {
    /**
     * Internal state for: Height of the matrix
     */
    _height: number = 0
    /**
     * Internal state for: Width of the matrix
     */
    _width: number = 0
    /**
     * Internal state for: The corner of the matrix where the array starts
     */
    _startCorner: matrixEnums.Corner = matrixEnums.Corner.BottomLeft
    /**
     * Internal state for: The initial direction the array travels from the start corner across the matrix
     */
    _direction: matrixEnums.Direction = matrixEnums.Direction.X
    /**
     * Internal state for: The repeating partern the array follows to create the matrix
     */
    _pattern: matrixEnums.Pattern = matrixEnums.Pattern.zigzag

    /**
     * cacheAlgorithm
     */
    _cacheAlgorithm: boolean = true

    /**
     * cacheAlgorithm
     */
    _cacheData: boolean = false

    /**
     * Height of the matrix
     */
    get height(): number{
      return this._height
    }
    set height(v: number){
      this._height = v
    }

    /**
     * Width of the matrix
     */
    get width(): number{
      return this._width
    }
    set width(v: number){
      this._width = v
    }

    /**
     * The corner of the matrix where the array starts
     */
    get startCorner(): matrixEnums.Corner{
      return this._startCorner
    }
    set startCorner(v: matrixEnums.Corner){
      this._startCorner = v
    }

    /**
     * The initial direction the array travels from the start corner across the matrix
     */
    get direction(): matrixEnums.Direction{
      return this._direction
    }
    set direction(v: matrixEnums.Direction){
      this._direction = v
    }

    /**
     * The repeating partern the array follows to create the matrix
     */
    get pattern(): matrixEnums.Pattern{
      return this._pattern
    }
    set pattern(v: matrixEnums.Pattern){
      this._pattern = v
    }


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
    constructor(options: MatrixConstructor) {
      //this.getArrayIndex = (x:Number,y:number)=>0 //temporarily assign a dummy function
      this._width = options.width || 0
      this._height = options.height || 0
      this._startCorner = options.startCorner || matrixEnums.Corner.BottomLeft
      this._direction = options.direction || matrixEnums.Direction.X
      this._pattern = options.pattern || matrixEnums.Pattern.zigzag
      this._cacheAlgorithm = options.cacheAlgorithm || true
      this._cacheData = options.cacheData || true
    }

    /**
     * The full array length for this matrix. Can not be set directly.
     * calculated based on the width and height of the matrix.
     * (beta)
     * @public
     */
    get fullArrayLength(): number {
      return this.width * this.height
    }

    /**
     * The sub-array length for this matrix. The full array needs to be divided
     * in to smaller "sub" arrays which are laied out to cover the matrix. Each
     * sub-array will have the same length which will be wither the width or height
     * of the matrix, depending on the array direction.
     * (beta)
     * @public
     */
    get subArrayLength(): number {
      return this.direction == matrixEnums.Direction.X
        ? this.width
        : this.height
    }
    // NOTE: For API Extractor don't write documentation for the setter.
    set subArrayLength(newV: number) {
      this.direction == matrixEnums.Direction.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    /**
     * Gets or sets the sub-array count for this matrix. This will either be
     * the width or height of the matrix, depending on the array direction.
     * (beta)
     * @public
     */
    get subArrayCount(): number {
      return this.direction == matrixEnums.Direction.X
        ? this.height
        : this.width
    }
    // NOTE: For API Extractor don't write documentation for the setter.
    set subArrayCount(newV: number) {
      this.direction == matrixEnums.Direction.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    /**
     * Returns whether this matrix has a <b>top down</b> patterm
     * (beta)
     * @public
     * @returns true or false
     */
    isTopDown():   boolean {return this.isTopStart() && this.direction == matrixEnums.Direction.X}
    /**
     * Returns whether this matrix has a <b>bottom up</b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isBottomUp():   boolean {return this.isBottomStart() && this.direction == matrixEnums.Direction.X}
    /**
     * Returns whether this matrix has a <b>left to right </b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isLeftRight(): boolean {return this.isLeftStart() && this.direction == matrixEnums.Direction.Y}
    /**
     * Returns whether this matrix has a <b>right to left</b> pattern
     * (beta)
     * @public
     * @returns true or false
     */
    isRightLeft(): boolean {return this.isRightStart() && this.direction == matrixEnums.Direction.Y}
    /**
     * Returns whether this matrix has a pattern starting at the <b>top</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isTopStart():  boolean {return this.startCorner == matrixEnums.Corner.TopLeft || this.startCorner == matrixEnums.Corner.TopRight}
    /**
     * Returns whether this matrix has a pattern starting at the <b>bottom</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isBottomStart():  boolean {return this.startCorner == matrixEnums.Corner.BottomLeft || this.startCorner == matrixEnums.Corner.BottomRight}
    /**
     * Returns whether this matrix has a pattern starting on the <b>left</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isLeftStart():  boolean {return this.startCorner == matrixEnums.Corner.TopLeft || this.startCorner == matrixEnums.Corner.BottomLeft}
    /**
     * Returns whether this matrix has a pattern starting on the <b>right</b>
     * (beta)
     * @public
     * @returns true or false
     */
    isRightStart():  boolean {return this.startCorner == matrixEnums.Corner.TopRight || this.startCorner == matrixEnums.Corner.BottomRight}

    /**
     * Returns whether this matrix has direction == MatrixEnums.Direction.X
     * @public
     * @returns true or false
     */
    isXDirection():  boolean {return this.direction == matrixEnums.Direction.X}
    /**
     * Returns whether this matrix has direction == MatrixEnums.Direction.Y
     * @public
     * @returns true or false
     */
    isYDirection():  boolean {return this.direction == matrixEnums.Direction.Y}

    /**
     * Return this 1D array position of a value given it's 2D matrix coordinates
     * (beta)
     * @public
     * @param x - the x coordinate in the matrix
     * @param y - the y coordinate in the matrix
     * @returns - the corresponding possition in the array ("`n`")
     */
    getArrayIndex (x: number,y: number): number{

       if ( this.isTopStart() ) {
         y = this.height - 1 - y
       }
       if ( this.isRightStart() ) {
         x = this.width - 1 - x
       }

       //Step 2: Correct for direction
       var res = {full:0, rem:0}
       if(this.isYDirection()){
         res = {full: x, rem: y}
       }else{
         res = {full: y, rem: x}
       }

       //Step 3: Correct for zigzag
       if(this.pattern === matrixEnums.Pattern.zigzag){
         if((res.full % 2) != 0){
           res.rem = this.subArrayLength - res.rem - 1
         }
       }

       return res.full * this.subArrayLength + res.rem
    }

    arrayLike: ArrayLike<any> = {
      setValue: (i,v)=>{},
      getValue: (i)=>{return undefined}
    }

    /**
     * Use any object that conforms to the array like intrface at the underlying
     * array that this matrix scans to
     * @public
     * @param arrayLike - an ArrayLike object
     */
    useArrayLike(arrayLike: ArrayLike<any> ) {
      this.arrayLike = arrayLike
    }

    /**
     * Use a standard Javascript Array at the underlying
     * array that this matrix scans to
     * @public
     * @param array - an Array object
     */
    useArray(array: any[] ) {
      this.arrayLike = {
        setValue: (i,v)=>{array[i] = v},
        getValue: (i)=>{return array[i]}}
    }

    /**
     * Set a value in the underlying array based on it's coordinates inthe matrix
     * @public
     * @param x - x coordinate
     * @param y - y coordinate
     * @param value - value to set
     */
    setValue(x: number, y:number, value: any ) : void{
      this.arrayLike.setValue(this.getArrayIndex(x, y), value)
    }

    /**
     * Return all value positions with the `x,y` coordinates in the matrix and thier `n` possition in the array
     * @public
     * @returns - array of Position items
     */
    getAllPositions() : Position[]{
      var res:Position[]=[]
      for(let c of generateCoordinates(this.width, this.height)){
        let n = this.getArrayIndex(c.x, c.y)
        res[n]={n, ...c}
      }
      return res
    }
  }
}
