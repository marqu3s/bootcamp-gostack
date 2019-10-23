import { Router } from 'express';

// Route controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';

// Middlewares
import AuthMiddleware from './app/middlewares/AuthMiddleware';

// Routes
const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// Routes with AuthMiddleware
routes.use(AuthMiddleware);
routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

export default routes;
