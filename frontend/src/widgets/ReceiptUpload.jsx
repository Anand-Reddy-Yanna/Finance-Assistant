import React, { useState } from "react";
import api from "../services/api";

export default function ReceiptUpload({ transactionId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");
    if (!transactionId) return alert("Save the transaction first (it needs an id).");

    const form = new FormData();
    form.append("file", file);
    form.append("transactionId", transactionId);

    setLoading(true);
    try {
      await api.post("/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
      setFile(null);
      if (onUploaded) onUploaded();
      alert("Receipt uploaded");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input type="file" accept="image/*,.pdf" onChange={e=>setFile(e.target.files[0])} />
      <button type="submit" disabled={loading} className="px-3 py-2 rounded bg-white/10 text-white">{loading ? "Uploading..." : "Upload"}</button>
    </form>
  );
}
