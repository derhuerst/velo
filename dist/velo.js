// velo | Jannis R | v0.2.0 | https://github.com/derhuerst/velo





(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.velo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// `helpers` contains a collection of helper functions. They are used internally but get `export`ed as well.



// EcmaScript 5 strict mode. Because all modules get concatenated, this applies to all of them.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode for more about ES5 strict mode.
"strict mode";



// A do-nothing function used as default callback.
var noop = exports.noop = function () {};



// Proxy for `Object.create`. Create a new inherited object from another object. See https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/create and http://davidwalsh.name/javascript-objects-deconstruction#simpler-object-object for more.
var inherit = exports.inherit = Object.create;



// Proxy for `Math.round`.
var round = Math.round;



// Extend the `target` object by the keys and values of the `source` object.
// Stolen from the zepto.js project (https://github.com/madrobby/zepto/blob/1d94d92223a5ec2edf1fbe18a7a9cc717e7663e4/src/zepto.js#L223) and customized.
var extend = function (target, source) {
	for (key in source) {
		if (source[key] !== undefined)
			target[key] = source[key];
	}
	return target
};



// `Array` helpers.
var array = exports.array = {

	// Add `item` to the array `arr` if it isn't stored yet.
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



// `Vector` represents a 2D vector. It can be used as a position or translation.
var Vector = exports.Vector = {



	// Initialize the vector. `x` and `y` are `0` by default.
	init: function (x, y){
		this.x = x || 0;
		this.y = y || 0;

		return this;   // method chaining
	},



	// Set `x` and `y` to `0`.
	reset: function () {
		this.x = this.y = 0;

		return this;   // method chaining
	},



	// Add to the vector. Either one `Vector` object or two raw values `x` and `y` can be passed.
	add: function (x, y) {
		if (arguments.length >= 2) {   // assuming two raw values
			this.x += x;
			this.y += y;
		} else if (arguments.length === 1 && arguments[0]) {   // assuming one `Vector` object
			this.x += x.x;
			this.y += x.y;
		}

		return this;   // method chaining
	},



	// Apply a rotation of `angle` around `(0|0)` to the `x` and `y` values.
	rotate: function (angle) {
		if (angle !== 0){
			// proxies
			var x = this.x;
			var y = this.y;

			this.x = x * Math.cos(angle) - y * Math.sin(angle);
			this.y = x * Math.sin(angle) + y * Math.cos(angle);
		}

		return this;   // method chaining
	},



	// Check if this vector equals the given `Vector` object or raw values.
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



// `Node` is a base class for everything that will be rendered. Every `Node` object has a `parent`, `position`, `rotation` and can store any number of child `Node`s in `children`. Read more about how *velo* works: https://github.com/derhuerst/velo/blob/master/docs/intro.md#the-scene-graph
var Node = exports.Node = {



	// Create a new `Node` based on `options`. `options` is an object that may contain the following keys.
	// - `parent`: The parent `Node` object. Default: `null`
	// - `position`: The position as a `Vector` object (relative to the node's parent). Default: `velo.v()`
	// - `rotation`: The rotation in radians (relative to the node's parent). Default: `0`
	// - `children`: The list of child nodes. Default: `[]`
	init: function (options) {
		options = options || {};
		var thus = this;   // proxy

		thus.parent(options.parent);
		thus._p = options.position || v();
		thus._r = options.rotation || 0;
		thus.children = new Array(options.children || 0);

		thus._aP = v(0, 0);   // cached absolute position
		thus._aR = 0;   // cached absolute rotation
		thus._u();   // recompute the absolute values

		return thus;   // method chaining
	},



	// Getter/Setter: If a `node` is given, set it as this node's parent and call `_u()` to recompute the absolute values (`_aP` and `_aR`). Otherwise return the current parent node.
	parent: function (node) {
		if (node) {
			this._pn = node;
			this._rn = node._rn;
			this._u();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._pn;
	},



	// Getter Setter: If a `vector` is given, change this node's position and call `_u()` to recompute the absolute values (`_aP` and `_aR`). Otherwise return the current position.
	// If `relative` is `true`, *translate* the position by `vector`. Otherwise, *set* the position to `vector` (without making a copy!).
	position: function (vector, relative) {
		if (vector) {
			if (relative === true)
				this._p.add(vector);
			else
				this._p = vector;
			this._u();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._p;
	},



	// Getter Setter: If an `angle` is given, change this node's rotation and call `_u()` to recompute the absolute values (`_aP` and `_aR`). Otherwise return the current rotation.
	// If `relative` is `true`, *add* `angle` to the current rotation. Otherwise, *set* the rotation to `angle`.
	rotation: function (angle, relative) {
		if (angle || angle === 0) {
			if (relative === true)
				this._r += angle;
			else
				this._r = angle;
			this._u();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._r;
	},



	// Recompute the node's absolute values (`_aP` and `_aR`), then call `_u()` on all children.
	// Important: A node's rotation is applied *after* applying its position, so it will only affect the position of its children.
	_u: function () {
		var thus = this;   // just a proxy

		if (!thus._pn || !thus._p) return;

		thus._aP = thus._p.clone().rotate(thus._pn._aR).add(thus._pn._aP);
		thus._aR = thus._pn._aR + thus._r;

		// call `_u()` on all child nodes
		array.foreach(thus.children, '_u');
	}



};



// Export a shorthand.
var n = exports.n = function (options) {
	return inherit(Node)
	.init(options);
};



// `Canvas` manages the canvas element and the RenderingContext2d. It is the root of the scene graph.
var Canvas = exports.Canvas = extend(inherit(Node), {


	// Create a new `Vancas` using `element`. `element` must be a DOM node (`HTMLCanvasElement`).
	init: function (element) {
		Node.init.call(this);

		// A user might want to use the `_rn` property, even if a `Canvas` is the root node of the scene graph. See `Node._rn`.
		this._rn = this;

		// The DOM node (`HTMLCanvasElement`).
		if (!element)
			throw new Error('No HTMLCanvasElement given.');
		this.element = element;
		// The rendering context (`CanvasRenderingContext2d`).
		this.context = element.getContext('2d');

		return this;   // method chaining
	},



	// Clear the canvas.
	clear: function () {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
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



// `Shape` is a base class providing `fillColor`, `strokeColor` and `lineWidth`.
var Shape = exports.Shape = extend(inherit(Node), {



	init: function (options) {
		options = options || {};
		var thus = this;   // proxy

		Node.init.call(thus, options);

		// The color the shape will be filled with. Can be any valid CSS color. Default is `gray`.
		thus.fillColor = options.fillColor || 'gray';
		// The color the shape will be bordered with. Can be any valid CSS color. Default is `black`.
		thus.strokeColor = options.strokeColor || 'black';
		// The width of the border. Default is `0`.
		thus.lineWidth = (options.lineWidth === 0) ? 0 : options.lineWidth || 0;

		return thus;   // method chaining
	},


	// Prepare drawing the shape by changing the colors of the canvas rendering context.
	draw: function () {
		var context = this._rn.context;   // proxy

		context.fillStyle = this.fillColor;
		context.strokeStyle = this.strokeColor;
		context.lineWidth = this.lineWidth;
	}



});



// A special interval used for rendering. It leverages the browser's `requestAnimationFrame` to be FPS- and battery-friendly.
var RenderingInterval = exports.RenderingInterval = {



	init: function (callback) {
		this.callback = callback || noop;
		this.running = false;

		return this;   // method chaining
	},



	start: function () {
		this.running = true;
		this._queue();

		return this;   // method chaining
	},



	stop: function () {
		this.running = false;

		return this;   // method chaining
	},



	_call: function () {
		if(!this.running) return;
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



// A helper for calling `callback` every `interval` milliseconds.
var Interval = exports.Interval = extend(inherit(RenderingInterval), {



	init: function (callback, interval) {
		RenderingInterval.init.call(this, callback);

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



var Transition = exports.Transition = {



	// set up the `Transition` of a `node`'s properties
	init: function (node, properties, options) {
		var thus = this;   // proxy

		// Stores if the transition is already finished.
		thus.finished = false;

		// The node the properties get changed of.
		thus._n = node;

		// An object with the properties to animate. The values are *relative* to the ´node´s original properties.
		// Example:
		// {
		//    rotation: Math.PI/2
		//    radius: -30
		// }
		thus._p = properties;
		// Because the `node`'s properties change during the transition, the original values have to be copied.
		thus._oP = {};
		// For each of the properties to animate, store if they are set by getter/setter functions.
		// Example:
		// {
		//    rotation: true
		//    radius: false
		// }
		thus._f = {};
		for (var property in thus._p) {
			if (typeof thus._n[property] === 'function'){
				thus._oP[property] = thus._n[property]();
				thus._f[property] = true;
			} else {
				thus._oP[property] = thus._n[property];
				thus._f[property] = false;
			}
		}

		options = options || {};
		// The duration of the transition in milliseconds.
		thus._d = options.duration || 1000;
		// The easing function to be used.
		// > Easing functions specify the rate of change of a parameter over time.
		// — http://easings.net/en
		thus._e = options.easing || easing['linear'];
		// The time of the transition's beginning. Can be used to delay a transition by passing a number bigger than `Date.now()`.
		// todo: add an optional `options.delay`
		thus._s = options.start || Date.now();

		return thus;   // method chaining
	},



	update: function () {
		var thus = this;   // proxy

		// Abort if the transition is already finished.
		if (thus.finished) return;

		var elapsed = Date.now() - thus._s;
		// Abort if the transition hasn't begun.
		if (elapsed < 0) return;
		// Finish the transition if it isn't finished yet but the duration is elapsed.
		if (elapsed > thus._d) return thus.finish();

		// Compute the factor using the easing function and call `_a` with it.
		thus._a(thus._e(elapsed / thus._d));

		return thus;   // method chaining
	},



	// todo.
	finish: function () {
		this._a(1);
		this.finished = true;

		return this;   // method chaining
	},



	// Apply `factor` to the transition of all properties.
	_a: function (factor) {
		var thus = this,   // proxy
		property;

		for (property in thus._p) {
			// originalProperty + propertyDelta * easing( elapsed / duration )
			value = thus._oP[property] + thus._p[property] * factor;
			if (thus._f[property])
				thus._n[property](value);
			else
				thus._n[property] = value;
		}
	}



};



// Export a shorthand.
var a = exports.a = function (node, properties, options) {
	return inherit(Transition)
	.init(node, properties, options);
};



// `velo.easing` holds all easing functions available in *velo*. They all have the same signature (http://en.m.wikipedia.org/wiki/Type_signature#Signature).
// > Easing functions specify the rate of change of a parameter over time.
// — http://easings.net/en
var easing = exports.easing = {};



// Linear easing.
easing.linear = function (p){
	return p;
};



// A `Polygon` is a `Shape` bounded by a list of vertix nodes.
var Polygon = exports.Polygon = extend(inherit(Shape), {



	init: function (options) {
		options = options || {};

		Shape.init.call(this, options);    // call the super class constructor

		// The list of vertex nodes the polygon exists of.
		// User might want to access the list of vertex, which is why `_v` is aliased as `vertices`. `draw` internally uses `_v`.
		this._v = this.vertices = new Array(options.vertices);

		return this;   // method chaining
	},



	// todo: cache `_v`. implement a public `update` method to recomputer the vertices' absolute positions.



	// Draw the polygon to the canvas.
	draw: function () {
		// proxies
		var thus = this,
		context = thus._rn.context,
		vertex, i, length;

		// prepare drawing
		Shape.draw.call(thus);
		context.beginPath();

		for (i = 0, length = thus._v.length; i < length; i++) {
			vertex = thus._v[i].clone().rotate(thus._aR).add(thus._aP);
			context[i === 0 ? 'moveTo' : 'lineTo'](round(vertex.x), round(vertex.y));
		}

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();

		// call `draw()` on all child nodes
		array.foreach(this.children, 'draw');
	}



});



// Export a shorthand.
var p = exports.p = function (options) {
	return inherit(Polygon)
	.init(options);
};



// Yeah, a `Reactangle` is a rectangle.
var Rectangle = exports.Rectangle = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};
		var thus = this;   // proxy

		Polygon.init.call(thus, options);

		// The rectangle's width.
		thus._w = options.width !== null ? options.width : 60;
		// The rectangle's height.
		thus._h = options.height !== null ? options.height : 40;

		// `Polygon` exposes `vertices`, an alias to `_v`, intended to be a straightforward way to manipulate the path. However, because `Rectangle` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Rectangle`, leaving only the `_v` intended for private use.
		delete thus.vertices;
		thus._v = [
			v(0, 0),
			v(thus._w, 0),
			v(thus._w, thus._h),
			v(0, thus._h)
		];

		return thus;   // method chaining
	},



	// Getter Setter: If a `width` is given, set `_w` and modify the `vertices` array accordingly. Otherwise return the current `_w`.
	width: function (width) {
		if (width !== null) {
			this._w = width;
			this._v[1].x = this._v[2].x = this._w;
			return this;   // method chaining
		} else
			return this._w;
	},



	// Getter Setter: If a `height` is given, set `_h` and modify the `vertices` array accordingly. Otherwise return the current `_h`.
	height: function (height) {
		if (height !== null) {
			this._h = height;
			this._v[2].y = this._v[3].y = this._h;
			return this;   // method chaining
		} else
			return this._h;
	}



});



// Export a shorthand.
var r = exports.r = function (options) {
	return inherit(Rectangle)
	.init(options);
};



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
		Shape.draw.call(this);

		// aliases for shorter code
		var thus = this,
		context = thus._rn.context;

		// Prepare drawing.
		context.save();
		Shape.draw.call(thus);
		context.translate(round(thus._aP.x), round(thus._aP.y));
		context.rotate(thus._aR);
		context.scale(1, thus.height / thus.width);   // todo: round here?
		context.beginPath();

		context.arc(0, 0, round(thus.width / 2), 0, Math.PI * 2);

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();
		context.restore();

		// call `draw()` on all child nodes
		array.foreach(this.children, 'draw');
	}



});



// Export a shorthand.
var e = exports.e = function (options) {
	return inherit(Ellipse)
	.init(options);
};



// Yeah, a `Square` is a square.
var Square = exports.Square = extend(inherit(Polygon), {



	init: function (options) {
		options = options || {};
		var thus = this;   // proxy

		Polygon.init.call(thus, options);

		// The square's width and height. Default is `2`.
		thus._s = options.size !== null ? options.size : 2;

		// `Polygon` exposes `vertices`, an alias to `_v`, intended to be a straightforward way to manipulate the path. However, because `Square` changes this path *by itself* (according to its position and rotation), `vertices` is removed by `Square`, leaving only the `_v` intended for private use.
		delete thus.vertices;
		thus._v = [
			v(0, 0),
			v(thus._s, 0),
			v(thus._s, thus._s),
			v(0, thus._s)
		];

		return thus;   // method chaining
	},



	// Getter Setter: If a `size` is given, set `_s` and modify the `vertices` array accordingly. Otherwise return the current `_s`.
	size: function (size) {
		if (size !== null) {
			this._w = size;
			this._v[1].x = this._v[2].x = this._v[2].y = this._v[3].y = this._s;
			return this;   // method chaining
		} else
			return this._w;
	}



});



// Export a shorthand.
var sq = exports.sq = function (options) {
	return inherit(Square)
	.init(options);
};



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
		Shape.draw.call(this);

		// aliases for shorter code
		var thus = this,
		context = thus._rn.context;

		// Prepare drawing.
		Shape.draw.call(thus);
		context.beginPath();

		context.arc(round(thus._aP.x), round(thus._aP.y), round(thus.radius), 0, Math.PI * 2);

		// Finish drawing.
		context.closePath();
		context.fill();
		if (thus.lineWidth > 0)
			context.stroke();

		// call `draw()` on all child nodes
		array.foreach(this.children, 'draw');
	}



});



// Export a shorthand.
var cl = exports.cl = function (options) {
	return inherit(Circle)
	.init(options);
};
},{}]},{},[1])(1)
});