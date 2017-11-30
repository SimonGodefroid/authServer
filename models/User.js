const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// Define our model
const userSchema = new Schema({
	email: { type: String, unique: true },
	password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
	// get access to the user model
	const user = this; // user instance

	// generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}
		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}
			// overwrite plain text password with encoded password
			user.password = hash;
			next();
		});
	});
});
// method to compare 2 passwords stored vs candidate
userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

//
// Create the model class
const ModelClass = mongoose.model('user', userSchema);
// Export the model
module.exports = ModelClass;
