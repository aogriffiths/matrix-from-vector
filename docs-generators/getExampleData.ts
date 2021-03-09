
import * as path from "path"
import * as globpackg from 'glob'
import *  as fs from 'fs'
import { parse } from 'comment-parser'
import { Block } from 'comment-parser/lib/primitives'
const strip = require('strip-comments')

const glob = globpackg.glob

export interface ExampleFile{
  path: string}

export interface Example{
  name: string
  description: string
  file: string
  code?: string
}

function* getExamples(exampleFile: ExampleFile){
  if(exampleFile.path){
    var code: string = fs.readFileSync(exampleFile.path, 'utf8')
    const codeblocks = code.split(/^\w*\/\/\s*SPLIT\s*$/im).map((e)=>e.trim())
    for(var codeblock of codeblocks){
      const blocks: Block[] = parse(codeblock)
      const block = blocks[0]
      if(block){
        const striped = strip.block(codeblock)
        //console.log(block)
        var tag = block.tags.filter((tag)=>(tag.tag === "heading"))[0]
        const res: Example = {
          name: tag?.name + ' ' + tag?.description,
          description: block.description || "a",
          file: exampleFile.path,
          code: striped
        }
        yield res
      }
    }
  }
}

function* getExampleFiles(folderList: string[]){
  for(var exampleDir of folderList){
    // 01_example
    const pkgFile = path.resolve(exampleDir, 'package.json')
    if (fs.existsSync(pkgFile)) {
      const pkgJSON = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))
      if(pkgJSON.main){
        const res: ExampleFile = {
          path: path.resolve(exampleDir, pkgJSON.main)
        }
        yield res
      }
    }
  }
}
export function getExampleData(root_dir:string){
  var examples: Example[] = []
  glob(path.resolve(__dirname, root_dir) + '/*/',  function (err: any, res: any) {
    if (err) {
      //console.log('Error', err);
    } else {
      for(var file of getExampleFiles(res)){
        for(var example of getExamples(file)){
          examples.push(example)
        }
      }
    }
  })
  return examples
}
