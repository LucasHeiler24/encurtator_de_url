import { Router } from "express";
import { all, createUrl, deleteUrl, redirect } from "../controllers/UrlController.js";
import { auth } from "../middlewares/auth.js";

const routerUrl = Router();

routerUrl.get('/', auth, all);
routerUrl.get('/:key', auth, redirect);
routerUrl.post('/', auth, createUrl);
routerUrl.delete('/:id', auth, deleteUrl);

export default routerUrl;