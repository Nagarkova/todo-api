"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
class TaskService {
    constructor() {
        this.tasks = [];
        this.idCounter = 1;
    }
    create(title) {
        const task = { id: this.idCounter++, title, completed: false };
        this.tasks.push(task);
        return task;
    }
    findAll() {
        return this.tasks;
    }
    complete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task)
            task.completed = true;
        return task;
    }
    delete(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index >= 0) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.TaskService = TaskService;
