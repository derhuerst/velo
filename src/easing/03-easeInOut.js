// `easeInOut` provides a quadratic *ease-in* functions. The formula is stolen from jQuery UI (https://github.com/jquery/jquery-ui/blob/master/ui/effect.js#L1559).
// `easeInOut` depends on `Transition`.



easing.easeInOut = function (progress){
	if (progress < 0.5)
		return Math.pow(2 * progress, 2) / 2;
	else
		return 1 - Math.pow(-2 * progress + 2, 2) / 2;
};