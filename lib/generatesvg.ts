
import * as matrix from "./index"
import * as d3 from 'd3'
import * as jsdom from 'jsdom'



var IMAGE_SIZE = 400        // width and height
var PIXEL_SIZE = 40     // max size for each pixel in a cell

// Create an array of pixel pairs
interface PixelPair{
  start: matrix.PixelPosition
  end: matrix.PixelPosition
}
function generatePixelPairs(positions: matrix.PixelPosition[]) : PixelPair[]{
  var pairs:PixelPair[]=[]
  for(var i=0; i<positions.length-1; i++){
    pairs.push({start:positions[i], end:positions[i+1]})
  }
  return pairs
}

// Build the sbg image
export function buildSVGofMatrix(matrix: matrix.Matrix) : string {
  const { JSDOM } = jsdom
  const dom = new JSDOM(`<!DOCTYPE html><body></body>`)

  var positions = matrix.pixelPositions()
  var pairs =  generatePixelPairs(positions)

  let body = d3.select(dom.window.document.querySelector("body"))
  let svg = body.append('svg').attr('width', IMAGE_SIZE).attr('height', IMAGE_SIZE).attr('xmlns', 'http://www.w3.org/2000/svg');

  const xScale = d3.scaleLinear()
      .domain([0, matrix.width])
      .range([0, IMAGE_SIZE])

  const yScale = d3.scaleLinear()
      .domain([0, matrix.height])
      .range([IMAGE_SIZE, 0])

  const x = (d:matrix.PixelPosition)=>{return xScale(d.x)}
  const y = (d:matrix.PixelPosition)=>{return yScale(d.y)}

  const cellW = Math.abs(xScale(1) - xScale(0))
  const cellH = Math.abs(yScale(1) - yScale(0))

  const xCenter = (d:matrix.PixelPosition)=>{return xScale(d.x)+cellW/2}
  const yCenter = (d:matrix.PixelPosition)=>{return yScale(d.y)-cellH/2}
  const center = (d: matrix.PixelPosition):[number,number] => ([xCenter(d), yCenter(d)])

  const centerOffset = (s: matrix.PixelPosition, e: matrix.PixelPosition) => {
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
      .style("stroke", "#404040")
      .style("stroke-width", 4)
      .style("fill", "#0000ff");

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

  var arrow = (d:PixelPair)=>{
    return d3.line()(centerOffset(d.start, d.end))
  }

  ga.append("path")
      .attr("d", arrow)
      .attr("marker-end", "url(#arrow)",)
      .style("stroke", "#404040")
      .style("stroke-width", 4)
      .style("fill", "none");


  return body.html();
}
