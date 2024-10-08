import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from "../controllers/postController.js";
import express from "express";

const router = express.Router();

router.get("/posts", getPosts);

router.post("/posts", createPost);

router.get("/posts/:id", getPostById);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

export default router;
