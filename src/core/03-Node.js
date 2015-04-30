// core/Node



// `Node` is a base class for everything that will be rendered. Every `Node` object has a `parent`, `position`, `rotation` and can store any number of child `Node`s in `children`.
var Node = exports.Node = {



	init: function (options) {
		options = options || {};

		// The parent `Node` object. Default: `null`
		this.parent(options.parent);
		// The position as a `Vector` object (relative to the node's parent). Default: `new Vector()`
		this._p = options.position || v();
		// The rotation in radians (relative to the node's parent). Default: `0`
		this._r = options.rotation || 0;
		// The list of child nodes.
		this.children = new Array(options.children || 0);

		this._aR = 0;   // cached absolute rotation
		this._aR = 0;   // cached absolute rotation
		this._u();   // recompute the absolute values

		return this;   // method chaining
	},



	// Getter/Setter: If a `node` is given, set it as this `Node`'s parent and call `_u()` to recompute the absolute values. Otherwise return the current parent.
	parent: function (node) {
		if (node) {
			this._pn = node;
			this._rn = node._rn;
			this._u();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._pn;
	},



	// Getter Setter: If a `vector` is given, change this `Node`'s position and call `_u()` to recompute the absolute values. Otherwise return the current position.
	// If `relative` is `true`, translate the position by `vector`. Otherwise, set the position to `vector` (without making a copy!).
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



	// Getter Setter: If an `angle` is given, change this `Node`'s rotation and call `_u()` to recompute the absolute values. Otherwise return the current rotation.
	// If `relative` is `true`, add `angle` to the current rotation. Otherwise, set the rotation to `angle`.
	rotation: function (angle, relative) {
		if (angle !== null) {
			if (relative === true)
				this._r += angle;
			else
				this._r = angle;
			this._u();   // recompute the the absolute position
			return this;   // method chaining
		} else
			return this._p;
	},



	// Recompute the node's absolute values and store them in `_aP` and `_aR`, then call `_u()` on all children.
	// Important: This node's rotation is applied *after* the position, so it won't affect this node's position, but that of its children.
	_u: function () {
		var thus = this;   // just an proxy

		if (!thus._pn || !thus._p) return;

		thus._aP = thus._p.clone().rotate(thus._pn._aR).add(thus._pn._aP);
		thus._aR = thus._pn._aR + thus._r;

		// call `_u()` on all child nodes
		array.foreach(this.children, '_u');
	},



};



// Export a shorthand.
var n = exports.n = function (options) {
	return inherit(Node)
	.init(options);
};