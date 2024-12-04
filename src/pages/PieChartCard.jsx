import React from "react";
import { useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const pieData = [
  { name: "Completed", value: 39 },
  { name: "Incomplete", value: 17 },
];

// Updated colors based on line chart
const COLORS = ["#8E44AD", "#3498DB"]; // Purple for Completed, Blue for Incomplete

const PieChartCard = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const chartSize = isSmallScreen ? 250 : 350; // Adjusted chart size for responsiveness
  const outerRadius = isSmallScreen ? 90 : 120;

  return (
    <div className="bg-[#2C2B5A] text-white p-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
      <div className="flex flex-col items-center">
        {/* Title */}
        <h2
          className={`font-bold ${
            isSmallScreen ? "text-lg" : "text-xl"
          } mb-4`}
        >
          Task Completion Breakdown
        </h2>

        {/* Pie Chart */}
        <div className="flex justify-center items-center text-[0.6rem]">
          <PieChart width={chartSize} height={chartSize}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}% `
              }
              labelLine={false}
              isAnimationActive={true}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#3B3B80",
                color: "white",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#AFAFDF" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value, entry, index) => (
                <span style={{ color: COLORS[index % COLORS.length] }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </div>

        {/* Description */}
        <p
          className={`mt-4 ${
            isSmallScreen ? "text-center text-sm" : "text-left text-base"
          }`}
        >
          This chart represents the proportion of completed (purple) and incomplete (blue) tasks.
        </p>
      </div>
    </div>
  );
};

export default PieChartCard;
