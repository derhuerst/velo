# [`core/Vector`](../../src/core/02-Vector.js)

`Vector` represents a 2D vector. It is used as a position or translation.



## Usage

```javascript
var vector1 = velo.v(5, 0);   // x: 5, y: 0
var vector2 = velo.v(5, 5);   // x: 5, y: 5

vector1.rotate(Math.PI/2);   // x: 0, y: 5
vector2.add(vector1);   // x: 5, y: 10

vector1.equals(vector2);   // false
vector2.equals(vector2.clone());   // true
```



## Shorthand `v`

```javascript
velo.inherit(velo.Vector).init(5, 0);   // complicated way
velo.v(5, 0);   // shorthand
```



## *constructor* `init( x, y )`

Create a new Vector by [`x`](#public-x) and [`y`](#public-y).



## *public* `x`

The x property, which can be changed without hassle. Default is `0`.



## *public* `y`

The y property, which can be changed without hassle. Default is `0`.



## *public* `reset()`

Set [`x`](#public-x) and [`y`](#public-y) to `0`.



## *public* `add( vector )` or `add( x, y )`

Add to the vector. Either one `Vector` object or two raw values [`x`](#public-x) and [`y`](#public-y) can be passed.



## *public* `rotate( angle )`

Apply a rotation of `angle` around `(0|0)` to the [`x`](#public-x) and [`y`](#public-y) values.



## *public* `equals( vector )` or `equals( x, y )`

Check if this vector equals the given `Vector` object or raw values.



## *public* `clone()`

Return a new `Vector` object with the same values. The resulting vector is then [`equal()`](#public-equals-vector--or-equals-x-y-) to this one.