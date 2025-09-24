import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import KanbanColumn from "../components/kanban/KanbanColumn";
import { STATUSES, STATUS_MAP } from "../constants";
import Modal from "../components/ui/Modal";
import TaskForm from "../components/kanban/TaskForm";
import Button from "../components/ui/Button";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const KanbanPage = () => {
  const { projectId } = useParams();
  const { getProjectById, getTasksForProject, createTask, updateTask, deleteTask } = useApi();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchBoardData = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const [projectData, tasksData] = await Promise.all([
        getProjectById(projectId),
        getTasksForProject(projectId),
      ]);
      setProject(projectData);
      setTasks(tasksData);
    } catch (err) {
      console.error("Failed to fetch board data:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId, getProjectById, getTasksForProject]);

  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]);

  const handleDrop = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Failed to move task:", err);
    }
  };

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
    } else if (projectId) {
      await createTask( taskData,  projectId);
    }
    handleCloseModal();
    fetchBoardData();
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
      fetchBoardData();
    }
  };

  if (loading) return <div className="text-center p-8">Loading board...</div>;
  if (!project)
    return (
      <div className="text-center p-8 text-red-500">
        Project not found.{" "}
        <Link to="/projects" className="text-primary hover:underline">Go back to projects</Link>
      </div>
    );

  return (
    <div className="flex h-screen w-full bg-bunker text-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <Header />

        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{project.name}</h2>
              <p className="text-gray-500">{project.description}</p>
            </div>
            <Button
              onClick={() => handleOpenModal()}
              className="bg-black text-sm font-semibold rounded-md shadow hover:bg-gray-400"
            >
              Add Task
            </Button>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                title={STATUS_MAP[status]}
                tasks={tasks.filter((t) => t.status === status)}
                onDrop={handleDrop}
                onEditTask={handleOpenModal}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={editingTask ? "Edit Task" : "Add New Task"}
          >
            <TaskForm task={editingTask} onSave={handleSaveTask} onCancel={handleCloseModal} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default KanbanPage;
