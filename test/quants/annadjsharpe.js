var assert = require('assert');
var ubique = require('../../index.js');

suite('quants',function () {
console.log('Testing quants/annadjsharpe ...');
test('annadjsharpe', function (done) {

var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
var cat = ubique.cat;

assert.deepEqual(ubique.annadjsharpe(x,0.02,12,'geometric'),3.3767236091658313);
assert.deepEqual(ubique.annadjsharpe(cat(1,x,y),0,12),[[3.766554675258115,0.8277574889636573]]);


done();
});
});


// <--- This file has been auto-generated. PLEASE DO NOT EDIT THIS FILE, changes will be overwritten the next time the script is run --->