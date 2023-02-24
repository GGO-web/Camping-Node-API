import express, { Express } from "express";

import morgan from "morgan";

import cors from "cors";

import { getDirectories } from "./helpers/getDirectoryStructure";

// middlewares
const { errorHandler } = require("./middleware/errorMiddleware");

// configs
require("dotenv").config();
require("./utils/mongoConnection");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: "50mb"}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// swagger api documentation route: http://localhost:8080/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// register all features routers
getDirectories("./src/features").map(async (feature) => {
  console.log(`Registering router: ${feature}`);

  const router = await import(`./features/${feature}/${feature}.router`);

  app.use(`/api/${feature}`, router.default);
});


// listening server startup
(async () => {
  try {
    app.listen(process.env.PORT || 9090, () => {
      console.log(`Server started on port: ${process.env.PORT || 9090}`);
    });
  } catch (err: any) {
    console.error(`Error on server startup: ${err.message}`);
  }
})();

// ERROR HANDLER
app.use(errorHandler);
