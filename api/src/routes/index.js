import { Router } from 'express';
import config from '../libs/configs/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async () => {
	const router = Router();
	const { suffix, defaults, ...routes } = config.routes;

	try {
		// Mount all defined routes
		for (const [name, route] of Object.entries(routes)) {
			if (!route.enabled || name === 'defaults') continue;

			try {
				const routeModule = await import(
					path.join(__dirname, `${route.path}.${suffix}.js`)
				);
				if (routeModule[route.handler]) {
					routeModule[route.handler](router);
					console.info(`✅ ${name} routes mounted at ${route.path}`);
				} else {
					console.error(
						`❌ Missing ${name} route handler at ${path.join(__dirname, `${route.path}.${suffix}.js`)}`
					);
				}
			} catch (error) {
				console.error(`❌ Failed to load route ${name}:`, error);
			}
		}

		// Finally, mount the default routes if enabled
		if (defaults.enabled) {
			try {
				const defaultModule = await import(
					path.join(__dirname, `${defaults.path}.${suffix}.js`)
				);
				if (defaultModule[defaults.handler]) {
					defaultModule[defaults.handler](router);
					console.info(`✅ default routes mounted at ${defaults.path}`);
					console.info(`💥 Let's fucking go...`);
				} else {
					console.error(`❌ default routes has no handler`);
				}
			} catch (error) {
				console.error('❌ Failed to load default routes:', error);
			}
		}
	} catch (error) {
		console.error('❌ Failed to mount any routes:', error);
		throw new Error(error);
	}

	return router;
};
