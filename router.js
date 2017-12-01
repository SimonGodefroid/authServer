const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
// specify to use the middleware and disable session
const requireAuth = passport.authenticate('jwt', { session: false });

const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
	app.get('/', requireAuth, (req, res) => {
		res.send({ message: 'Super Secret code is ABC123' });
	});
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
};
