# Custom *velo* builds



## Prerequisites

[*git*](https://gist.github.com/derhuerst/1b15ff4652a867391f03) and [*node.js*](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) have to be installed.



## Download

Grab the latest **stable release from [the releases page](https://github.com/derhuerst/velo/releases)**.

If you want the **development version, clone the repo using git**.

[![build status](https://img.shields.io/travis/derhuerst/velo.svg)](https://travis-ci.org/derhuerst/velo)

```shell
git clone https://github.com/derhuerst/velo.git velo
```



## Dependencies

Enter the directory and install the development dependencies.

```shell
cd velo
npm install --dev
```



## Modules

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
			"core/*.js",
			"util/*.js",
			"shapes/*.js"
		]
	}
…
```



## Building

To build, minify and gzip, run the following. Called by *npm*, the [*gulp* build system](http://gulpjs.com) will concatenate all JavaScript files, wrap them into a bundle using [*Browserify*](http://browserify.org/), minify and gzip them.

```shell
npm run dist
```

**Your custom build will be in `./dist`.**