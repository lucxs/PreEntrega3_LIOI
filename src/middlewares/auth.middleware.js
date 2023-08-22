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

// middleware for role admin administration

const middlewarePassportJWTAdmin = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		
		if (err) {
			next(err);
		}
		
			if(!usr){

				return res.send({"message":"error de usuario"});
	   
		   }

		   	 if (usr.user.role === "admin") {

					req.user =  usr;
			 		return next();
   
			 }else{

				return res.send({"message":"error de auth"});
			 }
   
		
		
	})(req, res, next);
};

// middleware for role users adminitration

const middlewarePassportJWTUser = async (req, res, next) => {
	passport.authenticate('current', { session: false }, (err, usr, info) => {
		
		if (err) {
			next(err);
		}
		
			if(!usr){

				return res.send({"message":"error de usuario"});
	   
		   }

		   	 if (usr.user.role === "user") {

					req.user =  usr;
			 		return next();
   
			 }else{

				return res.send({"message":"error de auth"});
			 }
   
		
		
	})(req, res, next);
};



export { middlewarePassportJWT,middlewarePassportJWTAdmin, middlewarePassportJWTUser };


