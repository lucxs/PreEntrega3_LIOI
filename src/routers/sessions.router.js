import { Router } from 'express';
import passport from 'passport';

const sessionsRouter = Router();

sessionsRouter.get('/github',
passport.authenticate('github', {scope: ['user:email']}), 
async(req, res) => {});

sessionsRouter.get(
	'/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		req.session.user = req.user;
		res.redirect('/products');
	}
);

sessionsRouter.get('/current',passport.authenticate('current',{session: false}),

(req,res)=>{

const user = req.user

})


export default sessionsRouter;