import Task, { TaskPriority, TaskStatus } from '../models/Task.js';
import Project from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';

export const findAllTasksForUser = async (userId) => {
  const userProjects = await Project.find({ owner: userId }).select('_id');
  const projectIds = userProjects.map(p => p._id);
  return Task.find({ project: { $in: projectIds } });
};

export const findTasksForProject = async (projectId, userId, filters) => {
  const project = await Project.findById(projectId);
  if (!project || project.owner.toString() !== userId) {
    throw new ApiError(404, 'Project not found or user not authorized');
  }

  const query = { project: projectId };

  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.deadline_start || filters.deadline_end) {
    query.deadline = {};
    if (filters.deadline_start) query.deadline.$gte = new Date(filters.deadline_start);
    if (filters.deadline_end) query.deadline.$lte = new Date(filters.deadline_end);
  }

  const tasks = await Task.find(query)
    .limit(filters.limit * 1)
    .skip((filters.page - 1) * filters.limit)
    .exec();

  const count = await Task.countDocuments(query);

  return {
    tasks,
    totalPages: Math.ceil(count / filters.limit) || 1,
    currentPage: filters.page > 0 ? filters.page : 1,
  };
};

export const createTask = async (taskData, projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project || project.owner.toString() !== userId) {
    throw new ApiError(404, 'Project not found or user not authorized');
  }
  const task = new Task({ ...taskData, project: projectId });
  return task.save();
};

export const updateTask = async (taskId, updates, userId) => {
  const task = await Task.findById(taskId).populate('project');
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const projectOwner = task.project.owner;
  if (projectOwner.toString() !== userId) {
    throw new ApiError(401, 'User not authorized');
  }

  Object.assign(task, updates);
  await task.save();
  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate('project');
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const projectOwner = task.project.owner;
  if (projectOwner.toString() !== userId) {
    throw new ApiError(401, 'User not authorized');
  }

  await task.deleteOne();
};
