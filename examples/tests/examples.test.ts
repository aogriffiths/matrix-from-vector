
import { expect } from "chai"
var {spawn, exec} = require('child_process')

const skip = ()=>{}

describe('Failiure example', function() {
  const cwd = "./examples/Failiure/"

  it('should install', function(done) {
    this.timeout(60000)
    exec('npm install', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error).to.be.null
      done()
    })
  })
  it('should not start', function(done) {
    this.timeout(60000)
    exec('npm start', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error?.code).to.equal(1)
      expect(stdout).not.to.include("3*3=9")
      done()
    })
  })
})

describe('TypeScript example', function() {
  const cwd = "./examples/TypeScript/"

  it('should install', function(done) {
    this.timeout(60000)
    exec('npm install', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error).to.be.null
      done()
    })
  })
  it('should start', function(done) {
    this.timeout(60000)
    exec('npm start', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error).to.be.null
      expect(stdout).to.include("3*3=9")
      done()
    })
  })
})

describe('ES6Import example', function() {
  const cwd = "./examples/ES6Import/"

  it('should install', function(done) {
    this.timeout(60000)
    exec('npm install', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error).to.be.null
      done()
    })
  })
  it('should start', function(done) {
    this.timeout(60000)
    exec('npm start', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error).to.be.null
      expect(stdout).to.include("3*3=9")
      done()
    })
  })
})

describe('CommonJS example', function() {
  const cwd = "./examples/CommonJS/"

  it('should install', function(done) {
    this.timeout(60000)
    exec('npm install', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error).to.be.null
      done()
    })
  })
  it('should start', function(done) {
    this.timeout(60000)
    exec('npm start', { shell: true , cwd}, (error:any, stdout: any, stderr: any) => {
      expect(error).to.be.null
      expect(stdout).to.include("3*3=9")
      done()
    })
  })
})
