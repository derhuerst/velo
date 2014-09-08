// core/Node



// Export the `Node` "class" and a shorthand.
exports.Node = Node;
exports.n = function (options) {
	return new Node(options);
};



// `Node` is a base class for everything that will be rendered. Every `Node` object has a `parent`, `position`, `rotation` and can store child nodes in `children`.
// velo works with a tree of nodes, each of which has a position and a rotation relative to its parent node. Whenever the user changes a node's `parent`, (relative) position or (relative) `rotation`, `_update` recomputes the (absolute) position and rotation. `Shape` objects inheriting from `Node` can then draw onto the untranslated and unrotated canvas using `_absolute`. This way, rendering will be fast, because the transformations do not have to be recomputed on each render cycle.
function Node (options) {
	options = options || {};

	// The parent `Node` object.
	this._parent = options.parent || null;
	// The position relative to the node's parent as a `Vector` object.
	this._position = options.position || exports.v();
	// The rotation relative to the node's parent in radians.
	this._rotation = options.rotation || 0;
	// The list of child nodes.
	this.children = exports.l(options.children);    // shorthand for `new List(…)`

	this._update();    // Recompute the the absolute translation.
}



// Add methods to the prototype of `Node`.
extend(Node.prototype, {



	// With no arguments, get the node's parent node.
	// Otherwise, set the node's parent to `node` and recompute the the absolute translation.
	parent: function (node) {
		if (arguments.length === 0)    // no parent node given
			return this._parent    // work as getter

		// parent node given, work as setter
		this._parent = node || null;
		this._root = node ? node._root : null;

		this._update();    // Recompute the the absolute translation.
	},


	// With no arguments, get the node's rotation.
	// Otherwise, set the rotation to `angle` and recompute the the absolute translation.
	rotation: function (angle) {
		if (arguments.length === 0)    // no angle node given
			return this._rotation    // work as getter

		// angle given, work as setter
		this._rotation = angle;

		this._update();    // Recompute the the absolute translation.
	},


	// With no arguments, get the node's position. Otherwise change the position and recompute the the absolute translation.
	// If `relative` is `true`, translate position by `vector`.
	// Otherwise, set the position to `vector`.
	position: function (vector, relative) {
		if (arguments.length === 0)    // no vector given
			return this._rotation;    // work as getter

		// vector given, work as setter
		if (relative === true)
			this._position.add(vector);
		else
			this._position = node;

		this._update();    // Recompute the the absolute translation.
	},



	// Recompute the absolute translations in `_absolute` and `_update` all children.
	// Remember: This node's rotation doesn't affect its rotation, but its drawing and children.
	_update: function () {
		var thus = this, parent = thus._parent;    // aliases for shorter code

		thus._absRotation = thus._rotation;
		if (parent){
			thus._absPosition = thus._absolute(thus._position, parent._absPosition, parent._absRotation);
			thus._absRotation += parent._absRotation;
		} else
			thus._absPosition = thus._position.clone();

		// Call update on all child nodes, because they are affected by changes on this node.
		thus.children.call('_update');
	},



	// Helper function to compute a node's absolute position based on
	// - this node's (relative) position
	// - the parent node's (absolute) position
	// - the parent node's (absolute) rotation
	_absolute: function (position, parentAbsolutePosition, parentAbsoluteRotation) {
		return position.clone()    // Take this node's relative position, clone it,
		.rotate(parentAbsoluteRotation)    // apply the parent node's (absolute) rotation
		.add(parentAbsolutePosition);    // and add the parent node's (absolute) position.
	}



});