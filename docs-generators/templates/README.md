
```
vector             0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣

to                 🪄

martix             0️⃣1️⃣2️⃣
                   3️⃣4️⃣5️⃣
                   6️⃣7️⃣8️⃣

happiness          🎉
```

# 🔢 Matrix from Vector

This is a libaray for creating a matrix from a vector of values.

Imagine a long strip of leds, cut at regular intervals and laid out as rows to create grid of leds. The leds are the ***values***. The strip is the ***vector***. The grid is the ***matrix***.

## 📖 Definitions

 - ***matrix*** - an arangement of values in a 2d space. Every value has an `x,y` coordinate in the matrix.
 - ***vector*** - an arnagment of values in a 1d space. Evey value has an `n` position in the vector.
 - ***value*** - representats anything that can be usefully arranged in vectors and matricies.

## 💡 Examples

**A bitmap image**. Pixels (values) of the image are drawn in 2D space (matrix) but can be stored as a string (vector) in a file.

**A LED array**. LED arrays made of [addressable led strips](https://www.google.com/search?q=addressable%20led%20strip). In this case the leds (values) are on a PCB strip (vector) that is laid out in a repeating pattern (matrix) to creat an LED array.

**A coverage path**. Robotic pool cleaners, vacuume cleaners and lawn movers all need to cover a 2D space (matrix) but move in lines (vectors). Most seem to do this by moving in random lines but maybe they could be programmed more efficiently. Police on the ground, or aricraft in the sky, will often adopt a zigzag search pattern (vectors) to search of an area (matrix).

**JPEG encoding**. The JPEG image format uses a scan pattern to enumerate pixels in 2D image (matrix) to a 1D representation (vector) for encoring and compression. **NOTE:** This libabry does not support JPEG Scan patters, but maybe it could one day...

## 🔢 Supported paterns

The patterns this libabry supports which are refred to as *layouts* can be found [here](docs/generated/layouts/layouts.md).

## 💻  Usage

Install as a dependency
```bash
nom init -y .
npm install matrix-scan
```

**CommonJS**
```js
var { Matrix } = require('matrix-scan')
```

**ES6 or TypeScript**
```js
import { Matrix } from 'matrix-scan'
```

## 🗂 Documentation

* [Layouts](docs/generated/layouts/layouts.md)
* [API](docs/generated/api/matrix-scan.md)

## 🧍Contributors

Adam Griffiths
