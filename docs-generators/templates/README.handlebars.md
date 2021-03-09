```
martix             0️⃣1️⃣2️⃣
                   5️⃣4️⃣3️⃣
                   6️⃣7️⃣8️⃣

scan               0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣

happiness          🎉  🪄
```

# 🔢 Introduction

This library is for mapping between two dimensional matrices and one dimensional arrays.
The concept is each element of the 2D matrix is ***"scanned"*** in a well defined order
to map it to the 1D array. In the other direction a ***"layout"*** maps a 1D array to
a 2D matrix.

# The Concept

To explain the concept, imagine a strip of lights laid out in rows to create grid.

Each light is an **element**.
```
 💡           0️⃣
```

The strip of lights is a 1D **array**
```
💡💡💡💡    0️⃣1️⃣2️⃣3️⃣
```

The grid of lights is a ***matrix***.
```
  💡💡        0️⃣1️⃣
  💡💡        2️⃣3️⃣
```


## 📖 Definitions

We use the following definitions:

 - ***matrix*** - an arrangement of elements in a 2D space. Every element has an `x,y` coordinate in the matrix.
 - ***array*** - an arrangement of elements in a 1D space. Every element has an `n` position in the array.
 - ***element*** - represents anything that can be usefully arranged in arrays and matrices.
 - ***scan*** -  mapping elements from a **matrix to an array** - "a scan across a matrix".
 - ***layout*** - mapping elements from an **array to a matrix** - "laying out an array into a matrix"


## 🔢 Supported layouts

The layouts this library supports can be found [here](docs/generated/layouts/layouts.md). Here's an example:

- starting: **BottomLeft** (see green box)
- direction: **X** (see green arrow)
- pattern: **zigzag** (see dotted line arrows)

<img src="docs/generated/layouts/zigzag_X_BottomLeft.svg" />


## 💻 Getting started

Install as a dependency
```bash
nom init -y .
npm install matrix-scan
```

{{#each examples}}
### {{name}}
{{description}}

```js
{{code}}
```

{{/each}}

## 🗂 Documentation

* [Layouts](docs/generated/layouts/layouts.md)
* [API](docs/generated/api/matrix-scan.md)

## 🌎 Real world uses

**A bitmap image**. Pixels (elements) of the image are drawn in 2D space (matrix) but are stored in a sequential order (array) in a file.

**A LED array**. LED arrays made of [addressable led strips](https://www.google.com/search?q=addressable%20led%20strip). In this case the LEDs (elements) are on a PCB strip (array) that is laid out in a repeating pattern (matrix) to create an LED array.

**A coverage path**. Robotic pool cleaners, vacuum cleaners and lawn movers all need to cover a 2D space (matrix) but move in lines (arrays). Most seem to do this by moving in random lines but maybe they could be programmed more efficiently. Police on the ground, or aircraft in the sky, will often adopt a zigzag search pattern (arrays) to search of an area (matrix).

**JPEG encoding**. The JPEG image format uses a scan pattern to enumerate pixels in 2D image (matrix) to a 1D representation (array) for encoring and compression. **NOTE:** This library does not support JPEG scan patters, but maybe it could one day...


## 🧍Contributors

Adam Griffiths
