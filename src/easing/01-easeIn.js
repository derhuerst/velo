// `easeIn` provides a quadratic *ease-in* functions. The formula is stolen from jQuery UI (https://github.com/jquery/jquery-ui/blob/master/ui/effect.js#L1559).
// `easeIn` depends on `Transition`.



easing.easeIn = function (progress){
	return Math.pow(progress, 2);
};