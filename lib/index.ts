
/**
 * generateCoordinates
 * Utiltiy function to generate list of all coordinates in a matrix
 * (beta)
 * @internal
 */
export function* generateCoordinates(w: number, h: number) {
  for(var j:number = 0; j<h; j++){
    for(var i:number = 0; i<w; i++){
      yield {x:i, y:j, xReverse:w - i - 1, yReverse: h - j - 1}
    }
  }
}

/**
 * memoizeMatrixIndexGetter
 * Utiltiy function to memoize a getArrayIndex(x,y) function
 * (beta)
 * @internal
 */
const memoizeMatrixIndexGetter = (fn: indexGetterMemberFunction, matrix: Matrix) => {
  let cache : number[] = []
  let width = matrix.width
  return (x: number, y: number) => {
    let cache_i = x + y * width
    if (cache[cache_i] == undefined) {
      cache[cache_i] = fn.call(matrix, x, y)
    }
    return cache[cache_i]
  }
}

/**
 * indexGetterMemberFunction
 * Interfaces for an indexGetter function
 * (beta)
 * @internal
 */
interface indexGetterMemberFunction {
    (x: number, y: number): number
};


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
    _startCorner: Matrix.Corner = Matrix.Corner.BottomLeft
    /**
     * Internal state for: The initial direction the array travels from the start corner across the matrix
     */
    _direction: Matrix.Direction = Matrix.Direction.X
    /**
     * Internal state for: The repeating partern the array follows to create the matrix
     */
    _pattern: Matrix.Pattern = Matrix.Pattern.zigzag

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
      this.updateGetArrayIndex()
    }

    /**
     * Width of the matrix
     */
    get width(): number{
      return this._width
    }
    set width(v: number){
      this._width = v
      this.updateGetArrayIndex()
    }

    /**
     * The corner of the matrix where the array starts
     */
    get startCorner(): Matrix.Corner{
      return this._startCorner
    }
    set startCorner(v: Matrix.Corner){
      this._startCorner = v
      this.updateGetArrayIndex()
    }

    /**
     * The initial direction the array travels from the start corner across the matrix
     */
    get direction(): Matrix.Direction{
      return this._direction
    }
    set direction(v: Matrix.Direction){
      this._direction = v
      this.updateGetArrayIndex()
    }

    /**
     * The repeating partern the array follows to create the matrix
     */
    get pattern(): Matrix.Pattern{
      return this._pattern
    }
    set pattern(v: Matrix.Pattern){
      this._pattern = v
      this.updateGetArrayIndex()
    }

    /**
     * Cache the algorithm
     */
    get cacheAlgorithm(): boolean{
      return this._cacheAlgorithm
    }
    set cacheAlgorithm(v: boolean){
      this._cacheAlgorithm = v
      this.updateGetArrayIndex()
    }

    /**
     * Cache the data
     */
    get cacheData(): boolean{
      return this._cacheData
    }
    set cacheData(v: boolean){
      this._cacheData = v
      this.updateGetArrayIndex()
    }

    updateGetArrayIndex(){
      if(this.cacheData){
        this.getArrayIndex = memoizeMatrixIndexGetter(this.getArrayIndexSlow, this)
      }else if (this.cacheAlgorithm){
        this.getArrayIndex = generateIndexGetter(this)
      }else{
        this.getArrayIndex = this.getArrayIndexSlow
      }
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
    constructor(options: Matrix.Constuctor) {
      this.getArrayIndex = (x:Number,y:number)=>0 //temporarily assign a dummy function
      this._width = options.width || 0
      this._height = options.height || 0
      this._startCorner = options.startCorner || Matrix.Corner.BottomLeft
      this._direction = options.direction || Matrix.Direction.X
      this._pattern = options.pattern || Matrix.Pattern.zigzag
      this._cacheAlgorithm = options.cacheAlgorithm || true
      this._cacheData = options.cacheData || true
      this.updateGetArrayIndex()
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
     * Gets or sets the sub-array count for this matrix. This will either be
     * the width or height of the matrix, depending on the array direction.
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
     * Returns whether this matrix has direction == Matrix.Direction.X
     * @public
     * @returns true or false
     */
    isXDirection():  boolean {return this.direction == Matrix.Direction.X}
    /**
     * Returns whether this matrix has direction == Matrix.Direction.Y
     * @public
     * @returns true or false
     */
    isYDirection():  boolean {return this.direction == Matrix.Direction.Y}


    /**
     * Return this 1D array position of a value given it's 2D matrix coordinates
     * (beta)
     * @public
     * @param x - the x coordinate in the matrix
     * @param y - the y coordinate in the matrix
     * @returns - the corresponding possition in the array ("`n`")
     */
    getArrayIndex: indexGetterMemberFunction


    /**
     * Return this 1D array position of a value given it's 2D matrix coordinates
     * (beta)
     * @public
     * @param x - the x coordinate in the matrix
     * @param y - the y coordinate in the matrix
     * @returns - the corresponding possition in the array ("`n`")
     */
    getArrayIndexSlow (x: number,y: number): number{

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
       if(this.pattern === Matrix.Pattern.zigzag){
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
    getAllPositions() : Matrix.Position[]{
      var res:Matrix.Position[]=[]
      for(let c of generateCoordinates(this.width, this.height)){
        let n = this.getArrayIndex(c.x, c.y)
        res[n]={n, ...c}
      }
      return res
    }
}

//function generateIndexGetterWithCache(m: Matrix): indexGetterMemberFunction {
//  var fnCache: string = generateIndexGetterBase(m)
//  fnCache =
//  //`if(false){
//  `if(this._dataCache[x + (100 * y)] !== undefined){
//    console.log("cache hit", x, y, this._dataCache)
//    return this._dataCache[x + (100 * y)]
//  }else{
//    console.log("cache miss", x, y, this._dataCache)
//    ${fnCache}
//    this._dataCache[x + (100 * y)] = result
//    return result
//  }`
//  return <indexGetterMemberFunction>(new Function('x', 'y', fnCache)).bind(m)
//}

function generateIndexGetter(m: Matrix): indexGetterMemberFunction {
  var fnCache: string = generateIndexGetterBase(m)
  fnCache =
  //`if(false){
  `${fnCache}
   return result
  `
  return <indexGetterMemberFunction>(new Function('x', 'y', fnCache)).bind(m)
}

function generateIndexGetterBase(m: Matrix): string {

    var fnCache = ""

    //Step 1: Correct for start corner
    if ( m.isTopStart() ) {
      fnCache += `
      y = ${m.height} - 1 - y`
    }
    if ( m.isRightStart() ) {
      fnCache += `
      x = ${m.width} - 1 - x`
    }

    //Step 2: Correct for direction
    if(m.isYDirection()){
      fnCache += `
      var res = {full: x, rem: y}`
    }else{
      fnCache += `
      var res = {full: y, rem: x}`
    }

    //Step 3: Correct for zigzag
    if(m.pattern === Matrix.Pattern.zigzag){
      fnCache += `
      if((res.full % 2) != 0){
        res.rem = ${m.subArrayLength} - res.rem - 1
      }`
    }

    fnCache += `
    var result = res.full * ${m.subArrayLength} + res.rem`

    return fnCache
}

/**
 * Namespace with same name as the Matrix class. Houses enumerations.
 * @public
 */
export namespace Matrix {

  /**
   * The four corners of the matrix. The array must start in one of these corners.
   * @public
   */
  export enum Corner{
    /**
     * Bottom left (x=0, y=0) (default array start corner)
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
   * The directions the array can travel across the matrix
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
   * The possible patterns the array can follow to cover the matrix
   * @public
   */
  export enum Pattern{
    /**
     * The direction of the array will alternate (forwards and reverse with respect the initial array direction)
     */
    zigzag,
    /**
     * The direction of the array will remain the same (always the same as the initial array direction)
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
     * The corner of the matrix where the array starts. Default `VectorStartCorner.BottomLeft`
     */
    startCorner?: Corner
    /**
     * The initial direction the array travels from the start corner across
     * the matrix . Default `Matrix.Direction.X`
     */
    direction?: Direction
    /**
     * Matrix pattern. Default `Matrix.Pattern.zigzag`
     */
    pattern?: Pattern

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
}
