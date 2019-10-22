import { Router } from 'express';

// Route controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// Middlewares
import AuthMiddleware from './app/middlewares/AuthMiddleware'

// Routes
const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// Routes with AuthMiddleware
routes.use(AuthMiddleware);
routes.put('/users', UserController.update);

export default routes;
