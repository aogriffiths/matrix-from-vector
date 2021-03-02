/**
 * Micro:Bit makeCode extension for neopixel/ws2812b matrices
 *
 *
 */

//**********************************************//
// library for NeoPixel Displays/Matrices       //
//                                              //
//Written by Sjors Smit                         //
//June 2020                                     //
//                                              //
//**********************************************//

enum startCorner{
  //% block="Top Left"
  TopLeft=1,
  //% block="Top Right"
  TopRight=2,
  //% block="Bottom Left"
  BottomLeft=3,
  //% block="Bottom Right"
  BottomRight=4,
}

enum stripPattern{
  //% block="Zig Zaging"
  zigzag=1,
  //% block="Looping"
  loop=2,

}

enum stripDirection{
  //% block="Zig Zaging"
  X=1,
  //% block="Looping"
  Y=2,

}

//% weight=6 color=#00CC60 icon="\uf110"
namespace neopixelExtras {

    /**
     * A Matrix made of ws2812b LEDs
     */
    export class Matrix {
        strip: neopixel.Strip = null
        substrip_length: number = 2
        substrip_count: number = 2
        pattern: stripPattern = stripPattern.zigzag
        corner: startCorner = startCorner.BottomLeft
        direction: stripDirection = stripDirection.X
        //   y
        //   TL. .TR
        //   . . . .
        //   . . . .
        //   BL. .BR x


        isTopDown():   boolean {return this.isTopStart() && this.direction == stripDirection.X}
        isBotomUp():   boolean {return this.isBtmStart() && this.direction == stripDirection.X}
        isLeftRight(): boolean {return this.isLefStart() && this.direction == stripDirection.Y}
        isRightLeft(): boolean {return this.isRitStart() && this.direction == stripDirection.Y}

        isTopStart():  boolean {return this.corner == startCorner.TopLeft || this.corner == startCorner.TopRight}
        isBtmStart():  boolean {return this.corner == startCorner.BottomLeft || this.corner == startCorner.BottomRight}
        isLefStart():  boolean {return this.corner == startCorner.TopLeft || this.corner == startCorner.BottomLeft}
        isRitStart():  boolean {return this.corner == startCorner.TopRight || this.corner == startCorner.BottomRight}


        getPixel(x: number, y: number): number{
          var res = {
             full: x,
             rem: y
          }
          //var odd = this.direction == stripDirection.X
          //  ? (this.isBotomUp() y % 2 == 0) // X
          //  : (x % 2 == 0) // Y


          if (
            this.corner == startCorner.BottomRight && (
              this.pattern == stripPattern.loop ||
              (this.pattern == stripPattern.zigzag )
            )){
            res.rem *= -1
          }

//If BR|TR: res.full *= -1


          // BL / loop: x + y * Width
          // BR / loop: x + y * Width
          return 0
        }
        /**
         * Push all changes made to the framebuffer to the display
         */
        //% blockId="Matrix_show" block="%matrix| show"
        //% weight=90
        //% blockGap=8 parts="neopixelExtras"
        show(): void {
            this.strip.show();
        }
        /**
         * Set the brightness of the LEDs
         * @param setpoint -the brightness setpoint, on a scale from 0-255
         */
        //% blockId="Matrix_Brightness" block="%matrix set brightness to %setpoint"
        //% weight=80
        //% setpoint.defl=32
        //% blockGap=8 parts="neopixelExtras"
        Brightness(setpoint: number): void {
            this.strip.setBrightness(setpoint);
        }
        /**
         * Empty the entire framebuffer, a call to "show()" must be made to made changes visible
         */
        //% blockId="Matrix_clear" block="clear %matrix"
        //% weight=80
        //% blockGap=8 parts="neopixelExtras"
        clear(): void {
            this.strip.clear();
        }
        /**
         * Set a single pixel on the display to a specific colour
         * @param x - the position on the x-axis (left is 0)
         * @param y - the position on the y-axis (top is 0)
         * @param colour - the colour to set the pixel to
         */
        //% blockId="Matrix_setPixel" block="%matrix| set pixel at x %x| y %y| to colour %colour"
        //% weight=80
        //% colour.shadow=neopixel_colors
        //% blockGap=8 parts="neopixelExtras"
        setPixel(x: number, y: number, colour: number): void {
            this.strip.setPixelColor(this.getPixel(x,y), colour); } //While all odd rows are drawn bottom to top
        }


    /**
     * Create a new matrix object
     * @param strip the strp the matrix is made from
     * @param pattern the pattern followed
     * @param start the corner started in
     * @param matrixWidth the amount of leds horizontally
     */
    //% blockId="Matrix_Create" block="%strip| %pattern| from %start| every %matrixWidth pixels"
    //% weight=100
    //% matrixWidth.defl=18
    //% blockSetVariable=matrix
    //% blockGap=8 parts="neopixelExtras"
    //% start.shadow="startCorner"
    //% pattern.shadow="stripPattern"
    //% pattern.shadow="stripPattern
    //% start.fieldEditor="gridpicker"
    //% start.fieldOptions.width=220
    //% start.fieldOptions.columns=2
    //% inlineInputMode=inline
    export function create(strip: neopixel.Strip, pattern: stripPattern, start: startCorner, matrixWidth: number): Matrix {
        let matrix = new Matrix;
        matrix.strip   = strip;

        return matrix;
    }

}
