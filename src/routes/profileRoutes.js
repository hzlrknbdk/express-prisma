import express from "express";
import { profileController } from "../controllers/controllers.js";

const router = express.Router();

router.post("/profiles", profileController.createProfile);

router.put("/profiles/:id", profileController.updateProfile);

router.delete("/profiles/:id", profileController.deleteProfile);

router.get("/profiles", profileController.getProfiles);

router.get("/profiles/:id", profileController.getProfileById);

export default router;
