import mongoose from 'mongoose';

export const initDB = async ({ db }) => {
	const { protocol, url, database } = db;
	const uri = `${protocol}${url}/${database}?authSource=admin&retryWrites=false`;

	try {
		await mongoose.connect(uri);
		console.info(
			`😻 DB connected: ${mongoose.connection.name} on ${mongoose.connection.host}`
		);
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw error;
	}
};
