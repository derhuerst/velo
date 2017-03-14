'use strict'

const core = Object.assign({},
	require('./lib/core/01-helpers'),
	require('./lib/core/02-Vector'),
	require('./lib/core/03-Node'),
	require('./lib/core/04-Canvas'),
	require('./lib/core/05-Shape')
)

const shapes = Object.assign({},
	require('./lib/shapes/01-Polygon'),
	require('./lib/shapes/02-Rectangle'),
	require('./lib/shapes/03-Ellipse'),
	require('./lib/shapes/04-Square'),
	require('./lib/shapes/05-Circle')
)

const easing = Object.assign({},
	require('./lib/easing/01-easeIn'),
	require('./lib/easing/02-easeOut'),
	require('./lib/easing/03-easeInOut'),
	require('./lib/easing/04-swing')
)

const util = Object.assign({},
	require('./lib/util/01-RenderingInterval'),
	require('./lib/util/02-Interval'),
	require('./lib/util/03-Transition')
)

module.exports = Object.assign({}, core, shapes, easing, util)
