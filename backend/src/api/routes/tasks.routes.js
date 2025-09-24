import { Router } from 'express';
import { body } from 'express-validator';
import { getTasksForProject, createTask, updateTask, deleteTask, getAllUserTasks } from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.route('/')
    .get(getAllUserTasks);

router.route('/project/:projectId')
  .get(getTasksForProject)
  .post(
    [
      body('title', 'Title is required').not().isEmpty(),
      body('deadline', 'Deadline is required').isISO8601().toDate(),
    ],
    createTask
  );
  
router.route('/:id')
    .put(updateTask)
    .delete(deleteTask);

export default router;
