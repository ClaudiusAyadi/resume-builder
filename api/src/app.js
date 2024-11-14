import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors());

app.use((req, res, next) => {
	req.requestTime = new Date().toLocaleTimeString();
	console.info(`${req.requestTime}: ${req.method} - ${req.originalUrl}`);
	next();
});

export default app;
