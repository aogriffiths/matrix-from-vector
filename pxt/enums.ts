
/**
 * Enumerations for the matric class
 * @public
 */

namespace matrixEnums {

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
}
