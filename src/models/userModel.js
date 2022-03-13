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
			default: null,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
			default: null,
		},
		address: {
			type: String,
			required: false,
			default: null,
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

UserSchema.pre('findOneAndUpdate', function (next) {
	if (!this._update.password) {
		next();
	}

	this._update.password = bcrypt.hashSync(this._update.password, saltRounds);

	next();
});

UserSchema.plugin(mongooseDelete, {
	overrideMethods: 'all',
	deletedAt: true,
});

UserSchema.virtual('profilePicUrl').get(function () {
	return `${process.env.APP_URL}/${this.profilePic}`;
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
