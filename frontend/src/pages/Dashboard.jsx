import React, { useEffect, useState } from "react";
import api from "../services/api";
import ExpensePie from "../widgets/ExpensePie";
import ExpenseBar from "../widgets/ExpenseBar";

export default function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    const load = async () => {
      const s = await api.get("/transactions/summary");
      setSummary(s.data || []);
      // Build monthly sample: query all transactions and aggregate in frontend
      const all = await api.get("/transactions?limit=1000");
      const byMonth = {};
      (all.data.transactions || []).forEach(t => {
        const d = new Date(t.date);
        const key = `${d.getFullYear()}-${d.getMonth()+1}`;
        byMonth[key] = (byMonth[key] || 0) + (t.type === "expense" ? t.amount : -t.amount);
      });
      const arr = Object.entries(byMonth).map(([k,v]) => ({ month: k, total: v }));
      setMonthly(arr.sort((a,b)=>a.month.localeCompare(b.month)));
    };
    load().catch(console.error);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 glass p-6 rounded-2xl">
        <h3 className="text-white text-xl font-semibold mb-4">Overview</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <ExpenseBar data={monthly} />
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <ExpensePie data={summary} />
          </div>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl">
        <h3 className="text-white text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <a href="/transactions" className="block w-full text-center py-3 rounded bg-white/10 text-white">Manage Transactions</a>
        </div>
      </div>
    </div>
  );
}
