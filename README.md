# velo – a lightweight canvas 2D library

[![Build Status](https://travis-ci.org/derhuerst/velo.svg?branch=master)](https://travis-ci.org/derhuerst/velo)

***velo* is a modern and lightweight canvas 2D library** written in vanilla JavaScript. It offers a simple and straightforward API and embraces [prototypal programming](http://davidwalsh.name/javascript-objects-deconstruction#simpler-object-object), keeping it **below 7kb (minified)**. *velo* is licensed under the **[MIT license](LICENSE)**.



## Install

If you want to go with the **default build**, download the latest release from [the releases page](/derhuerst/velo/releases). **The JavaScript files will be in the `dist` folder.**


### Custom builds

Grab the latest **stable release from [the releases page](/derhuerst/velo/releases)**. If you want the **development version, clone the repo using git**.

```shell
git clone https://github.com/derhuerst/velo.git velo
```

Change into the directory and install the development dependencies.

```shell
cd velo
npm install --dev
```

*velo* is divided into modules, each being a directory containing JavaScript files. These are the modules available.

|Module|Default|Files|
|:--:|:--:|:--|
|[core](src/core)|✔|[`helpers`](src/core/01-helpers.js), [`Vector`](src/core/02-Vector.js), [`Node`](src/core/03-Node.js), [`Canvas`](src/core/04-Canvas.js), [`Shape`](src/core/05-Shape.js)|
|[shapes](src/shapes)|✔|[`Polygon`](src/shapes/01-Polygon.js), [`Rectangle`](src/shapes/02-Rectangle.js), [`Ellipse`](src/shapes/03-Ellipse.js), [`Square`](src/shapes/04-Square.js), [`Circle`](src/shapes/05-Circle.js)|
|[util](src/util)|✔|[`RenderingInterval`](src/util/01-RenderingInterval.js), [`Interval`](src/util/02-Interval.js), [`Transition`](src/util/03-Transition.js)|
|[easing](src/easing)||[`easeIn`](src/easing/01-easeIn.js), [`easeOut`](src/easing/02-easeOut.js), [`easeInOut`](src/easing/03-easeInOut.js), [`swing`](src/easing/04-swing.js)|

**Specify the modules** you want to include **in `package.json`**, using the [glob syntax](https://github.com/isaacs/node-glob#glob-primer).

```json
…
	"config": {
		"files": [
			"core/*",
			"util/*",
			"shapes/*"
		]
	}
…
```

To build, minify and gzip, run the following. Called by *npm*, the [*gulp* build system](http://gulpjs.com) will concatenate all JavaScript files, wrap them into a bundle using [*Browserify*](http://browserify.org/), minify and gzip them.

```shell
npm run dist
```

**Your custom build will be in `./dist`.**



## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/velo/issues).

If you contribute code, pleace respect [the coding style of this project](docs/styleguide.md).



## Documentation

- [Introduction to *velo*](docs/intro.md)
- [*velo* API documentation](docs/api.md)
- [*velo* styleguide](docs/styleguide.md)