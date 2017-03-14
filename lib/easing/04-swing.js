// `swing` provides a very subtle *ease-in-out*. The formula is stolen from jQuery (https://github.com/jquery/jquery/blob/master/src/effects/Tween.js#L106).
// `swing` depends on `Transition`.



// Return a factor given a `progress` between `0` and `1`.
var swing = exports.swing = function (progress) {
	return 0.5 - Math.cos(progress * Math.PI) / 2;
};
