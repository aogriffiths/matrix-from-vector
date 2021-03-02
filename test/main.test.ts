/// <reference path="./pxt_modules/neopixel/neopixel.ts" />

import { expect } from "chai";


describe('calculate', function() {
  it('add', function() {
    let result = 5+2;
    expect(result).equal(7);
  });
});

describe('neopixelExtras', function() {
  neopixel.create(0,12,NeoPixelMode.RGB_RGB)
  //neopixelExtras.create()
});
