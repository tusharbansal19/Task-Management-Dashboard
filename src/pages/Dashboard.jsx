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
import { Calculate } from "@mui/icons-material";
import { Calendar } from "react-feather";
import ReactCalender from "./Calander";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-10 md:pl-36 bg-gray-900 min-h-screen">
      <ScrollToTaskManagerButton/>
      {/* Title */}
      <h1 className="text-4xl mt-20 font-bold text-center text-white mb-8 pt-4">
        Task Performance Dashboard
      </h1>

      {/* Cards Layout */}
      <div className="flex flex-wrap flex-col  gap-6 justify-between">

        <div className="flex flex-col md:flex-row min-w-[250px] w-full  gap-10">
          <PieChartCard />
       
          <BarChartCard />
        </div>
        <div className="flex  w-full">
          <LineChartCard />
        </div>
        <div className="w-full">
<ReactCalender/>


        </div>
        <div className="flex w-full gap-10 flex-col md:flex-row">
          <TaskCompletionProgressCard />
  
          <PerformanceHighlightsCard />
        </div>
      </div>


      {/* Back-to-Top Button */}
      <div className="fixed right-4 bottom-10 z-[100]">
        <BackToTopButton />
      </div>
<div id="task-manager" className="w-full">

      <TaskManager />
</div>
    </div>
  );
};

export default Dashboard;
