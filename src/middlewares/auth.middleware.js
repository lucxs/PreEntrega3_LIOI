import passport from 'passport';


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


