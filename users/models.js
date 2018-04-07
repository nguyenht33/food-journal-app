'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	firstname: {
		type: String,
		minlength: 1,
		trim: true
	},
	lastname: {
		type: String,
		minlength: 1,
		trim: true
	},
	entries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Entry'
	}]
});

UserSchema.methods.serialize = function() {
	return {
		id: this._id,
		username: this.username || '',
		firstname: this.firstname || '',
		lastname: this.lastname || ''
	};
};

// UserSchema.pre('save', function(next) {
// 	var user = this;
// 	bcrypt.hash(this.password, 10, function(err, hash) {
// 		user.password = hash;
// 		next();
// 	});
// });

// UserSchema.pre('update', function(next) {
// 	var user = this;
// 	bcrypt.hash(this.password, 10, function(err, hash) {
// 		user.password = hash;
// 		next();
// 	});
// });

UserSchema.methods.validatePassword = function(password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};

