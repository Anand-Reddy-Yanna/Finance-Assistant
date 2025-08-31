import React, { useEffect, useState } from "react";
import TransactionForm from "../widgets/TransactionForm";
import TransactionList from "../widgets/TransactionList";
import api from "../services/api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });

  const load = async (p = 1) => {
    const q = new URLSearchParams({ page: p, limit: 10, ...filters }).toString();
    const res = await api.get(`/transactions?${q}`);
    setTransactions(res.data.transactions || []);
    setPage(res.data.currentPage || 1);
    setPages(res.data.totalPages || 1);
  };

  useEffect(() => { load(1); }, [filters]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 glass p-6 rounded-2xl">
        <h3 className="text-white text-xl mb-4">Transactions</h3>

        <div className="mb-4 flex gap-2">
          <input type="date" value={filters.startDate} onChange={(e)=>setFilters(s=>({...s, startDate: e.target.value}))} className="p-2 rounded bg-white/10 text-white" />
          <input type="date" value={filters.endDate} onChange={(e)=>setFilters(s=>({...s, endDate: e.target.value}))} className="p-2 rounded bg-white/10 text-white" />
          <button onClick={()=>load(1)} className="px-3 py-2 rounded bg-white/10 text-white">Filter</button>
        </div>

        <TransactionList transactions={transactions} onRefresh={()=>load(page)} />

        <div className="mt-4 flex items-center justify-between text-white/80">
          <button disabled={page<=1} onClick={()=>load(page-1)} className="px-3 py-2 rounded bg-white/10">Prev</button>
          <span>Page {page} / {pages}</span>
          <button disabled={page>=pages} onClick={()=>load(page+1)} className="px-3 py-2 rounded bg-white/10">Next</button>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl">
        <h3 className="text-white text-xl mb-4">Add Transaction</h3>
        <TransactionForm onAdded={()=>load(1)} />
      </div>
    </div>
  );
}
