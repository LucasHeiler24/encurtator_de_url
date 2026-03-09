import { Router } from "express";
import { signin, signup } from "../controllers/UserController.js";

const routerUser = Router();

routerUser.post('/signup', signup);
routerUser.post('/signin', signin);

export default routerUser;