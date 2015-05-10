# [`easing/easeIn`](../../src/easing/01-easeIn.js)

`easeIn` provides a quadratic *ease-in* function. The formula is stolen [from jQuery UI](https://github.com/jquery/jquery-ui/blob/master/ui/effect.js#L1559). For a demonstration, see [`easeInQuad` – Easings Cheat Sheet](http://easings.net/en#easeInQuad).

**`easeIn` depends on [`Transition`](../util/03-Transition.md).**



## Usage

See [Using easing functions – `util/Transition`](../util/03-Transition.md#using-easing-functions).



## Shorthand

`easeIn` has no shorthand.



## `easeIn( progress )`

Return a factor given a `progress` between `0` and `1`.