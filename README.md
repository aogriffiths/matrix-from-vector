# Matrix from Vector

This is a libaray for creating a matrix from a vector of values.

A simple explantion is imagine a long strip of leds, cut at regular intervals and laid out as rows to create grid of leds. The leds are the "values". The strip if the "vector". The grid is the "matrix".

## Definitions

 - **matrix** - an arangement of a 1d vector of values in a 2d space. Every value in the vector has an `x,y` coordinate in the matrix.
 - **vector** - an arnagment of values in a 1d space. Evey value has an `n` position in the vector.
 - **value** - representats anything that can be usefully arranged in vectors and matricies (e.g. in 1d and in 2d).

## Examples

**A bitmap image**. Pixels of the image are drawing in 2d space but can be stored as a long list (a 1d vector) of pixels.

**A LED array**. LED arrays made of [addressable led strips](https://www.google.com/search?q=addressable%20led%20strip). In this case the led strip is the 1d vector and the array is the 2d matrix.

**A coverage path**. Robotic pool cleaners, vacuume cleaners and lawn movers all need to cover a 2d space by moving in a pattern of 1d lines. Most seem to do this by moving in random lines but maybe they could be programmed more efficiently. Police on the ground, or aricraft in the sky, will often adopt a zigzag search pattern to complex a search of a 2d area.

**JPEG encoding**. The JPEG image format uses a scan pattern to enumerate pixels in a 2d image to a 1d representation for encoring and compression. **NOTE:** This libabry does not support JPEG Scan patters, but maybe it could one day!

All the patterns this libabry supports which are refred to as *layouts* can be found [here](docs/generated/layouts/layouts.md).

## Usage

Install as a dependency
```bash
nom init -y .
npm install matrix-from-vector
```

**CommonJS**
```js
var { Matrix } = require('matrix-from-vector')
```

**ES6 or TypeScript**
```js
import { Matrix } from 'matrix-from-vector'
```

## Further documentation

* [All layouts](docs/generated/layouts/layouts.md)
* [Full API](docs/generated/api/matrix-from-vector.md)

## Contributors

Adam Griffiths
