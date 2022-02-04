import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import TaskController from './app/controllers/TaskController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Router without auth
routes.post('/users/create', UserController.store);
routes.post('/login', SessionController.store);

// All Routes bellow need auth
routes.use(authMiddleware);

// users
routes.put('/users/update', UserController.update);
routes.delete('/users/delete', UserController.delete);

// tasks
routes.get('/tasks', TaskController.index);
routes.get('/tasks/not-concluded', TaskController.getNotConcluded);
routes.get('/tasks/concluded', TaskController.getConcluded);
routes.post('/tasks/create', TaskController.store);
routes.put('/tasks/update/:id', TaskController.update);
routes.delete('/tasks/delete/:id', TaskController.delete);

export default routes;
