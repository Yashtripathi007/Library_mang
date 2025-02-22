import express from "express";
import {
  addBook,
  getAllBooks,
  issueBook,
} from "../controllers/bookController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, adminMiddleware, addBook);
router.get("/getAllBooks", getAllBooks);
router.post("/issue", authMiddleware, issueBook);

export default router;
