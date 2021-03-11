/**
 * Using new style ECMAScript module (ESM) import, supported since  Node.js 13.2.0
 *
 * @heading ESM Import
 */
import { Matrix } from 'matrix-scan'
import Benchmark from 'benchmark'

var mNotCached = new Matrix({height:3, width:3, pattern: Matrix.Pattern.zigzag})
mNotCached.cacheAlgorithm = false
mNotCached.cacheData = false

var mCached = new Matrix({height:3, width:3, pattern: Matrix.Pattern.zigzag})
mCached.cacheAlgorithm = true
mCached.cacheData = false

var mCached2x = new Matrix({height:3, width:3, pattern: Matrix.Pattern.zigzag})
mCached2x.cacheAlgorithm = true
mCached2x.cacheData = true

var suite = new Benchmark.Suite;

// add tests
suite
//.add('getArrayIndexFastFast', function() {
//  m.getArrayIndexFastFast(1,1)
//})
.add('getArrayIndex mNotCached', function() {
  mNotCached.getArrayIndex(1,1)
})
.add('getArrayIndex mCached', function() {
  mCached.getArrayIndex(1,1)
})
.add('getArrayIndex mCached2x', function() {
  mCached2x.getArrayIndex(1,1)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.on('error', function(evt) { console.log('suite error', evt.target.error); })
// run async
.run({ 'async': true });
