import { extractText } from "../utils/ocr.js";
import Transaction from "../models/Transaction.js";

export const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const text = await extractText(req.file.path);

    const transaction = await Transaction.findByIdAndUpdate(
      req.body.transactionId,
      { receiptUrl: `/uploads/${req.file.filename}`, extractedText: text },
      { new: true }
    );

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
