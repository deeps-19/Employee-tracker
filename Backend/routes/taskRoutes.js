import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { permit } from "../middlewares/roleMiddleware.js";
import {
  createTask,
  assignTask,
  updateStatus,
  myTasks,
  allTasks
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);

// Admin assigns task
router.put("/assign/:id", authMiddleware, permit("admin"), assignTask);

// User updates task status
router.put("/status/:id", authMiddleware, updateStatus);

// My tasks
router.get("/my", authMiddleware, myTasks);

// Admin view all
router.get("/all", authMiddleware, permit("admin"), allTasks);

export default router;
