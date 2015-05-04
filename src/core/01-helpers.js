// `helpers` contains a collection of internal helper functions.



// EcmaScript 5 strict mode. Because all modules get concatenated, this applies to all of them.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode for more about ES5 strict mode.
"strict mode";



// A do-nothing function used as default callback.
var noop = exports.noop = function () {};



// Just proxies for shorter code.
var inherit = exports.inherit = Object.create;
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



// `Array` helpers
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