import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import mongooseDelete from 'mongoose-delete';

const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const saltRounds = 10;
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
			index: true,
		},
		profilePic: {
			type: String,
			required: false,
			default: '',
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
			default: '',
		},
		address: {
			type: String,
			required: false,
			default: '',
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		isVerified: {
			type: Boolean,
			required: false,
			default: false,
		},
		isRegistrationComplete: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	{
		timestamps: true,
		toObject: { getters: true },
		toJSON: { getters: true },
	},
);

UserSchema.plugin(mongooseAggregatePaginate);

UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	if (this.password !== undefined) {
		this.password = bcrypt.hashSync(this.password, saltRounds);
	}

	next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.pre('updateOne', function (next) {
	if (!this._update.$set.password) {
		next();
	}

	this._update.$set.password = bcrypt.hashSync(
		this._update.$set.password,
		saltRounds,
	);

	next();
});

UserSchema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true,
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
