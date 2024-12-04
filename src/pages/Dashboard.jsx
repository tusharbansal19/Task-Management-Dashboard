import React from "react";
import { useSelector } from "react-redux";
import PieChartCard from "./PieChartCard";
import BarChartCard from "./BarChartCard";
import LineChartCard from "./LineChartCard";
import TaskCompletionProgressCard from "./TaskCompletionProgressCard";
import PerformanceHighlightsCard from "./PerformanceHighlightsCard";
import TaskManager from "./Taskmanager";
import BackToTopButton from "../Components/tButton";
import ScrollToTaskManagerButton from "./taskbarscrooling";
import ReactCalender from "./Calander";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" sm:p-6 md:pl-40 bg-gray-900 min-h-screen pt-16">
      <ScrollToTaskManagerButton />

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 ">
        Task Performance Dashboard
      </h1>

      {/* Cards Layout */}
      <div className="flex flex-col gap-y-3 sm:gap-6">
        {/* Row 1: Pie and Bar Charts */}
        <div className="flex flex-col md:flex-row gap-y-4 sm:gap-6">
          <div className="flex-1 ">
            <PieChartCard />
          </div>
          <div className="flex-1 ">
            <BarChartCard />
          </div>
        </div>

        {/* Row 2: Line Chart */}
        <div className="w-full">
          <LineChartCard />
        </div>

        {/* Row 3: Calendar */}
        <div className="w-full">
          <ReactCalender />
        </div>

        {/* Row 4: Task Completion and Performance Highlights */}
        <div className="flex flex-col md:flex-row gap-1 sm:gap-6">
          <div className="flex-1 min-w-[250px]">
            <TaskCompletionProgressCard />
          </div>
          <div className="flex-1 min-w-[250px]">
            <PerformanceHighlightsCard />
          </div>
        </div>
      </div>

      {/* Back-to-Top Button */}
      <div className="fixed right-4 bottom-4 z-50">
        <BackToTopButton />
      </div>

      {/* Task Manager Section */}
      <div id="task-manager" className="mt-10">
        <TaskManager />
      </div>
    </div>
  );
};

export default Dashboard;
