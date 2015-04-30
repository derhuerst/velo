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