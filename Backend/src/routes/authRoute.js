import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/authController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", authMiddleware, adminMiddleware, registerUser);
router.post("/login", loginUser);
router.get("/getUser", authMiddleware, getUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;
