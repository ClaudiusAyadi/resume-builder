import { startDB } from './db.js';
import { startRoutes } from './routes.js';

export const init = async (app, config) => {
	startDB(config);
	startRoutes(app);
};
