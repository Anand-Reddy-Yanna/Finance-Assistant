import React from "react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Cell } from "recharts";

export default function ExpenseBar({ data = [] }) {
  // data: [{ month: '2025-1', total: 123 }]
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    // <div style={{ width: "100%", height: 240 }}>
    //   <ResponsiveContainer>
    //     <BarChart data={data}>
    //       <XAxis dataKey="month" tick={{ fill: "#fff" }} />
    //       <YAxis tick={{ fill: "#fff" }} />
    //       <Tooltip />
    //       <Bar dataKey="total" fill="#82ca9d" />
    //     </BarChart>
    //   </ResponsiveContainer>
    // </div>
    <div style={{ width: "100%", height: 240 }}>
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis 
          dataKey="month" 
          tick={{ fill: "#000000cc", fontWeight: 600 }} // dark text for contrast
        />
        <YAxis 
          tick={{ fill: "#000000cc", fontWeight: 600 }} 
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffffdd", // light tooltip background
            borderRadius: 8,
            border: "none",
            color: "#1e293b", // dark text inside tooltip
            fontWeight: 500,
          }}
        />
        <Bar dataKey="total">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={activeIndex === index ? "#ffea70" : "#ffd700"} // gold bars
              cursor="pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
  );
}
