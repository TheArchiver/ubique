/**
 * Risk metrics
 */
 module.exports = function($u) {
/**
 * @method drawdown
 * @summary Drawdown
 * @description Any continuous losing return period. Return drawdown from peak and time to recovery arrays
 *  
 * @param  {array|matrix} x    asset/portfolio matrix of equity time series with the oldest value in x[0] and the last one in x[N-1]
 * @param  {string} mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param  {number} dim dimension 0: row, 1: column (def: 1)
 * @return {object|matrix}  .dd (drawdown array)
 *                          .ddrecov (drawdown recovery index)
 *                          .maxdd (max drawdown)
 *                          .maxddrecov (max drawdown recovery period): [start period, end period]
 *
 * @example
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * var xx = $u.cumprod($u.plus(x,1));
 * var yy = $u.cumprod($u.plus(y,1));
 * var zz = ubique.cat(1,xx,yy);
 *
 * ubique.drawdown(xx);
 * // { dd: [ 0, 0, 0, 0.00900000000000004, 0, 0, 0, 0, 0.013999999999999995, 0 ],
 * //   ddrecov: [ 0, 0, 0, 4, 0, 0, 0, 0, 9, 0 ],
 * //   maxdd: 0.013999999999999995,
 * //   maxddrecov: [ 8, 9 ] }
 *
 * ubique.drawdown(zz);
 * // [ [ { dd: [Object],
 * //     ddrecov: [Object],
 * //     maxdd: 0.013999999999999995,
 * //     maxddrecov: [Object] },
 * //   { dd: [Object],
 * //     ddrecov: [Object],
 * //     maxdd: 0.1092809191007261,
 * //     maxddrecov: [Object] } ] ]
 */
 $u.drawdown = function(x,mode,dim) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }
  if (arguments.length === 1) {
    mode = 'return';
    dim = 1;
  }
  if (arguments.length === 2) {
    dim = 1;
  }
  var ddown = function(a,mode) {
    if (mode === 'return') {
      _a = a;
    } else
    if (mode === 'geometric') {
      _a = $u.log(a);
    } else {
      throw new Error('unknown drawdown mode');
    }
    var highest = _a[0],
    highestidx = 1,
    _dd = $u.array(_a.length,0),
    _recov = $u.array(_a.length,0),
    _maxdd = 0,
    _maxddidx = [1,_a.length],
    _cdd = [],
    t = 0;
    _cdd[t] = 0;
    for (var i = 0; i < _a.length; i++) {
      if (highest <= _a[i]) {
        highest = _a[i];
        highestidx = i + 1;
      }
      if (mode === 'return') {
        _dd[i] = (highest - _a[i]) / highest;
      } else 
      if (mode === 'geometric') {
        _dd[i] = (highest - _a[i]);
      }
      if (_dd[i] !== 0) {
        _recov[i] = i + 1;
      }
      if (_dd[i] > _maxdd) {
        _maxdd = _dd[i];
        _maxddidx[0] = highestidx;
        _maxddidx[1] = i + 1;
      }
    }
    return {dd: _dd, ddrecov: _recov, maxdd: _maxdd, maxddrecov: _maxddidx};
  }
  if ($u.isnumber(x)) {
    return 0;
  }
  if ($u.isarray(x)) {
    return ddown(x,mode);
  }
  return $u.vectorfun(x,function(val){return ddown(val,mode);},dim);
}

}