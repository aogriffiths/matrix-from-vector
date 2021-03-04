
import * as matrix from "./index"
import * as fs from 'fs'
import * as Handlebars from "handlebars"
import * as path from "path"
import {buildSVGofMatrix} from "./generatesvg"
import {generateAllLayouts, AllLayouts} from "./generateAllLayouts"

var width = 4               // pixels wide
var height = 4              // pixels high
const TEMPLATE_DIR = '../docs'
const OUTOPUT_DIR = '../docs/generated'

var allLayouts: AllLayouts = generateAllLayouts()

//SVGs
allLayouts.pattern?.forEach(function(pattern){
  pattern.direction?.forEach(function(direction){
    direction.startcorner?.forEach(function(start_corner){
      const amatrix = new matrix.Matrix({
        width,
        height,
        direction: direction.enum,
        pattern: pattern.enum,
        start_corner: start_corner.enum
      })
      start_corner.imageFile = `${pattern.name}_${direction.name}_${start_corner.name}.svg`
      var svg = buildSVGofMatrix(amatrix)
      fs.writeFileSync(path.resolve(__dirname, OUTOPUT_DIR, start_corner.imageFile), svg)
    })
  })
})


//Document

const templateStr = fs.readFileSync(path.resolve(__dirname, TEMPLATE_DIR, 'layouts.md.handlebars')).toString('utf8')
const template = Handlebars.compile(templateStr)
const result = template(allLayouts)
fs.writeFileSync(path.resolve(__dirname, OUTOPUT_DIR, 'layouts.md'), result)
