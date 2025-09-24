import { validationResult } from 'express-validator';
import * as TaskService from '../services/task.service.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllUserTasks = async (req, res, next) => {
  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    const tasks = await TaskService.findAllTasksForUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTasksForProject = async (req, res, next) => {
  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    const { projectId } = req.params;
    const { status, priority, deadline_start, deadline_end, page = 1, limit = 10 } = req.query;

    const tasks = await TaskService.findTasksForProject(projectId, req.user.id, {
      status,
      priority,
      deadline_start,
      deadline_end,
      page: Number(page),
      limit: Number(limit),
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }

  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    const { projectId } = req.params;
    const task = await TaskService.createTask(req.body, projectId, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    const updatedTask = await TaskService.updateTask(req.params.id, req.body, req.user.id);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    await TaskService.deleteTask(req.params.id, req.user.id);
    res.json({ message: 'Task removed' });
  } catch (err) {
    next(err);
  }
};
