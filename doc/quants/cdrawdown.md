### cdrawdown

Continuous Drawdown


#### Syntax

ubique.cdrawdown(x,dim)


#### Description

Continuous Drawdown  



#### Arguments

|Params|Type|Description
|---------|----|-----------
|`x` | array/matrix | asset/portfolio returns
|`dim` | number | dimension 0: row, 1: column (def: 0)


#### Examples

```js
var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];

ubique.cdrawdown(x);
// [ 0.009, 0.014 ]

ubique.cdrawdown(ubique.cat(0,x,y));
// [ [ 0.009, 0.014 ], [ 0.005, 0.095743, 0.068971 ] ]
```

