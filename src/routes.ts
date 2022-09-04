import { Router } from "express";
import { UserController } from "./controllers/userController";

const routes = Router();

const userController = new UserController();

routes.get('/user/:email', userController.findByEmail);
routes.post('/user', userController.create);
routes.patch('/user/:id', userController.update);
routes.delete('/user/:id', userController.delete);

export { routes };