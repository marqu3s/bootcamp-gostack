import { Router } from 'express';

// Import controllers here.
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// Middlewares.
import authMiddleware from './app/middlewares/auth';

// Routes.
const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// The following routes use the authMiddleware.
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
