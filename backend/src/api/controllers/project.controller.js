import { validationResult } from 'express-validator';
import * as ProjectService from '../services/project.service.js';
import { ApiError } from '../utils/ApiError.js';

export const getProjects = async (req, res, next) => {
  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    const projects = await ProjectService.findProjectsByOwner(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    const project = await ProjectService.findProjectById(req.params.id, req.user.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {

  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    //  console.log('Request body:', req.body);
     const { name, description } = req.body;
    const project = await ProjectService.createProject(
      { name, description },
      req.user.id
    );
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (!req.user) return next(new ApiError(401, 'User not authenticated'));
    await ProjectService.deleteProject(req.params.id, req.user.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    next(err);
  }
};
