import express from "express";
import routers from "./router.js";
import { verifyUser } from "./authentication.js";

const app = express();
app.use(express.json());

// Public routes
app.use("/api", routers.userRouter);

// Protected routes
app.use("/api", verifyUser, routers.router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
