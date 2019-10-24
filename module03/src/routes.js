import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Import controllers here.
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

// Middlewares.
import authMiddleware from './app/middlewares/auth';

// Routes.
const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// The following routes use the authMiddleware.
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);

// Upload files routes.
const upload = multer(multerConfig);
routes.post('/files', upload.single('file'), FileController.store);

// Appointments routes.
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.get('/schedules', ScheduleController.index);

export default routes;
