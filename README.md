# Task Manager - Full Stack Application

A modern, responsive Task Manager application built with React frontend and Node.js/Express backend.

## Features

- **Add, Edit, Delete Tasks** - Full CRUD operations
- **Mark Complete/Incomplete** - Toggle task status with one click
- **Priority Levels** - Assign Low, Medium, or High priority to tasks
- **Filter Tasks** - View All, Pending, or Completed tasks
- **Responsive Design** - Works on desktop and mobile devices
- **Persistent Storage** - SQLite database saves all tasks
- **Statistics** - Live count of total, pending, and completed tasks

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite3
- CORS

### Frontend
- React 18
- Vite
- Axios
- Modern CSS (Gradients, Flexbox, Responsive)

## Project Structure

```
task-manager/
├── backend/
│   ├── server.js          # Express server & API routes
│   ├── package.json       # Backend dependencies
│   └── tasks.db           # SQLite database (auto-created)
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Component styles
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/muzrohitranjan/-Customer-Segmentation-Churn-Analysis.git
cd -Customer-Segmentation-Churn-Analysis
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server (from the `backend` directory):
```bash
npm start
```
The backend will run on `http://localhost:5000`

2. Start the frontend development server (from the `frontend` directory):
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

## Screenshots

The app features a beautiful gradient background with a clean white card interface. Tasks are displayed with color-coded priority badges and intuitive action buttons.

## License

This project is open source and available for personal and commercial use.

