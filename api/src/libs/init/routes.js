import { Router } from 'express';
import config from '../config.js';

export const initRoutes = async app => {
	const { suffix, ...routes } = config.routes;

	// Sort routes to ensure defaults comes last
	const sortedRoutes = Object.entries(routes).sort(([a], [b]) => {
		if (a === 'defaults') return 1;
		if (b === 'defaults') return -1;
		return 0;
	});

	for (const [key, route] of sortedRoutes) {
		if (!route.enabled) continue;

		try {
			const module = await import(`../../routes/${route.handler}.${suffix}.js`);
			const _handler = module.default;

			if (!_handler) {
				console.error(`❌ Missing handler for ${route.handler} route`);
				continue;
			}

			const router = Router();
			_handler(router);
			console.info(
				`✅ ${route.handler} routes mounted at ${route.path}.${suffix}.js`
			);
			app.use(config.api.prefix + route.path, router);
		} catch (error) {
			console.error(`❌ Error loading ${route.handler} route:`, error.message);
		}
	}

	console.info('🥰 All routes mounted successfully');
};
