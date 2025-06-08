import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskService } from '../services/task.service';

const taskService = new TaskService();

export class TaskController {
    async create (req: Request, res: Response)  {
        const dto = plainToInstance(CreateTaskDto, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const task = taskService.create(dto.title);
        return res.status(201).json(task);
    }

    findAll  (req: Request, res: Response) {
        return res.json(taskService.findAll());
    }

    complete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const task = taskService.complete(id);

        if (!task) return res.status(404).json({ message: 'Task not found' });
        return res.json(task);
    }

    deleteTask(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const ok = taskService.delete(id);
        if (!ok) return res.status(404).json({ message: 'Task not found' });
        return res.status(204).send();
    }
}
