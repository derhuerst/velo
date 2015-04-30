# API Documentation for [`core`](src/core)



## [`helpers`](src/core/01-helpers.js)

`helpers` contains a collection of useful functions.


### Properties

#### *inaccessible* `noop(…)`

_This method is only accessible for modules velo has been built with._

A do-nothing function used as a default callback.

#### *inaccessible* `hasProp(…)`

_This method is only accessible for modules velo has been built with._

reference to [`hasOwnProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).

#### *inaccessible* `inherit(child, parent)`

_This method is only accessible for modules velo has been built with._

Let the child child "class" inherit from the parent "class". [Taken from the CoffeeScript project](http://techoctave.com/c7/posts/93-simple-javascript-inheritance-using-coffeescript-extends).

#### *inaccessible* `extend(target, source)`

_This method is only accessible for modules velo has been built with._

Extend the `target` object by the keys and values of the `source` object. [Stolen from the zepto.js project](https://github.com/madrobby/zepto/blob/1d94d92223a5ec2edf1fbe18a7a9cc717e7663e4/src/zepto.js#L223), then customized.

#### *public* `array.add(array, item)`

Add `item` to `array if it isn't alerady stored.

#### *public* `list.remove(item)`

Remove the first entry for `item` from `array`.

#### *public* `list.has(item)`

Return wether `item` exists in `array`.

#### *public* `list.call(method, …)`

Call `method` by name with all following arguments on every item in `array`.



## [`Vector`](src/core/02-Vector.js)

`Vector` represents a 2D vector. It is used as a position or translation.


### `new velo.Vector(x, y)` or `velo.v(x, y)`

Create a new Vector by `x` and `y`.

#### `x`

The x property, which can be changed without hassle. _default: `0`_

#### `y`

The y property, which can be changed without hassle. _default: `0`_


### Properties

#### *public* `vector.x`

The x property, which can be changed without hassle.


#### *public* `vector.y`

The y property, which can be changed without hassle.


### Methods

#### *public* `vector.add(x, y)`

Change the `x` and `y` values relatively. Either one `Vector` object or two raw values can be passed.

#### *public* `vector.rotate(angle)`

Apply a rotation of `angle` to the `x` and `y` values.

#### *public* `vector.equals(x, y)`

Check if the `x` and `y` values of this vector are equal to given ones. Either one `Vector` object or two values can be passed.

#### *public* `vector.clone()`

Return a new `Vector` object with the same values. The returned vector then `equals` to this one.



## [`Node`](src/core/04-Node.js)

`Node` is a base class for everything that will be rendered. Every `Node` object has a `parent`, `position`, `rotation` and can store child nodes in `children`.

*velo* works with a tree of nodes, each of which has a position and a rotation relative to its parent node. Whenever the user changes a node's `parent`, (relative) position or (relative) `rotation`, `_update` recomputes the (absolute) position and rotation. `Shape` objects inheriting from `Node` can then draw onto the untranslated and unrotated canvas using `_absolute`. This way, rendering will be fast, because the transformations do not have to be recomputed on each render cycle.


### `new velo.Node(options)` or `velo.n(options)`

Create a new `Node` based on `options`.

#### `options.parent`

The parent `Node` object. _default: `null`_

#### `options.position`

The position relative to the node's parent as a `Vector` object. _default: `velo.v()`_

#### `options.rotation`

The rotation relative to the node's parent in radians. _default: `0`_

#### `options.children`

The list of child nodes.


### Properties

#### *public* `node.children`

The list of child nodes.

#### *private* `node._root`

The root of the tree.

#### *private* `node._parent`

The parent `Node` object. Set using `node.parent(…)`.

#### *private* `node._position`

The position relative to the node's parent as a `Vector` object. Set using `node.postion(…)`.

#### *private* `node._rotation`

The rotation relative to the node's parent in radians. Set using `node.rotation(…)`.


### Methods

#### *public* `node.parent(node)`

With no arguments, get the node's parent node. Otherwise, set the node's parent to `Node` and recompute the the absolute translation.

#### *public* `node.position(vector, relative)`

With no arguments, get the node's position. Otherwise change the position and recompute the the absolute translation.

If `relative` is `true`, translate position by `vector`. Otherwise, set the position to `vector`.

#### *public* `node.rotation(angle)`

With no arguments, get the node's rotation. Otherwise, set the rotation to `angle` and recompute the the absolute translation.

#### *private* `node._update()`

Recompute the absolute translations in `_absolute` and `_update` all children.

**Note**: This node's rotation doesn't affect its rotation, but its drawing and children.

#### *private* `node._absolute()`

Helper function to compute a node's absolute position based on

- this node's (relative) position,
- the parent node's (absolute) position,
- the parent node's (absolute) rotation.



## [`Canvas`](src/core/05-Canvas.js)

`Canvas` manages the canvas element and the RenderingContext2d. It is the root of the scene graph.


### `new velo.Canvas(element)` or `velo.c(element)`

_`Canvas` inherits from **`Node`**._

Create a new `Canvas` object using `element`.

#### `element`

The canvas DOM node (`HTMLCanvasElement`).


### Properties

#### *public* `canvas.element`

The canvas DOM node (`HTMLCanvasElement`).

#### *public* `canvas.context`

The rendering context (`RenderingContext2d`).


### Methods

#### *public* `canvas.clear()`

Clear the canvas.

#### *public* `canvas.draw()`

Clear the canvas and draw all children draw to it.



## [`Shape`](src/core/06-Shape.js)

`Shape` is a base class providing `fillColor`, `strokeColor` and `lineWidth`.


### `new velo.shape(options)` or `velo.sh(options)`

_`Canvas` inherits from **`Node`**._

Create a new `Shape` based on `options`.

#### `options.fillColor`

The color the shape will be filled with. Can be any valid CSS color. _default: `'gray'`_

#### `options.strokeColor`

The color the shape will be bordered with. Can be any valid CSS color. _default: `'black'`_

#### `options.lineWidth`

The width of the border. _default: `1`_


### Properties

#### *public* `fillColor`

The color the shape will be filled with. Can be any valid CSS color.

#### *public* `strokeColor`

The color the shape will be bordered with. Can be any valid CSS color.

#### *public* `lineWidth`

The width of the border.


### Methods

#### *public* `shape.draw()`

Prepare drawing the shape by changing the colors of the rendering context.