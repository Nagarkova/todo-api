// @ts-nocheck
import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();
const  taskController = new TaskController();
router.post('/', taskController.create);
router.get('/', taskController.findAll);
router.patch('/:id/complete', taskController.complete);
router.delete('/:id', taskController.deleteTask);

export default router;
