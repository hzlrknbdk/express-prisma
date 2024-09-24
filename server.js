import express from "express";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
