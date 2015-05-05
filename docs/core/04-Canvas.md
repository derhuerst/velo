# [`core/Canvas`](../../src/core/04-Canvas.js)

`Canvas` manages the [canvas element](#public-element) and the [rendering context](#public-context). It is the [root](03-Node.md#private-_rn) of [the scene graph](../intro.md#the-scene-graph).

**`Canvas` inherits properties and methods from [`Node`](03-Node.md).**



## Usage

```javascript
var canvas = velo.c(domElement);

// add stuff here…

canvas.draw();
```



## Shorthand `c`

```javascript
canvas1 = velo.inherit(velo.Canvas).init({…});   // complicated way
canvas2 = velo.c({…});   // shorthand
```



## *constructor* `init( element )`

Create a new `Canvas` using `element`. `element` must be a DOM node ([`HTMLCanvasElement`](https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement)).



## *public* `element`

A reference to the DOM node ([`HTMLCanvasElement`](https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement)).



## *public* `context`

The rendering context ([`CanvasRenderingContext2D`](https://developer.mozilla.org/de/docs/Web/API/CanvasRenderingContext2D)).



## *public* `clear()`

Clear the [canvas](#public-element).



## *public* `draw()`

Draw all children draw to the [canvas](#public-element). Remember to call [`clear`](#public-clear) before.



## *private* `_rn`

A user might want to use the `_rn` property, even if a `Canvas` is the root node of [the scene graph](../intro.md#the-scene-graph). See [`Node._rn`](03-Node.md#private-_rn). That's why `_rn` points to itself, the `Canvas` object.