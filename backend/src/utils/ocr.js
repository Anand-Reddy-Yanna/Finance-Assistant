import Tesseract from "tesseract.js";
import pdfParse from "pdf-parse";
import fs from "fs";

export const extractText = async (filePath) => {
  const ext = filePath.split(".").pop().toLowerCase();

  try {
    if (ext === "pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      if (pdfData.text.trim().length > 0) {
        return pdfData.text;
      }
      // fallback: pdf with images → OCR
      return (await Tesseract.recognize(filePath, "eng")).data.text;
    } else {
      // image
      return (await Tesseract.recognize(filePath, "eng")).data.text;
    }
  } catch (error) {
    console.error("OCR error:", error);
    return "";
  }
};
