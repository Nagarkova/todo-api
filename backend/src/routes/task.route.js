"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
const taskController = new task_controller_1.TaskController();
router.post('/', taskController.create.bind(taskController));
router.get('/', taskController.findAll.bind(taskController));
router.patch('/:id/complete', taskController.complete.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));
exports.default = router;
