// import dependencies
const cors = require("cors");
import express from "express";
import { Response, Request } from "express";
import { ContextController } from "./controllers/context.controller";
// creates an express app
export const app = express();
app.use(cors());
app.use(express.json());

app.use("/contexts/", ContextController);
