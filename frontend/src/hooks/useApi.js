import { useCallback } from 'react';
import axios from 'axios';

export const API_BASE = 'http://localhost:5001/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE,
  // withCredentials: true, // uncomment if your backend uses cookies
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useApi = () => {
  // Projects
  const getProjects = useCallback(async () => {
    try {
      const res = await api.get('/projects');
      return res.data;
    } catch (err) {
      console.error('Failed to fetch projects:', err.response?.data || err.message);
      throw err;
    }
  }, []);

  const getProjectById = useCallback(async (id) => {
    try {
      const res = await api.get(`/projects/${id}`);
      return res.data;
    } catch (err) {
      console.error(`Failed to fetch project ${id}:`, err.response?.data || err.message);
      throw err;
    }
  }, []);

  const createProject = useCallback(async (projectData) => {
    try {
      const res = await api.post('/projects', {name:projectData.name ,description: projectData.description});
      return res.data;
    } catch (err) {
      console.error('Failed to create project:', err.response?.data || err.message);
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (projectId) => {
  try {
    const res = await api.delete(`/projects/${projectId}`);
    return res.data;
  } catch (err) {
    console.error('Failed to delete project:', err.response?.data || err.message);
    throw err;
  }
}, []);

  // Tasks
  const getTasks = useCallback(async () => {
    try {
      const res = await api.get('/tasks');
      return res.data.tasks || res.data;
    } catch (err) {
      console.error('Failed to fetch tasks:', err.response?.data || err.message);
      throw err;
    }
  }, []);

  const getTasksForProject = useCallback(async (projectId) => {
    try {
      const res = await api.get(`/tasks/project/${projectId}`);
      return res.data.tasks || res.data;
    } catch (err) {
      console.error(`Failed to fetch tasks for project ${projectId}:`, err.response?.data || err.message);
      throw err;
    }
  }, []);

  const createTask = useCallback(async (taskData, projectId) => {
    try {
      const res = await api.post(`/tasks/project/${projectId}`, taskData);
      return res.data;
    } catch (err) {
      console.error(`Failed to create task for project ${projectId}:`, err.response?.data || err.message);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (taskId, updates) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, updates);
      return res.data;
    } catch (err) {
      console.error(`Failed to update task ${taskId}:`, err.response?.data || err.message);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
    } catch (err) {
      console.error(`Failed to delete task ${taskId}:`, err.response?.data || err.message);
      throw err;
    }
  }, []);

  return {
    getProjects,
    getProjectById,
    createProject,
    deleteProject,
    getTasks,
    getTasksForProject,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useApi;
