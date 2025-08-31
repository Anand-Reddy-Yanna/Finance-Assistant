import React from "react";
import api from "../services/api";

export default function TransactionList({ transactions = [], onRefresh }) {
  const del = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    await api.delete(`/transactions/${id}`).catch(e => alert(e.response?.data?.message || "Error"));
    if (onRefresh) onRefresh();
  };

  return (
    <div className="space-y-3">
      {transactions.length === 0 ? <div className="text-white/80">No transactions</div> : transactions.map(tx => (
        <div key={tx._id} className="p-3 rounded bg-white/5 flex items-start justify-between">
          <div>
            <div className="text-white font-semibold">{tx.category} • {tx.type}</div>
            <div className="text-white/80">{new Date(tx.date).toLocaleDateString()} • ₹{tx.amount}</div>
            {tx.extractedText && <details className="mt-2 text-sm text-white/70"><summary>Receipt text</summary><pre className="whitespace-pre-wrap">{tx.extractedText}</pre></details>}
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={()=>navigator.clipboard.writeText(tx._id)} className="px-2 py-1 rounded bg-white/10 text-white text-sm">Copy ID</button>
            <button onClick={()=>del(tx._id)} className="px-2 py-1 rounded bg-red-500/80 text-white text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

