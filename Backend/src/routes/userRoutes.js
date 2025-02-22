import express from "express";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllUsers", authMiddleware, adminMiddleware, getAllUsers);

export default router;
