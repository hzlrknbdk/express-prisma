import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { routeManager } from "./src/middlewares/routeManager.js";
import authenticateToken from "./src/middlewares/authenticateToken.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

routeManager(app, authenticateToken);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
