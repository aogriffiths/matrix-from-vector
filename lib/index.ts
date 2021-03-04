
//utiltiy function to generate list of the coordinates in a matrix
function* generateCoordinates(w: number, h: number) {
  for(var j:number = 0; j<h; j++){
    for(var i:number = 0; i<w; i++){
      yield {x:i, y:j}
    }
  }
}

export enum startCorner{
  //% block="Top Left"
  TopLeft=1,
  //% block="Top Right"
  TopRight=2,
  //% block="Bottom Left"
  BottomLeft=3,
  //% block="Bottom Right"
  BottomRight=4,
}

export enum stripPattern{
  //% block="Zig Zaging"
  zigzag=1,
  //% block="Looping"
  loop=2,

}

export enum stripDirection{
  //% block="Zig Zaging"
  X=1,
  //% block="Looping"
  Y=2,

}

export interface MatrixConstuctor {
  height?: number
  width?: number
  pattern?: stripPattern
  start_corner?: startCorner
  direction?: stripDirection
}

// PixelPositions
// An array of pixel numbers and their coordinates
export interface PixelPosition{
  n:number //pixel number
  x:number //x coordinate
  y:number //y coordinate
}

export class Matrix {
    width: number
    height: number
    pattern: stripPattern
    start_corner: startCorner
    direction: stripDirection

    get fullstrip_length(): number {
      return this.width * this.height
    }

    get substrip_length(): number {
      return this.direction == stripDirection.X
        ? this.width
        : this.height
    }
    set substrip_length(newV: number) {
      this.direction == stripDirection.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    get substrip_count(): number {
      return this.direction == stripDirection.X
        ? this.height
        : this.width
    }
    set substrip_count(newV: number) {
      this.direction == stripDirection.X
        ? (this.width = newV)
        : (this.height = newV)
    }

    //   y
    //   TL. .TR
    //   . . . .
    //   . . . .
    //   BL. .BR x

    constructor({
      height=0,
      width=0,
      pattern = stripPattern.zigzag,
      start_corner =  startCorner.BottomLeft,
      direction = stripDirection.X
    }: MatrixConstuctor) {

      this.width = width
      this.height = height
      this.pattern = pattern
      this.start_corner = start_corner
      this.direction = direction

    }


    isTopDown():   boolean {return this.isTopStart() && this.direction == stripDirection.X}
    isBotomUp():   boolean {return this.isBtmStart() && this.direction == stripDirection.X}
    isLeftRight(): boolean {return this.isLefStart() && this.direction == stripDirection.Y}
    isRightLeft(): boolean {return this.isRitStart() && this.direction == stripDirection.Y}

    isTopStart():  boolean {return this.start_corner == startCorner.TopLeft || this.start_corner == startCorner.TopRight}
    isBtmStart():  boolean {return this.start_corner == startCorner.BottomLeft || this.start_corner == startCorner.BottomRight}
    isLefStart():  boolean {return this.start_corner == startCorner.TopLeft || this.start_corner == startCorner.BottomLeft}
    isRitStart():  boolean {return this.start_corner == startCorner.TopRight || this.start_corner == startCorner.BottomRight}


    getPixel(x: number, y: number): number{
      //Correct for start corner (using negative coordinates for now)
      if ( this.start_corner == startCorner.TopLeft ||
           this.start_corner == startCorner.TopRight ) {
        y *= -1
        y += -1
      }
      if ( this.start_corner == startCorner.BottomRight ||
           this.start_corner == startCorner.TopRight ) {
        x *= -1
        x += -1
      }


      var res = {
         full: -1,
         rem: -1
      }

      //Correct for direction
      if(this.direction === stripDirection.Y){
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
      if(this.pattern === stripPattern.zigzag){
        if((res.full % 2) != 0){
          res.rem = this.substrip_length - res.rem - 1
        }
      }

      return res.full * this.substrip_length + res.rem
    }


    /**
     * get a list of pixel positions for this marix
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
