// import dependencies
import express from "express";
import cors from "cors";
import { contextController } from "./controllers/context.controller";

// creates an express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/contexts/", contextController);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
