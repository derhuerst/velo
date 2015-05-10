# [`core/Node`](../../src/core/03-Node.js)

`Node` is a base class for everything that will be rendered. Every `Node` object has a [`parent`](#public-gettersetter-parent-node-), [`position`](#public-gettersetter-position-vector-relative-), [`rotation`](#public-gettersetter-rotation-angle-relative-) and can store any number of child `Node`s in [`children`](#public-children). Read [more about this](../intro.md#the-scene-graph).



## Usage

In opposition to classes inheriting from it, `Node` is not supposed to be used directly.

```javascript
// create two nested nodes
node1 = velo.n({
	position: velo.v(10, 10),
	rotation: 0.3
});
node2 = velo.n({
	position: velo.v(5, 5),
	rotation: 0.4
});

node2.position;   // { x: 5, y: 5 }
node2.rotation;   // 0.4

node2._aP;   // { x: 5, y: 5 }
node2._aR;   // 0.4

velo.array.add(node1.children, node2);
node2.parent(node1);

node2._aP;   // { x: 15, y: 15 }
node2._aR;   // { 0.7 }
```



## Shorthand `n`

```javascript
velo.inherit(velo.Node).init({…});   // complicated way
velo.n({…});   // shorthand
```



## *constructor* `init( options )`

Create a new `Node` based on `options`. `options` may contain the following keys.

| Key | Default | Description |
| --- | ------- | ----------- |
| [`parent`](#private-_pn) | `null` | The parent `Node` object. |
| [`position`](#private-_p) | `velo.v()` | The position as a [`Vector`](02-vector.md) object (relative to the node's parent). |
| [`rotation`](#private-_r) | `0` | The rotation in [radians](http://en.wikipedia.org/wiki/Radian) (relative to the node's parent). |
| [`children`](#public-children) | `[]` | The list of child nodes. |



## *public* `children`

The list of child nodes. You can modify it without hassle. Default is `[]`.

**Important**: If you want to add node `n2` as a child of another node `n1`, remember to specify `n1` as `n2`'s [parent](#private-_pn). See [Maintaining the scene graph](../intro.md#maintaining-the-scene-graph) for more.



## *public* *getter/setter* `parent( node )`

If a `node` is given, set it as this node's parent and call [`_u()`](#private-_u) to recompute the absolute values ([`_aP`](#private-_ap) and [`_aR`](#private-_ar)). Otherwise return the current parent node.

**Important**: If you want to set a node `n1` as a node `n2`'s parent, remember to add `n2` to the list of `n1`'s children. See [Maintaining the scene graph](../intro.md#maintaining-the-scene-graph) for more.



## *public* *getter/setter* `position( vector, relative )`

Getter Setter: If a `vector` is given, change this node's [position](#private-_p) and call [`_u()`](#private-_u) to recompute the absolute values ([`_aP`](#private-_ap) and [`_aR`](#private-_ar)). Otherwise return the current [position](#private-_p).

If `relative` is `true`, *translate* the [position](#private-_p) by `vector`. Otherwise, *set* the [position](#private-_p) to `vector` (without making a copy!).



## *public* *getter/setter* `rotation( angle, relative )`

Getter Setter: If an `angle` is given, change this node's [rotation](#private-_r) and call [`_u()`](#private-_u) to recompute the absolute values ([`_aP`](#private-_ap) and [`_aR`](#private-_ar)). Otherwise return the current [rotation](#private-_r).

If `relative` is `true`, *add* `angle` to the current [rotation](#private-_r). Otherwise, *set* the [rotation](#private-_r) to `angle`.



## *private* `_u()`

Recompute the node's absolute values ([`_aP`](#private-_ap) and [`_aR`](#private-_ar)), then call `_u()` on all children.

**Important**: A node's rotation is applied *after* applying its position, so it will only affect the position of its children.

> Whenever the user changes a `Node` object's `parent`, `position` or `rotation`, the internal function [`_u()`](#private-_u) recomputes the *absolute* position `_aP` and *absolute* rotation `_aR`.

– [The scene graph](../intro.md#the-scene-graph)



## *private* `_pn`

A Reference to the node's parent node. Default is `null`.

**Important**: Please use [`parent(node)`](#public-gettersetter-parent-node-) to set this.



## *private* `_rn`

A Reference to the root node. Default is `null`.

**Important**: [`parent(node)`](#public-gettersetter-parent-node-) changes this to `_pn._rn`.



## *private* `_p`

The node's (relative) position. Default is [`velo.v()`](02-Vector.md#shorthand).

**Important**: Please use [`position(vector, relative)`](#public-gettersetter-position-vector-relative-) to set this.



## *private* `_aP`

The node's (absolute) position, relative to the [root node](#private-_rn).  Read [more about this](../intro.md#the-scene-graph).

**Important**: Please don't touch this value, it gets recomputed frequently by [`_u()`](#private-_u).



## *private* `_aR`

The node's (absolute) rotation, relative to the [root node](#private-_rn).  Read [more about this](../intro.md#the-scene-graph).

**Important**: Please don't touch this value, it gets recomputed frequently by [`_u()`](#private-_u).