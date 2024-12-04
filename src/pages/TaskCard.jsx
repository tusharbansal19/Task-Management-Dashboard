import React, { useState, useEffect } from "react";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskCard = ({
  task,
  setEditingTask,
  setModalOpen,
  handleToggleCompletion,
  setTaskToDelete,
  setDeleteModalOpen,
}) => {
  const [filteredTasks, setFilteredTasks] = useState([task]);
  const [remainingTime, setRemainingTime] = useState("");

  // Calculate remaining time
  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const dueDate = new Date(task.dueDate);
      const diff = dueDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setRemainingTime(`${days}d ${hours}h ${minutes}m`);
      } else {
        setRemainingTime("Overdue");
      }
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 60000); // Update every minute
    return () => clearInterval(timer); // Cleanup on unmount
  }, [task.dueDate]);

  // Handle drag-and-drop functionality
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    setFilteredTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full p-4 bg-[#2C2B5A] text-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ">
        {/* Title */}
        <h1 className="text-2xl font-bold bg-[#8E44AD] p-2 rounded-md mb-4">
          {task.title}
        </h1>

        {/* Description */}
        <div className="flex gap-2 w-full">
        <p className="text-sm my-4 ">
        <span className="text-[#AFAFDF]">Description:</span>
              <div className="h-20 overflow-y-scroll p-2 w-[80%] rounded-lg  bg-[#3B3B80] text-white">
                <p>{task.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius beatae pariatur quisquam laboriosam suscipit nostrum dolorum nisi praesentium delectus eos libero necessitatibus repellendus facilis molestiae ipsum, tenetur fugiat unde harum itaque enim obcaecati mollitia. In neque, reprehenderit suscipit quas fugit non vitae saepe eum ipsa at!</p>
              </div>
            </p>

        {/* Due Date */}
        <p className="text-[0.7rem] my-4 w-full">
          <span className="text-[#AFAFDF]">Due Date:</span>
          <div className="bg-[#3B3B80] text-white p-2 rounded-md mt-1">
            {task.dueDate}
          </div>
        </p>

        </div>
        {/* Status */}
        <div className="flex gap-3 w-full">

        <p className="text-[0.7rem] mb-4 w-full">
          <span className="text-[#AFAFDF]">Status:</span>
          <div
            className={`p-2 rounded-md mt-1 ${
              task.status === "completed" ? "bg-green-500" : "bg-red-500"
            } text-white`}
            >
            {task.status}
          </div>
        </p>

        {/* Remaining Time */}
        <p className="text-[0.7rem] mb-4 w-full">
          <span className="text-[#AFAFDF]">Time Remaining:</span>
          <div
            className={`p-2 rounded-md mt-1 ${
              remainingTime === "Overdue" ? "bg-red-500" : "bg-[#3B3B80]"
            }`}
            >
            {remainingTime}
          </div>
        </p>

            </div>





            <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="p-2 bg-[#3B3B80] rounded-md shadow-md mt-2 transition-all duration-200 hover:bg-[#8E44AD]"
                    >
                      <div className="flex justify-between">
                        <span className="text-[0.7rem]">{task.title}</span>
                        <span className="text-xs text-gray-300">
                          Due: {task.dueDate}
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* Actions */}
        <div className="flex justify-around mb-4 mt-4">
          <FaEdit
            className="text-blue-400 cursor-pointer hover:text-blue-600 transition duration-200"
            onClick={() => {
              setEditingTask(task);
              setModalOpen(true);
            }}
          />
          <FaCheck
            className="text-green-400 cursor-pointer hover:text-green-600 transition duration-200"
            onClick={() => handleToggleCompletion(task.id)}
          />
          <FaTrash
            className="text-red-400 cursor-pointer hover:text-red-600 transition duration-200"
            onClick={() => {
              setTaskToDelete(task.id);
              setDeleteModalOpen(true);
            }}
          />
        </div>

        {/* Drag-and-Drop Task Section */}
       
      </div>
    </DragDropContext>
  );
};

export default TaskCard;
