## [`core/Shape`](../../src/core/05-Shape.js)

`Shape` is a base class providing [`fillColor`](#public-fillcolor), [`strokeColor`](#public-strokecolor) and [`lineWidth`](#public-linewidth).

**`Shape` inherits properties and methods from [`Node`](03-Node.md).**



## Usage

In opposition to classes inheriting from it, `Shape` is not supposed to be used directly.



## Shorthand

`Shape` has no shorthand.



## *constructor* `init( options )`

Create a new `Shape` based on `options`. `options` may contain the following keys.

| Key | Default | Description |
| - | - | - |
| [`fillColor`](#public-fillcolor) | `'gray'` | The color the shape will be filled with. |
| [`strokeColor`](#public-strokecolor) | `'black'` | The color the shape's border will be drawn with. |
| [`lineWidth`](#public-linewidth) | `1` | The width of shape's the border. |



## *public* `fillColor`

[Any valid CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) the shape will be filled with. Default is `'gray'`.



## *public* `strokeColor`

[Any valid CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) the shape's border will be drawn with. Default is `'black'`.



## *public* `lineWidth`

The width of shape's the border. Default is `0`.

Read more about [`CanvasRenderingContext2D.lineWidth`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth).



## *public* `draw()`

Prepare drawing the shape by setting the colors of the [canvas rendering context](04-Canvas.md#public-context).