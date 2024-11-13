import config from './configs/index.js';
import app from '../app.js';
import { init } from './initializers/index.js';

export const server = async () => {
	const port = config.port;

	try {
		app.listen(port, async () => {
			await init(app, config);
			console.info(`🚀 Server up & running on port ${port}`);
		});
	} catch (error) {
		console.error('Error starting server:', error.message);
	}
};
