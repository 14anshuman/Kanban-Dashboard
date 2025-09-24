
# 🗂 Kanban Dashboard

**Kanban Dashboard** is a modern, full-stack Task and Project Management System designed to help users and teams organize their work efficiently. It features a **responsive and intuitive interface** built with **React** ⚛️ and **Tailwind CSS** 🎨, powered by a robust **Node.js + Express** ⚡ backend.

---

## ✨ Features

- **🔒 User Authentication**: Secure signup and login functionality using **JWT (JSON Web Tokens)**.
- **📊 Interactive Dashboard**: Quick overview of projects and tasks with summary cards (total projects, tasks, overdue tasks) and a bar chart visualizing task status.
- **📁 Project Management**: 
  - Create new projects with names and descriptions.  
  - View all projects in a clean grid layout.  
  - Delete projects along with all associated tasks 🗑️.
- **🛠 Dynamic Kanban Board**: Drag-and-drop workflow visualization with **"To Do" ✅**, **"In Progress" 🔄**, and **"Done" ✔️** columns.
- **✏️ Full Task CRUD**: Create, read, update, and delete tasks within a project.
- **📝 Rich Task Details**: Each task includes:
  - Title 🏷️  
  - Description 🗒️  
  - Priority (Low 🟢, Medium 🟡, High 🔴)  
  - Deadline ⏰
- **🔍 Filtering & Pagination**: Easily find tasks by status, priority, or deadline range; paginate tasks for large projects.
- **🎨 Visual Feedback**:
  - Overdue tasks ❗ are clearly marked.  
  - Priority levels are color-coded.  
  - Enhanced drag-and-drop experience with visual cues for dragged items and drop targets.
- **📱 Responsive Design**: Seamless experience across **desktop** 💻 and **mobile** 📱 devices.

---

## 🛠 Tech Stack

This application is built with a modern MERN-like stack using **TypeScript** 🟦 on both the client and server.

### ⚛️ Frontend

- **Framework**: React  
- **Routing**: React Router 🔀  
- **Styling**: Tailwind CSS 🎨  
- **HTTP Client**: Axios 📡  
- **Charts**: Recharts 📊

### ⚡ Backend

- **Framework**: Node.js + Express.js  
- **Database**: MongoDB 🗄️ with Mongoose ODM  
- **Authentication**: JWT 🔑 & bcryptjs 🔒 for password hashing  
- **Validation**: `express-validator` ✅  
- **Testing**: Jest & Supertest 🧪

---


## Project Structure

The project is organized into two main directories, `frontend` and `backend`, to maintain a clean separation of concerns.

```
/
├── backend/
│   ├── src/
│   │   ├── api/             # Controllers, models, routes, services
│   │   ├── config/          # Database configuration
│   │   
│   ├── tests/               # Backend integration tests
│   ├── package.json
│   
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context (e.g., AuthContext)
│   │   ├── hooks/           # Custom hooks (e.g., useApi)
│   │   ├── pages/           # Page-level components
│   │   
│   └── index.html           # Entry point with importmap for dependencies
│

```

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- A running MongoDB instance (either local or from a cloud provider like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Create an environment file**:
    Create a `.env` file in the `backend` directory and add the following environment variables.

    ```env
    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

    # A strong, secret string for signing JWTs
    JWT_SECRET=your_jwt_secret_key

    # The port for the server to run on
    PORT=5001
    ```

4.  **Build and Run**:
    - **For development (with hot-reloading)**:
      ```bash
      npm run dev
      ```
    - **For production**:
      First, build the TypeScript code:
      ```bash
      npm run build
      ```
      Then, start the server:
      ```bash
      npm start
      ```
    The backend server will be running on `http://localhost:5001`.

### Frontend Setup

The frontend is designed to be served by a static file server. The dependencies like React and Axios are managed via an **importmap** in `frontend/index.html`, so no `npm install` is required for the frontend.

Simply open the `frontend/index.html` file in a browser, or serve the `frontend` directory using a local web server. The application is configured to make API calls to `/api`, so it expects the backend to be accessible on the same origin (a proxy is recommended in a real-world deployment).

### Running Backend Tests

To run the integration tests for the backend API:

1.  Ensure you are in the `backend` directory.
2.  Make sure your `.env` file is configured correctly for a test database if needed.
3.  Run the test command:
    ```bash
    npm test
    ```
