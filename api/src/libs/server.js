import config from './config.js';
import app from '../app.js';
import { init } from './init/index.js';

export const server = async () => {
	try {
		await init(app, config);
		app.listen(config.port, () => {
			console.log(`🚀 Server running on port ${config.port}`);
		});
	} catch (error) {
		console.error('Failed to initialize application:', error);
		process.exit(1);
	}
};
