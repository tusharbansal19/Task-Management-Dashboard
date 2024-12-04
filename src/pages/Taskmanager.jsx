import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask, deleteTask, toggleTaskCompletion } from "../redux/TaskDetails";
import { selectFilteredTasks } from "../redux/selectFilteredTasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaSearch, FaEdit, FaCheck, FaTrash } from "react-icons/fa"; // Added icons
import TaskCard from "./TaskCard";
import { Typewriter } from "react-simple-typewriter"; // Import Typewriter
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const TaskManager = () => {
  const tasks = useSelector(selectFilteredTasks);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Delete confirmation modal state
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // Filter for task status
  const [taskToDelete, setTaskToDelete] = useState(null); // Task to delete
const  [arrayOfTitle,serArrayOgtitle]=useState([]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Handle input change to toggle the dropdown
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);  // Update the search query
    setIsDropdownOpen(query.length > 0);  // Open dropdown if query exists
  };

  // Handle selection of a task from the dropdown
  const handleSelectTask = (taskTitle) => {
    setSearchQuery(taskTitle); // Set the task title in the search bar
    setIsDropdownOpen(false);  // Close the dropdown after selection
  };

  useEffect(() => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filter === "completed") {
      filtered = filtered.filter((task) => task.status === "completed");
    } else if (filter === "incomplete") {
      filtered = filtered.filter((task) => task.status === "incomplete");
    } else if (filter === "pending") {
      filtered = filtered.filter((task) => task.status === "pending");
    } else if (filter === "overdue") {
      const currentDate = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((task) => task.dueDate < currentDate);
    }

    setFilteredTasks(filtered);
  }, [searchQuery, tasks, filter]);

  const handleAddTask = (task) => {
    dispatch(addTask({ ...task, id: Date.now(), status: "pending" }));
    setModalOpen(false);
    toast.success("Task added successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      className: "bg-green-500 text-white",
    });
  };

  const handleEditTask = (id, updatedTask) => {
    dispatch(editTask({ id, updatedTask }));
    setModalOpen(false);
    setEditingTask(null);
    toast.info("Task updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      className: "bg-blue-500 text-white",
    });
  };

  const handleDeleteTask = (id) => {
    console.log("task to delete  "+taskToDelete)
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setDeleteModalOpen(false);
      toast.error("Task deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleToggleCompletion = (id) => {
    dispatch(toggleTaskCompletion(id));
    toast.success("Task marked as completed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      className: "bg-purple-500 text-white",
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
  };

  useEffect(() => {

    console.log(tasks)
    console.log(filteredTasks)
    let arrayr=[]
    for(let task of tasks) {
      arrayr.push(task.title)

    }
  
    serArrayOgtitle(arrayr);

    console.log(arrayOfTitle)
  },[tasks])

  // tasks.map(task => task.title);
  //   console.log(arrayOfTitle);

  return (
    <div className="container mx-auto p-4 min-h-[500px]" >
      {/* Header */}
      <ToastContainer />
      <div className="flex flex-col justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white underline mb-10">Task Manager</h1>

            <div className="text-[#8E44AD] text-[2rem] font-extrabold my-3  ">
        <div className="flex items-center">      
      | Task : <span className="">  </span>

                               <Typewriter
                                  words={arrayOfTitle}
                                  loop={false}
                                  cursor
                                  cursorStyle="|"
                                  cursorColor={"#8E44AD"}
                                  
                                  delaySpeed={2000}
                                  typingSpeed={100}
                                  />
                                  </div>
                              </div>
        <div className="flex items-center justify-center gap-4 w-full pr-20 ">
        <div className="flex items-center gap-4 w-full justify-center ">
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}  // Call handleSearchChange when input changes
          className="border p-2 rounded w-full text-black pl-10"
        />
        <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />

        {/* Dropdown for search suggestions */}
        {isDropdownOpen && searchQuery && (
          <ul className="absolute left-0 w-full bg-white text-black border border-gray-300 mt-1 max-h-48 overflow-y-auto z-10">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectTask(task.title)} // Handle item click
              >
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        onClick={() => setModalOpen(true)}
      >
        Add Task
      </button>
      <div className="mt-4 m-5 ">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded bg-[#2C2B5A]"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
    </div>
       
        </div>

        {/* Filter Dropdown */}
     
      </div>

      {/* Task List */}
      <DragDropContext onDragEnd={onDragEnd}>
  <div className="flex w-full">
    <Droppable droppableId="tasks">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-full"
        >
          {/* Completed and Incomplete Task Sections */}
          {["completed", "incomplete"].map((status) => {
            const statusTasks = filteredTasks.filter(
              (task) => task.status === status
            );

            return (
              <div key={status} className="mb-6">
                <h3 className="text-xl font-bold mb-4 capitalize underline ">
                  {status} Tasks :
                </h3>

                {/* Display "No Tasks Here" if empty */}
                {statusTasks.length === 0 ? (
                  <div className="flex justify-center items-center w-full h-40  rounded-md">
                    <p className="text-4xl font-semibold bg-opacity-25 text-red-600">
                      No Tasks Pending
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 pr-3">
                    {statusTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                        className="w-full"
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`shadow-md rounded-lg w-full p-4 flex flex-row ${
                              task.dueDate ===
                              new Date().toISOString().split("T")[0]
                                ? "bg-red-100"
                                : ""
                            }`}
                          >
                            {/* Pass each task to TaskCard */}
                            <TaskCard
                              task={task}
                              setEditingTask={setEditingTask}
                              setModalOpen={setModalOpen}
                              handleToggleCompletion={handleToggleCompletion}
                              setTaskToDelete={setTaskToDelete}
                              setDeleteModalOpen={setDeleteModalOpen}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Droppable>
  </div>
</DragDropContext>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 bg-[#2C2B5A]">
          <div className="text-white z-[80] bg-blue-950 p-6 rounded-lg w-1/3 border-2 ">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <div className="flex justify-end gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteTask}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding/Editing Task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 border-4 border-white">
          <div className="bg-[#2C2B5A] p-6 rounded-lg shadow-lg w-full max-w-md border-4 border-white ">
            <h2 className="text-xl font-bold mb-4">
              {editingTask ? "Edit Task" : "Add Task"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const task = {
                  title: formData.get("title"),
                  description: formData.get("description"),
                  dueDate: formData.get("dueDate"),
                };
                if (editingTask) {
                  handleEditTask(editingTask.id, task);
                } else {
                  handleAddTask(task);
                }
              }}
              className="text-white bg-[#2C2B5A]"
            >
              <div className="mb-4">
                <label className="block text-sm">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingTask?.title || ""}
                  className="border p-2 rounded w-full bg-[#2C2B5A] bg-opacity-10"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingTask?.description || ""}
                  className="border bg-[#2C2B5A] p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={editingTask?.dueDate || ""}
                  className="border bg-[#2C2B5A] p-2 rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editingTask ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;






//   useEffect(() => {
//     let filtered = tasks.filter((task) =>
//       task.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (filter === "completed") {
//       filtered = filtered.filter((task) => task.status === "completed");
//     } else if (filter === "incomplete") {
//       filtered = filtered.filter((task) => task.status === "incomplete");
//     } else if (filter === "pending") {
//       filtered = filtered.filter((task) => task.status === "pending");
//     } else if (filter === "overdue") {
//       const currentDate = new Date().toISOString().split("T")[0];
//       filtered = filtered.filter((task) => task.dueDate < currentDate);
//     }

//     setFilteredTasks(filtered);
//   }, [searchQuery, tasks, filter]);

//   const handleAddTask = (task) => {
//     dispatch(addTask({ ...task, id: Date.now(), status: "pending" }));
//     toast.success("Task created successfully!", { position: toast.POSITION.BOTTOM_RIGHT, className: "bg-green-500" });
//     setModalOpen(false);
//   };

//   const handleEditTask = (id, updatedTask) => {
//     dispatch(editTask({ id, updatedTask }));
//     toast.info("Task updated successfully!", { position: toast.POSITION.BOTTOM_RIGHT, className: "bg-blue-500" });
//     setModalOpen(false);
//     setEditingTask(null);
//   };

//   const handleDeleteTask = () => {
//     if (taskToDelete) {
//       dispatch(deleteTask(taskToDelete.id));
//       toast.error("Task deleted successfully!", { position: toast.POSITION.BOTTOM_RIGHT, className: "bg-red-500" });
//       setDeleteModalOpen(false);
//     }
//   };

//   const handleToggleCompletion = (id) => {
//     dispatch(toggleTaskCompletion(id));
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedTasks = Array.from(filteredTasks);
//     const [removed] = reorderedTasks.splice(result.source.index, 1);
//     reorderedTasks.splice(result.destination.index, 0, removed);
//   };
//   let arrayOfTitle=tasks.map(task => task.title);
//   console.log(arrayOfTitle);
//   let arrayOfstatus=tasks.map(task => task.status);

//   return (
//     <div className="container mx-auto p-4 min-h-[400px]" >
//       <div className="flex flex-col justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-white underline mb-10">Task Manager</h1>
//      
//         <div className="flex items-center gap-4 w-full pr-20 ">
//           <div className="relative w-full md:w-auto">
//             <input
//               type="text"
//               placeholder="Search tasks..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border p-2 rounded w-full text-black pl-10"
//             />
//             <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
//             onClick={() => setModalOpen(true)}
//           >
//             Add Task
//           </button>
//           <div className="mt-4 m-5 ">
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="p-2 border rounded bg-[#2C2B5A]"
//             >
//               <option value="all">All Tasks</option>
//               <option value="completed">Completed</option>
//               <option value="incomplete">Incomplete</option>
//               <option value="pending">Pending</option>
//               <option value="overdue">Overdue</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Task List */}
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex w-full ">
//           <Droppable droppableId="tasks">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef} className="w-full">
//                 {["completed", "incomplete"].map((status) => (
//                   <div key={status}>
//                     <h3 className="text-xl font-bold mb-4 capitalize">{status} Tasks</h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 pr-20">
//                       {filteredTasks.filter((task) => task.status === status).map((task, index) => (
//                         <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
//                           {(provided) => (
//                             <div
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               ref={provided.innerRef}
//                               className={`shadow-md rounded-lg w-full p-4 flex flex-row ${task.dueDate === new Date().toISOString().split("T")[0] ? "bg-red-100" : ""}`}
//                             >
                             
//                               <TaskCard
//                                 task={task}
//                                 setEditingTask={setEditingTask}
//                                 setModalOpen={setModalOpen}
//                                 handleToggleCompletion={handleToggleCompletion}
//                                 setTaskToDelete={setTaskToDelete}
//                                 setDeleteModalOpen={setDeleteModalOpen}
//                               />
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </DragDropContext>

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 bg-[#2C2B5A]">
//           <div className="text-white z-[80] bg-blue-950 p-6 rounded-lg w-1/3 border-2">
//             <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
//             <div className="flex justify-end gap-2">
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//                 onClick={() => setDeleteModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={handleDeleteTask}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Adding/Editing Task */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 border-4 border-white">
//           <div className="bg-[#2C2B5A] p-6 rounded-lg shadow-lg w-full max-w-md border-4 border-white ">
//             <h2 className="text-xl font-bold mb-4">
//               {editingTask ? "Edit Task" : "Add Task"}
//             </h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 const task = {
//                   title: formData.get("title"),
//                   description: formData.get("description"),
//                   dueDate: formData.get("dueDate"),
//                 };
//                 if (editingTask) {
//                   handleEditTask(editingTask.id, task);
//                 } else {
//                   handleAddTask(task);
//                 }
//               }}
//               className="text-white bg-[#2C2B5A]"
//             >
//               <div className="mb-4">
//                 <label className="block text-sm">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   defaultValue={editingTask ? editingTask.title : ""}
//                   className="p-2 border rounded w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm">Description</label>
//                 <textarea
//                   name="description"
//                   defaultValue={editingTask ? editingTask.description : ""}
//                   className="p-2 border rounded w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm">Due Date</label>
//                 <input
//                   type="date"
//                   name="dueDate"
//                   defaultValue={editingTask ? editingTask.dueDate : ""}
//                   className="p-2 border rounded w-full"
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   {editingTask ? "Update Task" : "Add Task"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Toast Container */}
//     </div>
//   );
// };

// export default TaskManager;
// <ToastContainer />
