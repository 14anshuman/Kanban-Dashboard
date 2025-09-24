import { Router } from 'express';
import { getProjects, createProject, deleteProject, getProjectById } from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Protect all routes
router.use(protect);

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProjectById)
  .delete(deleteProject);

export default router;
