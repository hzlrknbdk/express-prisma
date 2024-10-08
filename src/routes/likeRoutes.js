import express from "express";
import {
  getLikes,
  createLike,
  deleteLike,
  getLikeById,
} from "../controllers/likeController.js";

const router = express.Router();

router.get("/likes", getLikes);

router.post("/likes", createLike);

router.get("/likes/:id", getLikeById);

router.delete("/likes/:id", deleteLike);

export default router;
