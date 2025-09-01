import React from "react";
import TransactionUpload from "../widgets/TransactionUpload";

export default function UploadPage() {
  return (
    <div className="max-w-md mx-auto glass p-6 rounded-2xl mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Upload Transaction History (PDF)</h2>
      <TransactionUpload onUploaded={() => alert("Uploaded successfully")} />
    </div>
  );
}
