import mongoose from 'mongoose';

export const startDB = async ({ mongo }) => {
	const { protocol, username, password, database, url } = mongo;

	const connectionUri = `${protocol}${username}:${encodeURIComponent(password)}@${url}/${database}?authSource=admin`;

	try {
		return await mongoose.connect(connectionUri);
	} catch (error) {
		console.error('Error connecting to DB:', error.message);
		throw new Error();
	}
};
