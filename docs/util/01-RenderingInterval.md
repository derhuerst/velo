# [`util/RenderingInterval`](../../src/util/01-RenderingInterval.js)

`RenderingInterval` is a special interval used for rendering. It leverages the [browser's `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to be FPS- and battery-friendly.



## Usage

```javascript
var game = …   // Create a `Canvas` object.

function render(){
	game.clear();
	game.draw();
}
// Create the `RenderingInterval` and start it immeadiatly.
velo.ri(render).start();
```



## Shorthand `ri`

```javascript
velo.inherit(velo.RenderingInterval).init(…);   // complicated way
velo.ri(…);   // shorthand
```



## *constructor* `init( callback )`

Initialize a new `RenderingInterval` that calls [`callback`](#public-callback) when [`running()`](#public-running--).



## *public* `callback`

A reference to the callback to be called regularly.



## *public* `running()`

Return if the interval is running.



## *public* `start()`

Start the interval, calling [`_q()`](#private-_q--) and setting [`_r`](#private-_r) to `true`.



## *public* `stop()`

Stop the interval, setting [`_r`](#private-_r) to `false`.



## *private* `_c()`

Call the actual [`callback`](#public-callback).



## *private* `_q()`

Request the next call to [`callback`](#public-callback) using [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).