import { signup, login, logout } from '../services/auth.service.js';

export default router => {
	router.post('/signup', signup);
	router.post('/login', login);
	router.post('/logout', logout);
	return router;
};
