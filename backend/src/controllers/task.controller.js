"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_task_dto_1 = require("../dto/create-task.dto");
const task_service_1 = require("../services/task.service");
const taskService = new task_service_1.TaskService();
class TaskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = (0, class_transformer_1.plainToInstance)(create_task_dto_1.CreateTaskDto, req.body);
            const errors = yield (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            const task = taskService.create(dto.title);
            return res.status(201).json(task);
        });
    }
    findAll(req, res) {
        return res.json(taskService.findAll());
    }
    complete(req, res) {
        const id = parseInt(req.params.id);
        const task = taskService.complete(id);
        if (!task)
            return res.status(404).json({ message: 'Task not found' });
        return res.json(task);
    }
    deleteTask(req, res) {
        const id = parseInt(req.params.id);
        const ok = taskService.delete(id);
        if (!ok)
            return res.status(404).json({ message: 'Task not found' });
        return res.status(204).send();
    }
}
exports.TaskController = TaskController;
