import { Router } from "express";
import { SessionController } from "./controllers/SessionController";
import { UserController } from "./controllers/UserController";
import { AuthMiddleware } from "./middlewares/auth";

const routes = Router();

const authMiddleware = new AuthMiddleware();
const userController = new UserController();
const sessionController = new SessionController();

routes.post('/login', sessionController.create);

routes.get('/user/:email', userController.findByEmail);
routes.post('/user', userController.create);
routes.patch('/user/:id', authMiddleware.user, userController.update);
routes.delete('/user/:id', authMiddleware.user, userController.delete);

export { routes };