import {
  getUsers,
  patchUser,
  deleteUser,
  createUser,
  updateUser,
  getUserById,
  createManyUser,
  updateManyUser,
  getUserFindMany,
  getUserFindFirst,
} from "../controllers/userController.js";

import express from "express";

const router = express.Router();

router.get("/", getUsers);

router.post("/", createUser);

router.post("/many", createManyUser);

router.get("/first", getUserFindFirst);

router.get("/many", getUserFindMany);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.put("/many/:lastName", updateManyUser);

router.delete("/:id", deleteUser);

router.patch("/:id", patchUser);

export default router;
