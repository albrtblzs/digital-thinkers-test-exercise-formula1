import express from 'express';
import driverController from './controller/driver.controller';
// import dotenv from 'dotenv';
// import session from 'express-session';
// import { initControllers } from './app.controller';
// import { initAuthControllers } from './auth.controller';
// import { authMiddleware } from './auth.middleware';
// import { loggingMiddleware } from './logging.middleware';


export const startApp = async (): Promise<void> => {

	const app: express.Application = express();
	const port: number = parseInt(process.env.PORT || '3000');


	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	// app.use(loggingMiddleware);

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept')
		res.setHeader('Access-Control-Allow-Methods',
			'GET, POST, PATCH, DELETE, OPTIONS')
		next();
	});

	// initAuthControllers(app);
	driverController(app);

	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});
}
