import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";

import routes from "./routes";
import errorHandler from "./errors/handler";

import "./database/connection";

import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

app.use(routes);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server started!");
});
