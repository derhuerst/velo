# [`core/helpers`](../../src/core/01-helpers.js)

`helpers` contains a collection of helper functions. They are used internally but get `export`ed as well.



## `noop()`

A do-nothing function used as a default callback.



## `inherit( object )`

Proxy for `Object.create`. Create a new inherited object from another object. See [`Object.create()` on MDN](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/create) and [JS Objects: De"construct"ion](http://davidwalsh.name/javascript-objects-deconstruction#simpler-object-object) for more.



## `round( value )`

Proxy for `Math.round`.



## `extend( target, source )`

Extend the `target` object by the keys and values of the `source` object.
Stolen [from the zepto.js project](https://github.com/madrobby/zepto/blob/1d94d92223a5ec2edf1fbe18a7a9cc717e7663e4/src/zepto.js#L223) and customized.



## `array`

`Array` helpers.


### `array.add( arr, item )`

Add `item` to the array `arr` if it isn't stored yet.


### `array.remove( arr, item )`

Remove the first entry for `item` from the array `arr`.


### `array.has( arr, item )`

Return wether `item` exists in the array `arr`.


### `array.foreach( arr, method, … )`

For every item in the array `arr` call `item[method]` with all following arguments.


### `array.slice( arr, i, j )`

Proxy for [`Array.prototype.slice`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). Requires an array `arr` as an argument.