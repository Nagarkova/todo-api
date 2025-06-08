import { Task } from '../models/task.model';

export class TaskService {
    private tasks: Task[] = [];
    private idCounter = 1;

    create(title: string): Task {
        const task: Task = { id: this.idCounter++, title, completed: false };
        this.tasks.push(task);
        return task;
    }

    findAll(): Task[] {
        return this.tasks;
    }

    complete(id: number): Task | undefined {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.completed = true;
        return task;
    }

    delete(id: number): boolean {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index >= 0) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}
