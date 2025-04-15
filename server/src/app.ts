// import dependencies
import express from "express";
import cors from "cors";

// creates an express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/items", itemRoutes);
// app.use("/users/", UserController);
// app.use("/orders/", OrdersController);
// app.use("/categories", CategoryController);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
