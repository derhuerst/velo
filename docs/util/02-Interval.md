# [`util/Interval`](../../src/util/02-Interval.js)

`Interval` is a helper for calling [`callback`](01-RenderingInterval.md#public-callback) every [`interval`](#public-interval) milliseconds.

**`Interval` inherits properties and methods from [`RenderingInterval`](01-RenderingInterval.md).**



## Usage

```javascript
var node = …   // Create a `Node` object.

function callback(){
	node.position.add(10);   // Offset `node`'s `position` by `10`…
}
// …every 2 seconds (`2000` milliseconds).
velo.i(callback, 2000).start();
```



## Shorthand `i`

```javascript
velo.inherit(velo.Interval).init(…);   // complicated way
velo.i(…);   // shorthand
```



## *constructor* `init( callback, interval )`

Set up an `Interval` that calls [`callback`](01-RenderingInterval.md#public-callback) every [`interval`](#public-interval) milliseconds when [`running()`](01-RenderingInterval.md#public-running-).



## *public* `interval`

The time between the calls of [`callback`](01-RenderingInterval.md#public-callback) in milliseconds.



## *private* `_q()`

Request the next call to [`callback`](#public-callback) using [`setTimeout`](https://developer.mozilla.org/de/docs/Web/API/Window/setTimeout).