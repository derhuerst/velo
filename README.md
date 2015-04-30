# velo – a lightweight canvas 2D library

***velo* is a modern and lightweight canvas 2D library** written in vanilla JavaScript. It offers a simple and straightforward API and embraces [prototypal programming](http://davidwalsh.name/javascript-objects-deconstruction#simpler-object-object), keeping it **below 7kb (minified)**.

- [How do I use *velo*?](#getting-started)
- [List of available modules](#modules)
- [How do I build custom version of *velo*?](#custom-build)
- [I want to help!](#contributing)
- [API Documentation](#api-documentation) coming soon!



## License

*velo* is licensed unter the terms of the [MIT License](LICENSE.md).



## Getting Started

[Grab the latest release](https://github.com/derhuerst/velo/releases) and unpack it. The default *velo* **distribution files** including the [default modules](#modules) will be **in `dist/`**.



## Modules

*velo* modules are simple JavaScript files in the `src` directory grouped into collections.

|directory|default|modules|
|:--:|:--:|:--|
|[core](src/core)|✔|[`helpers`](src/core/01-helpers.js), [`Vector`](src/core/02-Vector.js), [`Node`](src/core/04-Node.js), [`Canvas`](src/core/05-Canvas.js), [`Shape`](src/core/06-Shape.js)|
|[util](src/util)|✔|[`Rendering`](src/util/01-Rendering.js), [`Interval`](src/util/02-Interval.js)|
|[shapes](src/shapes)|✔|[`Spot`](src/shapes/01-Spot.js), [`Polygon`](src/shapes/02-Polygon.js), [`Rectangle`](src/shapes/03-Rectangle.js), [`Ellipse`](src/shapes/04-Ellipse.js), [`Square`](src/shapes/05-Square.js), [`Circle`](src/shapes/06-Circle.js)|
|[colors](src/colors)|x|**unfinished**; [`Color`](src/colors/01-Color.js), [`Hex`](src/colors/02-Hex.js), [`RGB`](src/colors/02-RGB.js), [`RGBA`](src/colors/02-RGBA.js)|




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

- [core](docs/core.md)
- [util](docs/util.md)
- [shapes](docs/shpaes.md)
- [convenience](docs/convenience.md)
