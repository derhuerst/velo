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