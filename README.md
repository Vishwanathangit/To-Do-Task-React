# 📝 ToDo List Task Management App

A responsive and efficient Task Management Web App built using **React**, **Vite**, **React Router**, and **Tailwind CSS**, with support for task creation, editing, deletion, filtering, sorting, pagination, and local storage persistence.

## 📁 Project Structure
<Pre>
  ```
  ToDo-Task-Management-App/
├── public/
├── src/
│ ├── assets/ # Assets like images
│ ├── pages/
│ │ ├── AddTask.jsx # Form for adding a new task
│ │ ├── EditTask.jsx # Form for editing an existing task
│ │ └── Home.jsx # Main dashboard (list, filters, search, sort)
│ ├── App.jsx # App routes
│ ├── data.jsx # localStorage utility functions
│ ├── index.css # Global and Tailwind styles
│ ├── main.jsx # React app entry point
├── index.html # Root HTML file
├── vite.config.js # Vite config with Tailwind plugin
├── eslint.config.js # ESLint rules and config
└── README.md # Project documentation
  ```
</Pre>


---

## 🚀 Features

- ✅ Add new tasks with title, description, priority, and status
- ✅ Edit existing tasks with pre-filled data
- ✅ Delete tasks
- ✅ Mark tasks as completed or pending
- ✅ Search tasks by title or description
- ✅ Filter by status (All, Completed, Pending)
- ✅ Sort tasks by priority (High > Medium > Low)
- ✅ Responsive UI with Tailwind CSS
- ✅ Pagination for large task lists
- ✅ Persistent data using browser `localStorage`

## 🔧 Tech Stack

- ⚛️ **React** (Component-based UI)
- ⚡ **Vite** (Fast bundler and dev server)
- 🧭 **React Router** (Client-side routing)
- 🎨 **Tailwind CSS** (Utility-first styling)
- 💾 **localStorage** (Client-side persistence)

## 📦 Installation

1. **Clone the Repository**
   git clone https://github.com/your-username/todo-task-management-app.git
   cd todo-task-management-app

2.Install Dependencies
  npm install

3.Start the Development Server
  npm run dev

4.Open in browser:
  http://localhost:5173

## 📂 Component Descriptions

| File           | Purpose                                                  |
| -------------- | -------------------------------------------------------- |
| `App.jsx`      | Defines app routing using React Router                   |
| `Home.jsx`     | Dashboard with all task-related operations               |
| `AddTask.jsx`  | Form to create a new task                                |
| `EditTask.jsx` | Form to update an existing task                          |
| `data.jsx`     | Contains `getTasks()` and `saveTasks()` for localStorage |
| `index.css`    | Tailwind and global styling                              |
| `main.jsx`     | Mounts the React app into DOM                            |


LiveDemo : [https://to-do-task-react-three.vercel.app/]
GitHub Repo : [https://github.com/Vishwanathangit/To-Do-Task-React.git]
