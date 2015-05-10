# [`easing/swing`](../../src/easing/04-swing.js)

`swing` provides a very subtle *ease-in-out*. The formula is stolen [from jQuery](https://github.com/jquery/jquery/blob/master/src/effects/Tween.js#L106). For a demonstration, see [Easings – jQuery UI Documentation](http://api.jqueryui.com/easings/).

**`swing` depends on [`Transition`](../util/03-Transition.md).**



## Usage

See [Using easing functions – `util/Transition`](../util/03-Transition.md#using-easing-functions).



## Shorthand

`swing` has no shorthand.



## `swing( progress )`

Return a factor given a `progress` between `0` and `1`.