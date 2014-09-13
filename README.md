# velo – a lightweight canvas 2D library

***velo* is a modern and lightweight canvas 2D library** written in vanilla JavaScript. It offers a simple and straightforward API and keeps a low footprint. It is licensed unter the terms of the [MIT License](LICENSE.md). Minified, **the default build is smaller than 7kb**, which makes it fit perfectly for small websites.

- [How do I use *velo*?](#getting-started)
- [List of available modules](#modules)
- [How do I build custom version of *velo*?](#custom-build)
- [I want to help!](#contributing)
- [API Documentation](#api-documentation) coming soon!




## Getting Started

[Grab the latest release](https://github.com/derhuerst/velo/releases) and unpack it. The default *velo* distribution file including the [default modules](#modules) will be **in the `dist` directory**.

*API examples coming soon.*




## Modules

*velo* modules are simple JavaScript files in the `src` directory grouped into collections.

|directory|default|modules|
|:--:|:--:|:--|
|[core](src/core)|✔|[`helpers`](src/core/01-helpers.js), [`Vector`](src/core/02-Vector.js), [`List`](src/core/03-List.js), [`Node`](src/core/04-Node.js), [`Canvas`](src/core/05-Canvas.js), [`Shape`](src/core/06-Shape.js)|
|[util](src/util)|✔|[`Rendering`](src/util/01-Rendering.js), [`Interval`](src/util/02-Interval.js)|
|[shapes](src/shapes)|✔|[`Point`](src/shapes/01-Point.js), [`Polygon`](src/shapes/02-Polygon.js), [`Rectangle`](src/shapes/03-Rectangle.js), [`Ellipse`](src/shapes/04-Ellipse.js)|
|[convenience](src/convenience)|✔|[`Square`](src/convenience/01-Square.js), [`Circle`](src/convenience/02-Circle.js)|
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
- [util](docs/core.md)
- [shapes](docs/core.md)
- [convenience](docs/core.md)