import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: [true, 'Username already exists'],
			minlength: 3,
			maxlength: 20
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: [true, 'Email already exists'],
			lowercase: true,
			validate: [validator.isEmail, 'Please enter a valid email address']
		},
		photo: { type: String, default: 'default.jpg' },
		role: { type: String, enum: ['admin', 'user'], default: 'user' },
		searchHistory: { type: Array, default: [] },
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: 8,
			maxlength: 45,
			select: false
		},
		resetToken: String,
		resetExpires: Date
	},
	{
		timestamps: true
	}
);

// Hash the password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

// Compare req.body.password to saved password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Create resetToken for user
userSchema.methods.addResetToken = async function () {
	const token = crypto.randomBytes(32).toString('hex');
	this.resetToken = crypto.createHash('sha256').update(token).digest('hex');
	this.resetExpires = Date.now() + 10 * 60 * 1000;
	return token;
};

export default mongoose.model('User', userSchema);
