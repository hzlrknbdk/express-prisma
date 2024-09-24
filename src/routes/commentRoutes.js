import express from "express";
import { commentController } from "../controllers/controllers.js";

const router = express.Router();

router.get("/comments", commentController.getComments);

router.post("/comments", commentController.createComment);

router.get("/comments/:id", commentController.getCommentById);

router.put("/comments/:id", commentController.updateComment);

router.delete("/comments/:id", commentController.deleteComment);

export default router;
