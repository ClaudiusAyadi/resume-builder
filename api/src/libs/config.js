export default {
	port: process.env.PORT || 3000,
	mode: {
		dev: process.env.NODE_ENV === 'development',
		live: process.env.NODE_ENV === 'production',
		staging: process.env.NODE_ENV === 'staging',
		test: process.env.NODE_ENV === 'test',
	},
	api: {
		name: process.env.APP_NAME || 'API',
		prefix: process.env.APP_PREFIX || '/api/v1',
		version: process.env.APP_VERSION || '1.0.0',
	},
	db: {
		protocol: process.env.DB_PROTOCOL || 'mongodb://',
		url: process.env.DB_URL || 'localhost:27017',
		database: process.env.DB_DATABASE || 'test_db',
	},

	jwt: {
		name: process.env.JWT_NAME,
		secret: process.env.JWT_SECRET,
		expiration: process.env.JWT_EXPIRATION,
		cookies: process.env.JWT_COOKIES,
	},

	/**
	 * Routes configuration
	 * @property {Object} routes - Routes definitions
	 * @property {string} routes[].path - Base path for the route, (e.g. '/users')
	 * @property {boolean} routes[].enabled - Whether the route is on or off
	 * @property {string} routes[].suffix - Suffix for the route files
	 * @property {string} routes[].handler - Path to the route handler relative to the routes directory
	 */
	routes: {
		auth: {
			enabled: true,
			handler: 'auth',
			path: '/auth',
		},
		users: {
			enabled: true,
			handler: 'users',
			path: '/users',
		},
		defaults: {
			// default routes - do not change
			enabled: true,
			handler: 'defaults',
			path: '/defaults',
		},
		suffix: 'routes',
	},
};
