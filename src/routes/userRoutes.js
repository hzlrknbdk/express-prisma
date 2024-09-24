import express from "express";
import { userController } from "../controllers/controllers.js";

const router = express.Router();

router.get("/users", userController.getUsers);

router.post("/users", userController.createUser);

router.post("/users/many", userController.createManyUser);

router.get("/users/first", userController.getUserFindFirst);

router.get("/users/many", userController.getUserFindMany);

router.get("/users/:id", userController.getUserById);

router.put("/users/:id", userController.updateUser);

router.put("/users/many/:lastName", userController.updateManyUser);

router.delete("/users/:id", userController.deleteUser);

router.patch("/users/:id", userController.patchUser);

export default router;
