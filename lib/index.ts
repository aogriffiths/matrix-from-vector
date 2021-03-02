
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
  fullstrip_length?: number
  substrip_length?: number
  substrip_count?: number
  pattern?: stripPattern
  start_corner?: startCorner
  direction?: stripDirection
}


export class Matrix {
    fullstrip_length: number
    substrip_length: number
    substrip_count: number
    pattern: stripPattern
    start_corner: startCorner
    direction: stripDirection
    //   y
    //   TL. .TR
    //   . . . .
    //   . . . .
    //   BL. .BR x

    constructor({
      fullstrip_length,
      substrip_length,
      substrip_count,
      pattern = stripPattern.zigzag,
      start_corner =  startCorner.BottomLeft,
      direction = stripDirection.X
    }: MatrixConstuctor) {
      //attempt to caluclate missing parameters
      if(fullstrip_length === undefined && substrip_length != undefined && substrip_count != undefined) {
        fullstrip_length = substrip_length * substrip_count

      }else if(substrip_length === undefined && substrip_count != undefined && fullstrip_length != undefined) {

        substrip_length = fullstrip_length / substrip_count
      }else if(substrip_count === undefined && fullstrip_length != undefined && substrip_length != undefined) {

        substrip_count = fullstrip_length / substrip_length
      }
      //if any are still missing set all to zero
      if(fullstrip_length === undefined || substrip_length === undefined || substrip_count === undefined) {

        fullstrip_length = 0
        substrip_length = 0
        substrip_count = 0
      }

      this.fullstrip_length = fullstrip_length
      this.substrip_length = substrip_length
      this.substrip_count = substrip_count
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
}
