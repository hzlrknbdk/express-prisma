import express from "express";

import {
  createPostCategory,
  deletePostCategory,
} from "../controllers/postCategoryController.js";

const router = express.Router();

router.get("/post-categories", createPostCategory);

router.post("/post-categories/:postId/:categoryId", deletePostCategory);

export default router;
