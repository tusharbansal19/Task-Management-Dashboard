import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";

const Calendar = () => {
  const tasks = useSelector((state) => state.tasks.tasks); // Assuming tasks are stored in Redux
  const [showCompleted, setShowCompleted] = useState(false);

  const today = new Date();
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const filteredTasks = (day) =>
    tasks.filter(
      (task) =>
        isSameDay(new Date(task.dueDate), day) &&
        (showCompleted ? task.status === "completed" : task.status !== "completed")
    );

  return (
    <div className="bg-[#2C2B5A] text-white p-6 rounded-lg shadow-md  w-[80%]">
      <h2 className="text-xl font-bold text-center mb-6">Task Calendar</h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center ">
        <button
          className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${
            !showCompleted
              ? "bg-blue-500 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setShowCompleted(false)}
        >
          Incomplete Tasks
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${
            showCompleted
              ? "bg-green-500 text-white"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setShowCompleted(true)}
        >
          Completed Tasks
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {daysInMonth.map((day) => {
          const dayTasks = filteredTasks(day);
          return (
            <div
              key={day.toISOString()}
              className="bg-[#1F1E3E] p-2 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-lg font-semibold ">
                {format(day, "EEEE, MMM d")}
              </h3>
              {dayTasks.length > 0 ? (
                <ul className="space-y-2">
                  {dayTasks.map((task) => (
                    <li
                      key={task.id}
                      className={`p-2 rounded-md ${
                        task.status === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm">{task.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No tasks</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
