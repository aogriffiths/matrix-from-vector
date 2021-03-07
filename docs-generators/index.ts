
import * as fs from 'fs'
import * as glob from 'glob'
import * as Handlebars from "handlebars"
import * as path from "path"
import {getLayoutData} from "./getLayoutData"
import {getExampleData} from "./getExampleData"
import {generateSVGs} from "./generateSVG"



const DOCS_TEMPLATE_DIR = './templates'
const DOCS_OUTPUT_DIR = '../docs'
const SVG_OUTPUT_DIR = '../docs/generated/layouts'

function ensuredir(dir: string){
  var fulldir = path.resolve(__dirname, dir)
  if (!fs.existsSync(fulldir)){
    fs.mkdirSync(fulldir);
  }
}

ensuredir('../docs')
ensuredir('../docs/generated')
ensuredir('../docs/generated/layouts')


var layouts = getLayoutData()
var examples = getExampleData()

var allData = {
  layouts,
  examples
}
//SVGs
fs.rmdirSync(SVG_OUTPUT_DIR)
generateSVGs(allData.layouts, SVG_OUTPUT_DIR)

//Docs
glob(path.resolve(__dirname, DOCS_TEMPLATE_DIR) + '/**/*',  function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log(res);
//    const templateStr = fs.readFileSync(path.resolve(__dirname, DOCS_TEMPLATE_DIR, 'layouts.md.handlebars')).toString('utf8')
//    const template = Handlebars.compile(templateStr)
//    const result = template(allData)
//    fs.writeFileSync(path.resolve(__dirname, DOCS_OUTPUT_DIR, 'layouts.md'), result)

  }
});
