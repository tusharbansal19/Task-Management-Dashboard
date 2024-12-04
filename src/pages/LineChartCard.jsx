import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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

const LineChartCard = () => {
  return (
    <div className="bg-[#2C2B5A] text-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 w-full">
      <h2 className="text-xl font-bold mb-4">Weekly Task Trends</h2>
      <div className="flex justify-center w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={taskPerformanceData}>
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <CartesianGrid stroke="#555555" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Completed"
              stroke="#8E44AD"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Incomplete"
              stroke="#3498DB"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center mt-4">
        The line chart tracks the trend of tasks completed and incomplete over
        the week.
      </p>
    </div>
  );
};

export default LineChartCard;
