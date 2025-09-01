import React, { useState } from "react";
import api from "../services/api";

export default function TransactionUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a PDF file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await api.post("/transactions/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Transactions imported successfully!");
      setFile(null);
      if (onUploaded) onUploaded();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col items-center gap-4 glass p-6 rounded-2xl">
      <label
        htmlFor="pdfUpload"
        className="cursor-pointer px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20 transition"
      >
        {file ? file.name : "Select PDF"}
      </label>
      <input
        id="pdfUpload"
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 rounded bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold shadow-lg hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300"
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </form>
  );
}
