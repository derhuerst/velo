// velo | Jannis R | v0.2.0 | https://github.com/derhuerst/velo





!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.velo=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// core/helpers
// `helpers` contains a collection of internal helper functions.



// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode for more.
"strict mode";



// A do-nothing function used as default callback.
var noop = exports.noop = function () {};



// Just a proxy for shorter code.
var inherit = exports.inherit = Object.create;



// Extend the `target` object by the keys and values of the `source` object.
// Stolen from the zepto.js project (https://github.com/madrobby/zepto/blob/1d94d92223a5ec2edf1fbe18a7a9cc717e7663e4/src/zepto.js#L223) and customized.
var extend = function (target, source) {
	for (key in source) {
		if (source[key] !== undefined)
			target[key] = source[key];
	}
	return target
};



// `Array` helpers
var array = exports.array = {

	// Add `item` to the array `arr` if it isn't alerady stored.
	add: function (arr, item) {
		if (!array.has(arr, item))
			arr.push(item);
	},

	// Remove the first entry for `item` from the array `arr`.
	remove: function (arr, item, i) {
		if (i = arr.indexOf(item) >= 0)
			arr.splice(i, 1);
	},

	// Return wether `item` exists in the array `arr`.
	has: function (arr, item) {
		return arr.indexOf(item) >= 0;
	},

	// For every item in the array `arr` call `item[method]` with all following arguments.
	foreach: function (arr, method, i, length) {
		arguments = array.slice(arr, 2);
		for (i = 0, length = arr.length; i < length; i++) {
			if (arr[i])
				arr[i][method].apply(arr[i], arguments);
		}
	},

	// Proxy for `Array.prototype.slice`. Requires an array `arr` as an argument.
	slice: function (arr, i, j) {
		return Array.prototype.slice.call(arr, i, j);
	}

};

// core/Vector



// `Vector` represents a 2D vector. It can be used as a position or translation.
var Vector = exports.Vector = {



	init: function (x, y){
		this.x = x || 0;
		this.y = y || 0;

		return this;   // method chaining
	},



	// Change the `x` and `y` values relatively. Either one `Vector` object or two raw values can be passed.
	add: function (x, y) {
		if (y !== null) {   // assuming two raw values
			this.x += x;
			this.y += y;
		} else if (x !== null) {   // assuming one `Vector` object
			this.x += x.x;
			this.y += y.y;
		}

		return this;   // method chaining
	},



	// Apply a rotation of `angle` around `(0|0)` to the `x` and `y` values.
	rotate: function (angle) {
		this.x = Math.cos(angle) * x;
		this.y = Math.sin(angle) * y;

		return this;   // method chaining
	},



	// Check if the `x` and `y` values of this `Vector` are equal to given ones. Either one `Vector` object or two raw values can be passed.
	equals: function (x, y) {
		if (y !== null)   // assuming two raw values
			return this.x === x.x && this.y === x.y;
		else   // assuming one `Vector` object
			return this.x === x && this.y === y;
	},



	// Return a new `Vector` object with the same values. The resulting vector is then `equal()` to this one.
	clone: function () {
		return v(this.x, this.y);
	}



};



// Export a shorthand.
var v = exports.v = function (x, y) {
	return inherit(Vector)
	.init(x, y);
};

// core/Node



// `Node` is a base class for everything that will be rendered. Every `Node` object has a `parent`, `position`, `rotation` and can store any number of child `Node`s in `children`.
var Node = exports.Node = {



	init: function (options) {
		options = options || {};

		// The parent `Node` object. Default: `null`
		this._parent = options.parent || null;
		// The position as a `Vector` object (relative to the node's parent). Default: `new Vector()`
		this._position = options.position || v();
		// The rotation in radians (relative to the node's parent). Default: `0`
		this._rotation = options.rotation || 0;
		// The list of child nodes.
		this.children = new Array(options.children);

		this._update();   // recompute the the absolute position

		return this;   // method chaining
	},



	// Getter/Setter: If a `node` is given, set it as this `Node`'s parent and call `_update()` to recompute the the absolute position. Otherwise return the current parent.
	parent: function (node) {
		if (node) {
			this._parent = node;
			this._root = node._root;
			this._update();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._parent;
	},



	// Getter Setter: If a `vector` is given, change this `Node`'s position and call `_update()` to recompute the the absolute position. Otherwise return the current position.
	// If `relative` is `true`, translate the position by `vector`. Otherwise, set the position to `vector` (without making a copy!).
	position: function (vector, relative) {
		if (vector) {
			if (relative === true)
				this._position.add(vector);
			else
				this._position = vector;
			this._update();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._position;
	},



	// Getter Setter: If an `angle` is given, change this `Node`'s rotation and call `_update()` to recompute the the absolute position. Otherwise return the current rotation.
	// If `relative` is `true`, add `angle` to the current rotation. Otherwise, set the rotation to `angle`.
	rotation: function (angle, relative) {
		if (angle !== null) {
			if (relative === true)
				this._rotation += angle;
			else
				this._rotation = angle;
			this._update();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._position;
	},



	// Recompute the node's absolute position and store it in `_absolute` and call `_update()` on all children.
	// Important: This node's rotation is applied *after* the position, so it won't affect this node's position, but that of its children.
	_update: function () {
		var thus = this;
		var parent = thus._parent;   // just an proxy

		thus._absRotation = thus._rotation;
		if (parent){
			thus._absPosition = thus._absolute(thus._position, parent._absPosition, parent._absRotation);
			thus._absRotation += parent._absRotation;
		} else
			thus._absPosition = thus._position.clone();

		// call `_update()` on all child nodes
		array.foreach(this.children, '_update');
	},



	// A dumb helper function to compute a node's *absolute* position based on
	// - its position,
	// - the parent node's *absolute* position,
	// - the parent node's *absolute* rotation.
	_absolute: function (position, parentAbsolutePosition, parentAbsoluteRotation) {
		return position
		.clone()
		.rotate(parentAbsoluteRotation)
		.add(parentAbsolutePosition);
	}



};



// Export a shorthand.
var n = exports.n = function (options) {
	return inherit(Node)
	.init(options);
};

// core/Canvas



// `Canvas` manages the canvas element and the RenderingContext2d. It is the root of the scene graph.
var Canvas = exports.Canvas = extend(inherit(Node), {



	init: function (element) {
		Node.init.call(this);

		// A user might want to access the `_root` property, even if this is the root node.
		this._root = this;

		// The canvas DOM node (`HTMLCanvasElement`).
		if (!element)
			throw new Error('No HTMLCanvasElement given.');
		this.element = element;
		// The rendering context (`RenderingContext2d`).
		this.context = element.getContext('2d');

		return this;   // method chaining
	},



	// Clear the canvas.
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},



	// Draw all children draw to the canvas. Remember to call `clear` before.
	draw: function () {
		array.foreach(this.children, 'draw');
	}



});



// Export a shorthand.
var c = exports.c = function (element) {
	return inherit(Canvas)
	.init(element);
};

// shapes/Shape



// `Shape` is a base class providing `fillColor`, `strokeColor` and `lineWidth`.
var Shape = exports.Shape = extend(inherit(Node), {



	init: function (options) {
		options = options || {};

		Node.init.call(this, options);

		// The color the shape will be filled with. Can be any valid CSS color.
		this.fillColor = options.fillColor || 'gray';
		// The color the shape will be bordered with. Can be any valid CSS color.
		this.strokeColor = options.strokeColor || 'black';
		// The width of the border.
		this.lineWidth = options.lineWidth !== null ? options.lineWidth : 1;

		return this;   // method chaining
	},


	// Prepare drawing the shape by changing the colors of the canvas rendering context.
	draw: function () {
		var context = this._root.context;   // proxy

		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.lineWidth = this.lineWidth;
	}



});



// Export a shorthand.
var c = exports.c = function (element) {
	return inherit(Canvas)
	.init(element);
};

// 02-util/01-RenderingInterval



// todo: description
var RenderingInterval = exports.RenderingInterval = {



	init: function (callback) {
		this.callback = callback || noop;
		this.stop();

		return this;   // method chaining
	},



	start: function () {
		this.running = true;
		this._queue();
		return this;
	},



	stop: function () {
		this.running = false;
		return this;
	},



	_call: function () {
		if(!this.running)
			return;
		this.callback();
		this._queue();
	},


	_queue: function () {
		requestAnimationFrame(this._call.bind(this));
	}



};



// Export a shorthand.
var ri = exports.ri = function (callback) {
	return inherit(RenderingInterval)
	.init(callback);
};

// 02-util/02-Interval



// todo: description
var Interval = exports.Interval = extend(inherit(RenderingInterval), {



	init: function (callback, interval) {
		RenderingInterval.call(this, callback);

		this.interval = interval;
	},



	_queue: function () {
		setTimeout(this._call.bind(this), this.interval);
	}



});



// Export a shorthand.
var i = exports.i = function (callback, interval) {
	return inherit(Interval)
	.init(callback, interval);
};

// shapes/Spot



// `Spot` is a point in the visual sense: It is rendered as a small colored circle.
var Spot = exports.Spot = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(this, options);

		// The size of the rendered dot.
		this.size = options.size !== null ? options.size : 2;

		return this;   // method chaining
	},



	// Draw a little dot to the canvas.
	draw: function () {
		// proxies
		var thus = this,
		context = thus._root.context,
		position = thus._absPosition,
		size = thus.size|0;   // `|0` is equivalent to `Math.floor(…)`

		Shape.draw.call(thus);   // prepare drawing

		context.fillRect(position.x|0, position.y|0, size, size);
		if (thus.lineWidth > 0)
			context.strokeRect(position.x|0, position.y|0, size, size);
	}



});



// Export a shorthand.
var s = exports.s = function (options) {
	return inherit(Spot)
	.init(options);
};

// shapes/Polygon



// A `Polygon` is a `Shape` bounded by a list of vertix nodes.
var Polygon = exports.Polygon = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(options);    // call the super class constructor

		// The list of vertex nodes the polygon exists of.
		// User might want to access the list of vertex, which is why `_vertices` is aliased as `vertices`. `draw` uses `_vertices` to play nice with `Rectangle` and `Square` (both inheriting from `Polygon`).
		this._vertices = this.vertices = new Array(options.vertices);

		return this;   // method chaining
	},



	// Draw the polygon to the canvas.
	draw: function () {
		// proxies
		var thus = this,
		context = thus._root.context,
		vertices = thus._vertices;

		// prepare drawing
		Shape.draw.call(thus);
		context.beginPath();

		for (var vertex, i = 0, length = vertices.length; i < length; i++) {
			vertex = thus._absolute(vertices[i], thus._absPosition, thus._absRotation);
			context[i === 0 ? 'moveto' : 'lineTo'](vertex.x|0, vertex.y|0);
		}

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();
	}



});



// Export a shorthand.
var p = exports.p = function (options) {
	return inherit(Polygon)
	.init(options);
};

// shapes/Rectangle



// Yeah, a `Reactangle` is a rectangle.
var Rectangle = exports.Rectangle = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};

		Polygon.init.call(this, options);

		// The rectangle's width. Pretty obvious.
		this._width = options.width !== null ? options.width : 60;
		// The rectangle's height. Pretty obvious.
		this._height = options.height !== null ? options.height : 40;

		// `Polygon` exposes `vertices`, an alias to `_vertices`, intended to be a straightforward way to manipulate the path. However, because `Rectangle` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Rectangle`, leaving only the `_vertices` intended for private use.
		delete this.vertices;

		return this;   // method chaining
	},



	// Getter Setter: If a `width` is given, change it on this `Rectangle` and call `_update()` to recalculate the `vertices` array. Otherwise return the current `_width`.
	width: function (width) {
		if (width !== null) {
			this._width = width;
			this._update();
			return this;   // method chaining
		} else
			return this._width;   // method chaining
	},



	// Getter Setter: If a `height` is given, change it on this `Rectangle` and call `_update()` to recalculate the `vertices` array. Otherwise return the current `_height`.
	height: function (height) {
		if (height !== null) {
			this._height = height;
			this._update();
			return this;   // method chaining
		} else
			return this._height;   // method chaining
	},



	// Recalculate the `vertices` array.
	_update: function () {
		var thus = this;   // alias for shorter code

		thus._vertices = [
			new Vector(0, 0),
			new Vector(thus.width, 0),
			new Vector(thus.width, thus.height),
			new Vector(0, thus.height)
		];

		Node._update.call(thus);   // let `Node._update` call the children.
	}



});



// Export a shorthand.
var r = exports.r = function (options) {
	return inherit(Rectangle)
	.init(options);
};

// shapes/Ellipse



// `Ellipse` is a ellipse, drawn around its `position`.
var Ellipse = exports.Ellipse = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(this, options);

		// the ellipse's width, pretty obvious
		this.width = options.width !== null ? options.width : 60;
		// the ellipse's height, pretty obvious
		this.height = options.height !== null ? options.height : 40;

		return this;   // method chaining
	},



	// Draw the ellipse to the canvas.
	draw: function () {
		// aliases for shorter code
		var thus = this,
		context = thus._root.context;

		// Prepare drawing.
		context.save();
		Shape.draw.call(thus);
		context.translate(thus._absPosition|0);
		context.rotate(thus._absRotation);
		context.scale(1, thus.height / thus.width);   // todo: Use `|0` here?
		context.beginPath();

		context.arc(0, 0, thus.width / 2|0, 0, Math.PI * 2);   // todo: Use `|0` here?

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();
		context.restore();
	}



});



// Export a shorthand.
var e = exports.e = function (options) {
	return inherit(Ellipse)
	.init(options);
};

// shapes/Square



// Yeah, a `Square` is a square.
var Square = exports.Square = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};

		Polygon.init.call(this, options);

		// The square's width and height. Pretty obvious.
		this.size = options.size !== null ? options.size : 2;

		// `Polygon` exposes `vertices`, an alias to `_vertices`, intended to be a straightforward way to manipulate the path. However, because `Square` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Square`, leaving only the `_vertices` intended for private use.
		delete this.vertices;

		return this;   // method chaining
	},


	// Recompose the `vertices` list.
	_update: function () {
		var thus = this;    // alias for shorter code

		thus._vertices = [
			exports.v(0, 0),
			exports.v(thus.size, 0),
			exports.v(thus.size, thus.size),
			exports.v(0, thus.size)
		];

		Node._update.call(this);    // Update the rest.
	}



});



// Export a shorthand.
var sq = exports.sq = function (options) {
	return inherit(Square)
	.init(options);
};

// shapes/Circle



// Yeah, a `Circle` is a circle, drawn around its `position`.
var Circle = exports.Circle = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

			Shape.init.call(this, options);

		// The circle's radius. Pretty obvious.
		this.radius = options.radius !== null ? options.radius : 50;

		return this;   // method chaining
	},


	// Draw the circle to the canvas.
	draw: function () {
		// aliases for shorter code
		var thus = this,
		context = thus._root.context;

		// Prepare drawing.
		Shape.draw.call(thus);
		context.beginPath();

		context.arc(0, 0, thus.radius|0, 0, Math.PI * 2);    // todo: Use `|0` here?

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();
	}



});



// Export a shorthand.
var cl = exports.cl = function (options) {
	return inherit(Circle)
	.init(options);
};
},{}]},{},[1])(1)
});