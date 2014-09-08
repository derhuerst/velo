# velo – a lightweight canvas 2D library

*velo* is a **modern and lightweight canvas 2D library** written in vanilla JavaScript. It offers a simple and straightforward API and keeps a low footprint. It is licensed unter the terms of the [MIT License](https://github.com/derhuerst/velo/tree/master/LICENSE.md). Minified, **the default build is smaller than 7kb**, which makes it fit perfectly for small websites.

- [How do I use *velo*?](#getting-started)
- [List of available modules](#modules)
- [How do I build custom version of *velo*?](#custom-build)
- [I want to help!](#contributing)
- [API Documentation](#api-documentation) coming soon!



## Getting Started

[Grab the latest release](https://github.com/derhuerst/velo/releases) and unpack it. The default *velo* distribution file including the [default modules](#modules) will be **in the `dist` directory**.

*API examples coming soon.*



## Modules

*velo* modules are simple JavaScript files in the `src` directory.

|directory|default|modules|
|:--:|:--:|:--|
|[core](https://github.com/derhuerst/velo/tree/master/src/core)|✔|[`helpers`](https://github.com/derhuerst/velo/tree/master/src/core/01-helpers.js), [`Vector`](https://github.com/derhuerst/velo/tree/master/src/core/02-Vector.js), [`List`](https://github.com/derhuerst/velo/tree/master/src/core/03-List.js), [`Node`](https://github.com/derhuerst/velo/tree/master/src/core/04-Node.js), [`Canvas`](https://github.com/derhuerst/velo/tree/master/src/core/05-Canvas.js), [`Shape`](https://github.com/derhuerst/velo/tree/master/src/core/06-Shape.js)|
|[util](https://github.com/derhuerst/velo/tree/master/src/util)|✔|[`Rendering`](https://github.com/derhuerst/velo/tree/master/src/util/01-Rendering.js), [`Interval`](https://github.com/derhuerst/velo/tree/master/src/util/02-Interval.js)|
|[shapes](https://github.com/derhuerst/velo/tree/master/src/shapes)|✔|[`Point`](https://github.com/derhuerst/velo/tree/master/src/shapes/01-Point.js), [`Polygon`](https://github.com/derhuerst/velo/tree/master/src/shapes/02-Polygon.js), [`Rectangle`](https://github.com/derhuerst/velo/tree/master/src/shapes/03-Rectangle.js), [`Ellipse`](https://github.com/derhuerst/velo/tree/master/src/shapes/04-Ellipse.js)|
|[convenience](https://github.com/derhuerst/velo/tree/master/src/convenience)|✔|[`Square`](https://github.com/derhuerst/velo/tree/master/src/convenience/04-Square.js), [`Circle`](https://github.com/derhuerst/velo/tree/master/src/convenience/06-Circle.js)|



## Custom Build

### 1. Get *velo*

If you want to customize the **latest (unstable) version**, clone a copy of this git repo and change into the directory.

```bash
$ git clone https://github.com/derhuerst/velo.git
$ cd velo
```

If you want to customize a **stable release** instead, [grab the latest release](https://github.com/derhuerst/velo/releases), unpack it and change into the directory using `cd path/to/velo`.


### 2. Dependencies

Install the development dependencies.

```bash
$ npm install
```


### 3. Specify modules

You might want to add plugins or remove stuff you don't need. Specify all modules you want in `package.json` as follows.

```json
...
	"config": {
		"files": [
			"core/*",
			"util/*",
			"shapes/*",
			"convenience/*"
		]
	}
...
```


### 4. Build

Build your distribution file.

```bash
$ npm run dist
```

Called by *npm*, the [*Gulp* build system](http://gulpjs.com) concatenates all JavaScript files, wraps them into a bundle using [*Browserify*](http://browserify.org/) and minifies them. **Your custom build `velo.js` and the minified version `velo.min.js` are now in the `dist` directory.**



## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/velo/issues).



## API Documentation

coming soon!