# Introduction to *velo*



## The scene graph

***velo* works with a tree of `Node` objects**, each of which has a `position` and a `rotation` *relative* to its parent `Node`. This concept is called [scene graph](http://en.wikipedia.org/wiki/Scene_graph#Scene_graphs_in_games_and_3D_applications).

Whenever the user changes a `Node` object's `parent`, `position` or `rotation`, the internal function `_u()` recomputes the *absolute* position `_aP` and *absolute* rotation `_aR`. The `Node` can then draw itself easily, using `_aP` and `_aR`.

**This way, rendering will be fast**, because nested transformations don't have to be recomputed on each render cycle.


### Maintaining the scene graph

*velo* sacrifices *automatic* scene graph management in favor of a smaller footprint. **You have to manage the scene graph *manually*.** **If you don't keep the scene graph consistent, kittens will die!** An inconsistent scene graph may lead to invisible or offset nodes. Also, take care that a node never is a child of *two* nodes.

To give you an example, let's say you have two nodes `node1` and `node2`. When you *add* `node2` to `node1`'s list of children, don't forget to set `node2`'s parent *to `node1`*, either on setup (method `a`) or later (method `b`).

```javascript
velo.array.add(node1.children, node2);

// Method `a` – specify the parent on setup
node2 = velo.n({
	…
	parent: node1
	…
});

// Method `b` – specify the parent later
node2.parent(node1);
```

When you *remove* `node2` from `node1`'s list of children, don't forget to set `node2`'s parent *to `null`*.

```javascript
velo.array.remove(node1.children, node2);

node2.parent(null);   // This is important!
```



## Inheritance in *velo*

todo

- https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4
- http://davidwalsh.name/javascript-objects
- http://davidwalsh.name/javascript-objects-distractions
- http://davidwalsh.name/javascript-objects-deconstruction#simpler-object-object