import config from '../libs/config.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// create and sign token
export const sendToken = (user, statusCode, res) => {
	const token = jwt.sign({ id: user._id }, config.jwt.secret, {
		expiresIn: config.jwt.expiration,
	});
	const cookieOptions = {
		expires: new Date(Date.now() + config.jwt.cookies * 24 * 60 * 60 * 1000),
		httpOnly: true,
		secure: config.mode.live,
	};

	res.cookie(config.api.name, token, cookieOptions);
	user.password = undefined; // remove password from the response

	res.status(statusCode).json({
		success: true,
		token,
		data: user,
	});
};

export const signup = async (req, res) => {
	try {
		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		sendToken(newUser, 201, res);
	} catch (error) {
		console.error(error.message);
		res.status(400).json({
			success: false,
			message: error.message || 'Signup failed',
		});
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message: 'All fields are required.',
		});
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user || !(await user.comparePassword(password))) {
		return res.status(401).json({
			success: false,
			message: 'Invalid credentials.',
		});
	}

	sendToken(user, 200, res);
};

export const logout = async (req, res) => {
	try {
		res.clearCookie(config.jwt.name);
		res.status(200).json({
			success: false,
			message: 'Logged out successfully.',
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			success: false,
			message: 'Server error, please try again later.',
		});
	}
};

export const protect = async (req, res, next) => {
	try {
		const token = req.cookies[config.jwt.name];
		if (!token)
			return res
				.status(401)
				.json({
					success: false,
					message: 'Unathourized - Please log in to gain access!',
				});

		const decoded = jwt.verify(token, config.jwt.secret);
		if (!decoded)
			return res
				.status(401)
				.json({
					success: false,
					message: 'Unathourized - Please log in to gain access!',
				});

		const user = await User.findById(decoded.id);
		if (!user)
			return res
				.status(401)
				.json({ success: false, message: 'User does no longer exist.' });

		req.user = user;
		next();
	} catch (error) {
		console.error(error.message);
		res
			.status(500)
			.json({
				success: false,
				message: 'Server error, please try again later.',
			});
	}
};
