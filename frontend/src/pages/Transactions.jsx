import React, { useEffect, useState } from "react";
import TransactionForm from "../widgets/TransactionForm";
import TransactionList from "../widgets/TransactionList";
import TransactionUpload from "../widgets/TransactionUpload";
import api from "../services/api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: ""
  });

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
      {/* Transactions & Filters */}
      <div className="md:col-span-2 glass p-6 rounded-2xl flex flex-col gap-4">
        <h3 className="text-white text-xl font-semibold mb-4">Transactions</h3>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="flex flex-col">
            <label className="text-white/80 text-sm mb-1">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(s => ({ ...s, startDate: e.target.value }))}
              className="p-2 rounded bg-white/10 text-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white/80 text-sm mb-1">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(s => ({ ...s, endDate: e.target.value }))}
              className="p-2 rounded bg-white/10 text-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white/80 text-sm mb-1">Category</label>
            <input
              type="text"
              value={filters.category}
              onChange={(e) => setFilters(s => ({ ...s, category: e.target.value }))}
              placeholder="e.g., Food, Travel"
              className="p-2 rounded bg-white/10 text-white placeholder-white/60"
            />
          </div>
          <button
            onClick={() => load(1)}
            className="px-3 py-2 rounded bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300"
          >
            Filter
          </button>
        </div>

        {/* Transaction List */}
        <div className="flex-1 max-h-[400px] overflow-y-auto mt-2">
          <TransactionList transactions={transactions} onRefresh={() => load(page)} />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-white/80 mt-2">
          <button
            disabled={page <= 1}
            onClick={() => load(page - 1)}
            className="px-3 py-2 rounded bg-white/10"
          >
            Prev
          </button>
          <span>Page {page} / {pages}</span>
          <button
            disabled={page >= pages}
            onClick={() => load(page + 1)}
            className="px-3 py-2 rounded bg-white/10"
          >
            Next
          </button>
        </div>

        {/* PDF Upload
        <div className="glass p-4 rounded-2xl mt-4">
          <h4 className="text-white text-lg mb-2">Upload Transaction History (PDF)</h4>
          <TransactionUpload onUploaded={() => load(1)} />
        </div>*/}
        </div>
       

      {/* Add Transaction Form */}
      <div className="glass p-6 rounded-2xl space-y-4">
        <h3 className="text-white text-xl font-semibold mb-4">Add Transaction</h3>
        <TransactionForm onAdded={() => load(1)} />
      </div>
    </div>
  );
}
