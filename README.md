# Task Management Dashboard

The Task Management Dashboard is a modern web application designed to help users efficiently create, organize, track, and manage tasks. The application focuses on usability, clean state management, and responsive design to support real-world productivity workflows.

---

## Live Application

Live Link: https://task-management-dashboard-livid.vercel.app/

---

## Overview

This dashboard enables users to manage tasks with essential attributes such as title, description, and due date. It provides flexible filtering, search, and drag-and-drop capabilities, making task organization intuitive and efficient across devices.

---

## Key Features

### Task Management
- Add tasks with title, description, and due date
- Edit existing task details
- Delete tasks with confirmation modal
- Mark tasks as completed or revert to pending state

### Task Filters
- View all tasks
- View completed tasks
- View pending tasks
- Highlight overdue tasks based on due date

### Search
- Search tasks by title for quick access

### Drag and Drop
- Reorder tasks dynamically using drag-and-drop interactions

### User Experience
- Responsive design optimized for desktop and mobile
- Clean and modern UI using a component library or custom styling
- Confirmation modal before destructive actions

---

## Technology Stack

### Frontend
- React
- Redux Toolkit for state management
- JavaScript (ES6+)
- CSS / SCSS or CSS-in-JS solutions

### Routing
- React Router
  - `/tasks` – Task Dashboard
  - `/tasks/:id` – Task Details Page (optional)

### State Management
- Redux Toolkit for global state
- Redux Thunk for asynchronous actions

---

## Architecture Highlights

- Component-based frontend architecture
- Centralized global state using Redux Toolkit
- Predictable state transitions with reducers and actions
- Scalable structure suitable for feature expansion
- Clean separation between UI, state, and business logic

---

## Performance and Usability

- Efficient state updates for smooth interactions
- Optimized rendering for task lists
- Stable layout with consistent UI behavior
- Responsive performance across screen sizes

---

## Installation and Setup

Clone the repository:
