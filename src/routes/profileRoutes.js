import express from "express";
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfileById,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/profiles", createProfile);

router.put("/profiles/:id", updateProfile);

router.delete("/profiles/:id", deleteProfile);

router.get("/profiles", getProfiles);

router.get("/profiles/:id", getProfileById);

export default router;
