// `easeOut` provides a quadratic *ease-out* function. The formula is stolen from jQuery UI (https://github.com/jquery/jquery-ui/blob/master/ui/effect.js#L1559).
// `easeOut` depends on `Transition`.



// Return a factor given a `progress` between `0` and `1`.
easing.easeOut = function (progress) {
	return 1 - Math.pow(1 - progress, 2);
};
