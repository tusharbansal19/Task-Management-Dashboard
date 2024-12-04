import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const taskPerformanceData = [
  { name: "Monday", Completed: 8, Incomplete: 2 },
  { name: "Tuesday", Completed: 5, Incomplete: 5 },
  { name: "Wednesday", Completed: 6, Incomplete: 4 },
  { name: "Thursday", Completed: 7, Incomplete: 3 },
  { name: "Friday", Completed: 9, Incomplete: 1 },
  { name: "Saturday", Completed: 4, Incomplete: 6 },
  { name: "Sunday", Completed: 10, Incomplete: 0 },
];

const BarChartCard = () => {
  return (
    <div className="bg-[#2C2B5A] text-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
      <h2 className="text-xl font-bold mb-4">Task Performance (Daily)</h2>
      <div className="flex justify-center w-full">
        {/* Responsive Container for dynamic sizing */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={taskPerformanceData}>
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <Tooltip />
            <Bar dataKey="Completed" fill="#8E44AD" />
            <Bar dataKey="Incomplete" fill="#3498DB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Legend for bar colors */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <span
            className="w-4 h-4 bg-[#8E44AD] inline-block rounded-full mr-2"
            aria-hidden="true"
          ></span>
          <span>Completed</span>
        </div>
        <div className="flex items-center">
          <span
            className="w-4 h-4 bg-[#3498DB] inline-block rounded-full mr-2"
            aria-hidden="true"
          ></span>
          <span>Incomplete</span>
        </div>
      </div>
      <p className="text-center mt-4">
        The bar chart highlights completed and incomplete tasks on a daily
        basis.
      </p>
    </div>
  );
};

export default BarChartCard;
