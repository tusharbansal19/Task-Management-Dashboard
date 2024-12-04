import React from "react";

const TaskCompletionProgressCard = () => {
  return (
    <div className="bg-[#2C2B5A] text-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
      <h2 className="text-xl font-bold mb-4">Task Completion Progress</h2>
      <p className="mb-2">Percentage of tasks completed vs total tasks:</p>
      <div className="w-4/5 mx-auto bg-blue-500 h-5 rounded-full relative mb-4">
        <div className="bg-purple-600 h-full rounded-full" style={{ width: "70%" }}></div>
      </div>
      <p className="text-center">70% Completed</p>
    </div>
  );
};

export default TaskCompletionProgressCard;
