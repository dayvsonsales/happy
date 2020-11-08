import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import LoginController from "./controllers/auth/LoginController";

import OrphanagesController from "./controllers/OrphanagesController";
import UsersController from "./controllers/UsersController";

import AuthMiddleware from "./middlewares/AuthMiddleware";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/users", UsersController.create);
routes.post("/login", LoginController.create);

routes.use(AuthMiddleware);

routes.get("/users", UsersController.index);
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

export default routes;
