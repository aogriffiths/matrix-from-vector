
import { Matrix } from '../lib/index'
import * as d3 from 'd3'
import * as jsdom from 'jsdom'
import * as fs from 'fs'
import * as path from 'path'
import {LayoutData} from './getLayoutData'

var MATRIX_WIDTH:number = 4               // pixels wide
var MATRIX_HEIGHT:number = 4              // pixels high

var IMAGE_SIZE:number = 400    // width and height
var PIXEL_SIZE:number = 40     // max size for each pixel in a cell

// Create an array of position pairs
interface PositionPair{
  start: Matrix.Position
  end: Matrix.Position
}
function generatePositionPairs(positions: Matrix.Position[]) : PositionPair[]{
  var pairs:PositionPair[]=[]
  for(var i=0; i<positions.length-1; i++){
    pairs.push({start:positions[i], end:positions[i+1]})
  }
  return pairs
}

// Build the svg image
export function buildSVGofMatrix(matrix: Matrix) : string {
  const { JSDOM } = jsdom
  const dom = new JSDOM(`<!DOCTYPE html><body></body>`)

  var positions = matrix.getAllPositions()
  var pairs =  generatePositionPairs(positions)

  let body = d3.select(dom.window.document.querySelector("body"))
  let svg = body.append('svg').attr('width', IMAGE_SIZE).attr('height', IMAGE_SIZE).attr('xmlns', 'http://www.w3.org/2000/svg');

  const xScale = d3.scaleLinear()
      .domain([0, matrix.width])
      .range([0, IMAGE_SIZE])

  const yScale = d3.scaleLinear()
      .domain([0, matrix.height])
      .range([IMAGE_SIZE, 0])

  const x = (d:Matrix.Position)=>{return xScale(d.x)}
  const y = (d:Matrix.Position)=>{return yScale(d.y)}

  const cellW = Math.abs(xScale(1) - xScale(0))
  const cellH = Math.abs(yScale(1) - yScale(0))

  const xCenter = (d:Matrix.Position)=>{return xScale(d.x)+cellW/2}
  const yCenter = (d:Matrix.Position)=>{return yScale(d.y)-cellH/2}
  const center = (d: Matrix.Position):[number,number] => ([xCenter(d), yCenter(d)])

  const centerOffset = (s: Matrix.Position, e: Matrix.Position) => {
    var p1 = center(s)
    var p2 = center(e)
    var xD = p1[0] - p2[0]
    var yD = p1[1] - p2[1]
    var dD = Math.sqrt(xD * xD + yD * yD)
    var ratioStart = (PIXEL_SIZE/2) / dD
    var ratioEnd= ((PIXEL_SIZE/2) + 10) / dD
    p1[0] -= (ratioStart * xD)
    p1[1] -= (ratioStart * yD)
    p2[0] += (ratioEnd * xD)
    p2[1] += (ratioEnd * yD)
    return [p1,p2]
  }

  var defs = svg.append("defs")

  defs.append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .attr("fill", "#404040")
      .append("path")
        .attr("d", "M0,-4L10,0L0,4")
        .attr("class","arrowHead")

  defs.append("marker")
      .attr("id", "arrow_green")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .attr("fill", "#66ff66")
      .append("path")
        .attr("d", "M0,-4L10,0L0,4")
        .attr("class","arrowHead")


  // CELS
  var g = svg.selectAll("g.cells")
    .data(positions)
    .join("g")
    .classed("cells", true)
    .attr("transform", (d,i)=>{return `translate(${x(d)}, ${y(d)})`})

  g.append("rect")
      .attr("y", -cellH)
      .attr("width", cellW)
      .attr("height", cellH)
      .style("stroke", "grey")
      .style("fill", "white");

  g.append("rect")
      .attr("y", -cellH/2 - PIXEL_SIZE/2)
      .attr("x", cellH/2 - PIXEL_SIZE/2)
      .attr("width", PIXEL_SIZE)
      .attr("height", PIXEL_SIZE)
      .style("stroke", (d,i)=>{return i==0 ? "#66ff66" : "#404040" })
      .style("stroke-width", 4)
      .style("fill", (d,i)=>{return i==0 ? "#00cc00" : "#0000ff" });

  g.append("text")
    .text((d,i)=>{return(i)})
    .attr("x",cellW/2)
    .attr("y",-cellH/2)
    .attr("alignment-baseline","middle")
    .attr("font-size", "16")
    .attr("stroke-width", "0")
    .attr("stroke", "#fff")
    .attr("fill", "white")
    .attr("text-anchor", "middle")

  // ARROWS

  var ga = svg.selectAll("g.arrows")
    .data(pairs)
    .join("g")
    .classed("arrows", true)

  var arrow = (d:PositionPair)=>{
    return d3.line()(centerOffset(d.start, d.end))
  }

  ga.append("path")
      .attr("d", arrow)
      .attr("marker-end", (d,i)=>{return i==0 ? "url(#arrow_green)" : "url(#arrow)" })
      .style("stroke", (d,i)=>{return i==0 ? "#66ff66" : "#404040" })
      .style("stroke-dasharray", (d,i)=>{return (i + 1 ) % matrix.width == 0 ? "4 4" : null })
      .style("stroke-width", 4)
      .style("fill", "none");


  return body.html();
}

export function generateSVGs(layoutData: LayoutData, output_dir: string){
  //SVGs
  layoutData.pattern?.forEach(function(pattern){
    pattern.direction?.forEach(function(direction){
      direction.startcorner?.forEach(function(start_corner){
        const amatrix = new Matrix({
          width: MATRIX_WIDTH,
          height: MATRIX_HEIGHT,
          direction: direction.enum,
          pattern: pattern.enum,
          startCorner: start_corner.enum
        })
        start_corner.imageFile = `${pattern.name}_${direction.name}_${start_corner.name}.svg`
        var svg = buildSVGofMatrix(amatrix)
        fs.writeFileSync(path.resolve(__dirname, output_dir, start_corner.imageFile), svg)
      })
    })
  })
}
