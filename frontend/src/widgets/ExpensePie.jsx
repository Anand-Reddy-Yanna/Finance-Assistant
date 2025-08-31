import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658","#ff7a7a","#7aa2ff","#c78aff"];

export default function ExpensePie({ data = [] }) {
  // data: [{ _id: 'Food', total: 123 }]
  const formatted = data.map((d, i) => ({ name: d._id, value: d.total }));
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={formatted} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} label>
            {formatted.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
