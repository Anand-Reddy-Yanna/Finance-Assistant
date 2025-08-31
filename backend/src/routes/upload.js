import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadReceipt } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", protect, upload.single("file"), uploadReceipt);

export default router;
