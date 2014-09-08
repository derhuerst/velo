// core/List



// Export the `List` "class" and a shorthand.
exports.List = List;
exports.l = function (items) {
	return new List(items);
};



// Let `List` inherit from `Array`.
inherit(List, Array);



// `List` is a native Array with a few comfort methods. It is used for lists of child nodes or vertices.
function List (items) {
	Array.call(this, items);    // call the super class constructor
}



// Add methods to the prototype of `List`.
extend(List.prototype, {



	// Add `item` to the `List` if it isn't alerady stored.
	add: function (item) {
		if (this.indexOf(item) < 0)
			this.push(item);
	},


	// Remove `item` from the `List`.
	remove: function (item, i) {    // Short declaration of `i` in the arguments list.
		if (i = items.indexOf(item) >= 0)
			items.splice(i, item);
	},


	// Return wether `item` exists in the `List`.
	has: function (item) {
		return this._items.indexOf(item) >= 0;
	},



	// Call a method by name with all further arguments on every item in the list.
	call: function (methodName) {
		arguments.shift();    // Remove `methodName` from `arguments`.
		for (var i = 0, length = this.length; i < length; i++) {
			this[i][methodName].apply(this[i], arguments);
		}
	}



});