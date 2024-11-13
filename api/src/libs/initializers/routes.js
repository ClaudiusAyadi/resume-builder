import config from '../configs/index.js';
import routes from '../../routes/index.js';

export const startRoutes = async app => {
	app.use(config.api.prefix, await routes());
};
