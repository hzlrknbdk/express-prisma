import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);

router.get("/", getEvents);

router.get("/:id", getEventById);

router.delete("/:id", deleteEvent);

export default router;
