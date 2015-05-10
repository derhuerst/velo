# [`util/Transition`](../../src/util/03-Transition.js)

A `Transition` changes a [`Node`](../core/03-Node.md)'s properties over a given duration by given values.



## Usage

Let's assume you have a [`Rectangle`](../shapes/02-Rectangle.md).

```javascript
// create a rectangle
rectangle1 = velo.r({
	position: velo.v(10, 10),
	width: 50,
	height: 30
});
```

You can specify a `Transition` that adds `50` to its `width`.

```javascript
transition1 = velo.t(rectangle1.position, {
	width: 50
});
```

You have to call `update()` regularly to recompute the temporary `width`, for example using a [`RenderingInterval`](01-RenderingInterval.md).


### Using easing functions

> Easing functions specify the rate of change of a parameter over time.
— [Easing Cheat Sheet](http://easings.net/en)

You can modify the appereance of a transition by using an easing function. *velo* comes with only one of those, `linear`, by default. [Build you own version](../build.md) with the [`easing` module](../api.md#easing) to use different easings.

All easing functions are available via `velo.easing`. You can pass yours when setting up a `Transition`.

```javascript
velo.t(node, {
	…
}, {
	easing: velo.easing.swing
});
```


### Delaying transitions

If you pass `Date.now() + n` as the `start` time for the transition, it will be delayed by `n` milliseconds.

```javascript
velo.t(node, {
	…
}, {
	start: Date.now() + 3000   // 3 seconds delay
});
```



## Shorthand `t`

```javascript
velo.inherit(velo.Transition).init(node, {…}, {…});   // complicated way
velo.t(node, {…}, {…});   // shorthand
```



## *constructor* `init( node, properties, options )`

Set up the `Transition` of a [`node`](#private-_n)'s [`properties`](#private-_p). `options` may contain the following keys.

| Key | Default | Description |
| --- | ------- | ----------- |
| [`duration`](#private-_d) | `1000` | The duration of the transition in milliseconds. |
| [`easing`](#using-easing-functions) | `velo.easing['linear']` | The easing function to be used. |
| [`start`](#delaying-transitions) | `0` | The time the transition will start. |



## *public* `finished`

Stores if the transition is already finished. `true` or `false`.

**Important**: Do not change this value or bad things will happen!



## *public* `update()`

Update the [`properties`](#private-_p) according to the current progress of the transition, which is influenced by the [easing function](#using-easing-functions). Call [`finish()`](#public-finish--) in the end.



## *public* `finish()`

Finish the transition, setting the [`node`](#private-_n)'s [`properties`](#private-_p) to their final values and [`finished`](#public-finished) to `true`.



## *private* `_a( factor )`

Apply `factor` to the transition of all [`properties`](#private-_p).



## *private* `_n`

The node the properties get changed of.

**Important**: Do not change this reference or bad things will happen!



## *private* `_p`

An object with the properties to animate. The values are *relative* (get added) to the [`node`](#private-_n)'s original properties.

Example:

```javascript
{
	rotation: Math.PI/2   // turn the node 90° clockwise
	radius: -30   // decrease the radius by `30`
}
```



## *private* `_oP`

Because the [`node`](#private-_n)'s properties change during the transition, the original values have to be copied.

**Important**: Do not touch these values or bad things will happen!



## *private* `_f`

For each of the [`properties`](#private-_p) to animate, `_f` stores if they are set by getter/setter functions.

**Important**: Do not touch these values or bad things will happen!



## *private* `_d`

The duration of the transition in milliseconds.



## *private* `_e`

*A reference* to the easing function to be used.

> Easing functions specify the rate of change of a parameter over time.
— [Easing Cheat Sheet](http://easings.net/en)

See [Using easing functions](#using-easing-functions) for more.



## *private* `_s`

The [JavaScript timestamp](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/now) the transition will start. Can be used to [delay a transition](#delaying-transitions).




# `velo.easing`

`velo.easing` holds all easing functions *velo* has been built with. They all have the same [signature](http://en.m.wikipedia.org/wiki/Type_signature#Signature).

`util/Transition` provides one the default easing, `linear`.