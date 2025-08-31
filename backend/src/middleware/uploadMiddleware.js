import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = process.env.UPLOAD_DIR || "uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".pdf"].includes(ext)) cb(null, true);
  else cb(new Error("Only images or PDFs allowed"));
};

const upload = multer({ storage, fileFilter });
export default upload;
