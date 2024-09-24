import express from "express";
import { postController } from "../controllers/controllers.js";

const router = express.Router();

router.get("/posts", postController.getPosts);

router.post("/posts", postController.createPost);

router.get("/posts/:id", postController.getPostById);

router.put("/posts/:id", postController.updatePost);

router.delete("/posts/:id", postController.deletePost);

export default router;
