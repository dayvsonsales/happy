import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import AcceptOrphanageController from "./controllers/AcceptOrphanageController";
import LoginController from "./controllers/auth/LoginController";
import ResetPasswordController from "./controllers/auth/ResetPasswordController";

import OrphanagesController from "./controllers/OrphanagesController";
import RefuseOrphanageController from "./controllers/RefuseOrphanageController";
import UsersController from "./controllers/UsersController";

import AuthMiddleware from "./middlewares/AuthMiddleware";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/users", UsersController.create);
routes.post("/login", LoginController.create);
routes.post("/reset", ResetPasswordController.create);
routes.post("/reset-password/:token", UsersController.update);
routes.post("/orphanages", upload.array("files"), OrphanagesController.create);

routes.use(AuthMiddleware);

routes.get("/users", UsersController.index);
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages/:id/refuse", RefuseOrphanageController.create);
routes.post("/orphanages/:id/accept", AcceptOrphanageController.create);
routes.delete("/orphanages/:id", OrphanagesController.destroy);

routes.put(
  "/orphanages/edit/:id",
  upload.array("files"),
  OrphanagesController.update
);

export default routes;
