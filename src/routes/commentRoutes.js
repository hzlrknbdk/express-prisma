import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/comments", getComments);

router.post("/comments", createComment);

router.get("/comments/:id", getCommentById);

router.put("/comments/:id", updateComment);

router.delete("/comments/:id", deleteComment);

export default router;
