export default {
	port: process.env.PORT || 3000,
	mode: {
		dev: process.env.NODE_ENV === 'development',
		live: process.env.NODE_ENV === 'production',
		staging: process.env.NODE_ENV === 'staging',
		test: process.env.NODE_ENV === 'test'
	},
	api: {
		prefix: '/api/v1',
		version: '1'
	},
	db: {
		protocol: process.env.DB_PROTOCOL,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		url: process.env.DB_URL,
		database: process.env.DB_DATABASE
	},
	jwt: {
		name: process.env.JWT_NAME,
		secret: process.env.JWT_SECRET,
		expiration: process.env.JWT_EXPIRATION,
		cookies: process.env.JWT_COOKIES
	},
	mail: {
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD
		}
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
		suffix: 'routes',
		defaults: {
			// default routes - don't change
			enabled: true,
			handler: 'defaults',
			path: '/defaults'
		},
		auth: {
			enabled: true,
			handler: 'auth',
			path: '/auth'
		},
		search: {
			enabled: true,
			handler: 'search',
			path: '/search'
		}
	}
};
