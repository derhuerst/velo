# *velo* Documentation



## How *velo* works

velo works with a tree of `Node` objects, each of which has a `position` and a `rotation` *relative* to its parent `Node`. This concept is called scene graph (see http://en.wikipedia.org/wiki/Scene_graph#Scene_graphs_in_games_and_3D_applications).

Whenever the user changes a `Node`'s `parent`, `position` or `rotation`, the internal function `_update()` recomputes the *absolute* position and rotation so it can be drawn to the canvas. `Shape` objects inheriting from `Node` can then draw onto the untranslated and unrotated canvas using `_absolute`. This way, rendering will be fast, because the transformations do not have to be recomputed on each render cycle.

todo: rewrite this