import { initDB } from './db.js';
import { initRoutes } from './routes.js';

export const init = async (app, config) => {
	await initDB(config);
	await initRoutes(app);
	// return app;
};
