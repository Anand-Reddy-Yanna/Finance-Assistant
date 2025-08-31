import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addTransaction, getTransactions, getSummary } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.get("/summary", protect, getSummary);

export default router;
