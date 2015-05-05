# Introduction to *velo*



## The scene graph

***velo* works with a tree of `Node` objects**, each of which has a `position` and a `rotation` *relative* to its parent `Node`. This concept is called [scene graph](http://en.wikipedia.org/wiki/Scene_graph#Scene_graphs_in_games_and_3D_applications).

Whenever the user changes a `Node` object's `parent`, `position` or `rotation`, the internal function `_u()` recomputes the *absolute* position `_aP` and *absolute* rotation `_aR`. The `Node` can then draw itself easily, using `_aP` and `_aR`.

**This way, rendering will be fast**, because nested transformations don't have to be recomputed on each render cycle.


### Maintaining the scene graph

*velo* sacrifices *automatic* scene graph management in favor of a smaller footprint. **You have to manage the scene graph *manually*.** **If you don't keep the scene graph consistent, kittens will die!** An inconsistent scene graph may lead to invisible or offset nodes. Also, take care that a node never is a child of *two* nodes.

To give you an example, let's say you have two nodes `n1` and `n2`. When you *add* `n2` to `n1`'s list of children, don't forget to set `n2`'s parent *to `n1`*, either on setup (method `a`) or later (method `b`).

```javascript
velo.array.add(n1.children, n2);   // adds `n2` to `n1.children`

// Method `a` – specify the parent on setup
n2 = velo.n({
	…
	parent: n1
	…
});

// Method `b` – specify the parent later
n2.parent(n1);
```

When you *remove* `n2` from `n1`'s list of children, don't forget to set `n2`'s parent *to `null`*.

```javascript
velo.array.remove(n1.children, n2);   // removes `n2` from `n1.children`

n2.parent(null);   // This is important!
```



## Inheritance in *velo*

todo

- https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4
- http://davidwalsh.name/javascript-objects
- http://davidwalsh.name/javascript-objects-distractions
- http://davidwalsh.name/javascript-objects-deconstruction#simpler-object-object