import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

// Login routes
routes.post('/login', SessionController.store);

// User routes
routes.post('/user/create', UserController.store);

export default routes;
