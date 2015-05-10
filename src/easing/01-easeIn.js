// `easeIn` provides a quadratic *ease-in* function. The formula is stolen from jQuery UI (https://github.com/jquery/jquery-ui/blob/master/ui/effect.js#L1559).
// `easeIn` depends on `Transition`.



// Return a factor given a `progress` between `0` and `1`.
easing.easeIn = function (progress){
	return Math.pow(progress, 2);
};