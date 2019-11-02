import { Router } from 'express';

// Route controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import StudentCheckinController from './app/controllers/StudentCheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

// Middlewares
import AuthMiddleware from './app/middlewares/AuthMiddleware';

// Routes without middleware
const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.get('/students/:id/checkins', StudentCheckinController.index);
routes.post('/students/:id/checkins', StudentCheckinController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index); // TODO
routes.post('/students/:id/help-orders', HelpOrderController.store); // TODO

// Routes with AuthMiddleware
routes.use(AuthMiddleware);
routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', HelpOrderController.list); // TODO
routes.post('/help-orders/:id/answer', HelpOrderController.answer); // TODO

export default routes;
