// `easeOut` provides a quadratic *ease-in* functions. The formula is stolen from jQuery UI (https://github.com/jquery/jquery-ui/blob/master/ui/effect.js#L1559).
// `easeOut` depends on `Transition`.



easing.easeOut = function (progress){
	return 1 - Math.pow(1 - progress, 2);
};