import express from 'express';
import config from './libs/configs/index.js';
import { init } from './libs/initializers/index.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	req.requestTime = new Date().toLocaleTimeString();
	console.log(`Hitting: ${req.originalUrl} at ${req.requestTime}`);
	next();
});

export default app;
