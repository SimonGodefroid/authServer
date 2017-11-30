const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
	// indicate to JWT that the token is in the header
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};
//
// Create JWT strategy
// payload = decoded jwt token
// done = function that runs whether we succeed
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that user
	// Otherwise, call done without a user object
	User.findById(payload.sub, function(err, user) {
		if (err) {
			// err occured
			return done(err, false);
		}
		if (user) {
			// found the user no error
			done(null, user);
		} else {
			// did not find user and no error
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
//
passport.use(jwtLogin);
