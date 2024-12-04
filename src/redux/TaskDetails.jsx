import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [
      { id: 1, title: "Complete the project", description: "Work on the final project for the course", status: "incomplete", dueDate: "2024-12-01", day: "Monday" },
      { id: 2, title: "Buy groceries", description: "Milk, Eggs, Bread, Fruits", status: "pending", dueDate: "2024-12-02", day: "Tuesday" },
      { id: 3, title: "Read a book", description: "Read 'Atomic Habits'", status: "completed", dueDate: "2024-12-03", day: "Wednesday" },
      { id: 4, title: "Attend meeting", description: "Team meeting on project progress", status: "incomplete", dueDate: "2024-12-04", day: "Thursday" },
      { id: 5, title: "Write blog post", description: "Write about JavaScript concepts", status: "completed", dueDate: "2024-12-05", day: "Friday" },
      { id: 6, title: "Clean the house", description: "Vacuum and mop the floors", status: "incomplete", dueDate: "2024-12-06", day: "Saturday" },
      { id: 7, title: "Prepare presentation", description: "Prepare slides for client meeting", status: "completed", dueDate: "2024-12-07", day: "Sunday" },
    ],
    weeklyStats: [
      { name: "Monday", Completed: 8, Incomplete: 2 },
      { name: "Tuesday", Completed: 5, Incomplete: 5 },
      { name: "Wednesday", Completed: 6, Incomplete: 4 },
      { name: "Thursday", Completed: 7, Incomplete: 3 },
      { name: "Friday", Completed: 9, Incomplete: 1 },
      { name: "Saturday", Completed: 4, Incomplete: 6 },
      { name: "Sunday", Completed: 10, Incomplete: 0 },
    ],
    searchQuery: "",
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, id: Date.now(), status: "incomplete" });
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.status = task.status === "completed" ? "incomplete" : "completed";
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  setSearchQuery,
  reorderTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
