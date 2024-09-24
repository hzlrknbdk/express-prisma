import express from "express";
import { likeControllers } from "../controllers/controllers.js";

const router = express.Router();

router.get("/likes", likeControllers.getLikes);

router.post("/likes", likeControllers.createLike);

router.get("/likes/:id", likeControllers.getLikeById);

router.delete("/likes/:id", likeControllers.deleteLike);

export default router;
