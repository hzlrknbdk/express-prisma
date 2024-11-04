import express from "express";
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfileById,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/", createProfile);

router.put("/:id", updateProfile);

router.delete("/:id", deleteProfile);

router.get("/", getProfiles);

router.get("/:id", getProfileById);

export default router;
