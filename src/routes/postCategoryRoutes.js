import express from "express";
import { postCategoryController } from "../controllers/controllers.js";

const router = express.Router();

router.get("/post-categories", postCategoryController.createPostCategory);

router.post(
  "/post-categories/:postId/:categoryId",
  postCategoryController.deletePostCategory
);
