import { Router } from 'express';

const defaultRouter = Router();

export const defaults = router => {
	defaultRouter.get('/', (req, res) => {
		res.json({ message: 'Hello from defaults!' });
	});

	defaultRouter.all('*', (req, res) => {
		res.status(404).json({ message: 'Page not found' });
	});

	router.use('/', defaultRouter);
};
