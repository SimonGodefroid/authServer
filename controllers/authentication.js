const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config');
//
//
function tokenForUser(user) {
	// jwt have a sub property by convention sub = subject
	const timestamp = new Date().getTime();
	// iat = issued at time
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide an email and password' });
	}
	// See if a user with the given email exists
	//
	//
	User.findOne({ email: email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		// If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).json({ error: 'Email is in use' });
		}
		//
		//
		// If a user with email does NOT exist, create and save user record
		const user = new User({
			email: email,
			password: password
		});
		user.save(err => {
			if (err) {
				return next(err);
			}
			res.json({ success: true, token: tokenForUser(user) });
		});
		//
		//
		// Respond to request indicating the user was created
		//
		//
	});
};
