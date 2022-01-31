import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Router without auth
routes.post('/user/create', UserController.store);
routes.post('/login', SessionController.store);

// All Routes bellow need auth
routes.use(authMiddleware);

routes.put('/user/update', UserController.update);

export default routes;
