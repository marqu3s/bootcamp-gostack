import { Router } from 'express';

// Import controllers here.
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// Routes.
const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

export default routes;
