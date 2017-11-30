const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
// disables the session
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
	app.get('/', requireAuth, (req, res) => {
		res.send({ hi: 'there' });
	});
	app.post('/signup/', Authentication.signup);
};
