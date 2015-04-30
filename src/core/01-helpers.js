// core/helpers
// `helpers` contains a collection of useful functions.



// todo: strict mdoe



// A do-nothing function used as a default callback.
var noop = function () {};



// A reference to `hasOwnProperty`.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
var hasProp = {}.hasOwnProperty;



// Let the child child "class" inherit from the parent "class".
// Taken from the CoffeeScript project (http://techoctave.com/c7/posts/93-simple-javascript-inheritance-using-coffeescript-extends).
var inherit = function (child, parent) {
	for (var key in parent) {
		if (hasProp.call(parent, key))
			child[key] = parent[key];
	}

	function ctor() {
		this.constructor = child;
	}

	ctor.prototype = parent.prototype;
	child.prototype = new ctor();

	return child;
};



// Extend the `target` object by the keys and values of the `source` object.
// Stolen from the zepto.js project (https://github.com/madrobby/zepto/blob/1d94d92223a5ec2edf1fbe18a7a9cc717e7663e4/src/zepto.js#L223) and customized.
var extend = function (target, source) {
	for (key in source) {
		if (source[key] !== undefined)
			target[key] = source[key];
	}
	return target
};



// Call `method` by name with all further arguments on every item in the list.
var call = function () {
	new Array(arguments);    // Convert to real `Array`.
	for (var i = 0, length = this.length; i < length; i++) {
		this[i][arguments.shift()].apply(this[i], arguments);
	}
}



// `Array` helpers
exports.array = {

	// Add `item` to `array if it isn't alerady stored.
	add: function (array, item) {
		if (array.indexOf(item) < 0)
			array.push(item);
	},

	// Remove the first entry for `item` from `array`.
	remove: function (array, item, i) {    // Short declaration of `i` in the arguments list.
		if (i = array.indexOf(item) >= 0)
			array.splice(i, item);
	},

	// Return wether `item` exists in `array`.
	has: function (array, item) {
		return this._items.indexOf(item) >= 0;
	},

	// Call `method` by name with all following arguments on every item in `array`.
	foreach: function () {
		var array = arguments[0];
		var method = arguments[1];
		arguments = exports.array.slice(2);
		for (var i = 0, length = array.length; i < length; i++) {
			if(!array[i])
				continue;
			array[i][method].apply(array[i], arguments);
		}
	},

	// Works like `Array.prototype.slice`, but additionally requires `array` as an argument.
	slice: function (array, i, j) {
		return Array.prototype.slice.call(array, i, j);
	}

};