import React, { useState } from "react";
import api from "../services/api";
import ReceiptUpload from "./ReceiptUpload";

export default function TransactionForm({ onAdded }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/transactions", { type, category, amount: Number(amount), date: date || new Date(), notes });
      setTxId(res.data._id);
      setCategory("");
      setAmount("");
      setDate("");
      setNotes("");
      if (onAdded) onAdded();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed");
    } finally { setIsLoading(false); }
  };

  return (
    <div>
      <form onSubmit={submit} className="space-y-3">
        <div className="flex gap-2">
          <select value={type} onChange={e=>setType(e.target.value)} className="p-2 rounded bg-white/10 text-white">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="flex-1 p-2 rounded bg-white/10 text-white" />
        </div>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" type="number" className="w-full p-2 rounded bg-white/10 text-white" />
        <input value={date} onChange={e=>setDate(e.target.value)} type="date" className="w-full p-2 rounded bg-white/10 text-white" />
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" className="w-full p-2 rounded bg-white/10 text-white" />
        <button type="submit" disabled={isLoading} className="w-full py-2 rounded bg-white text-gradientStart">{isLoading ? "Saving..." : "Add"}</button>
      </form>

      <div className="mt-4">
        <h4 className="text-white mb-2">Upload receipt (optional)</h4>
        <ReceiptUpload transactionId={txId} onUploaded={onAdded} />
      </div>
    </div>
  );
}
