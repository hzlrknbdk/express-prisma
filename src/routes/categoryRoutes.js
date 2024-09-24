import express from "express";
import { categoryController } from "../controllers/controllers.js";

const router = express.Router();

router.get("/categories", categoryController.getCategories);

router.post("/categories", categoryController.createCategory);

router.get("/categories/:id", categoryController.getCategoryById);

router.put("/categories/:id", categoryController.updateCategory);

router.delete("/categories/:id", categoryController.deleteCategory);
