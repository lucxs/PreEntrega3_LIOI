import passport from 'passport';


export function isAuth(req, res, next){

    if (req.session.user) {
        next()
    }else{
        res.redirect('/products');
    }

    
}

export function isGuest(req, res, next) {
    if (!req.session.user) {
        next();
    } else {
        res.redirect('/products');
    }
}

const middlewarePassportJWT = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
            const message = "No tiene permitido el acceso a esta seccion"
			res.redirect('/serverError');
		}

		req.user = usr;
		next();
	})(req, res, next);
};

export { middlewarePassportJWT };


