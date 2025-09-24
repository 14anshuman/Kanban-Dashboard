import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { ApiError } from '../utils/ApiError.js';

export const findProjectsByOwner = async (ownerId) => {
  return Project.find({ owner: ownerId });
};

export const findProjectById = async (projectId, ownerId) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }
  if (project.owner.toString() !== ownerId) {
    throw new ApiError(401, 'User not authorized');
  }
  return project;
};

export const createProject = async (projectData, ownerId) => {
  const { name, description } = projectData;
  const project = new Project({
    name,
    description,
    owner: ownerId,
  });
  return project.save();
};

export const deleteProject = async (projectId, ownerId) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (project.owner.toString() !== ownerId) {
    throw new ApiError(401, 'User not authorized');
  }

  // Also delete all tasks associated with the project
  await Task.deleteMany({ project: projectId });
  await project.deleteOne();
};
