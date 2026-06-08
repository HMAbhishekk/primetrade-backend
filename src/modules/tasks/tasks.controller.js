const taskService = require('./tasks.service');
const response = require('../../utils/response');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.id, req.user.role);
    return response.success(res, tasks, 'Tasks fetched.');
  } catch (err) {
    return response.error(res, err.message, err.status || 500);
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(+req.params.id, req.user.id, req.user.role);
    return response.success(res, task, 'Task fetched.');
  } catch (err) {
    return response.error(res, err.message, err.status || 500);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    return response.success(res, task, 'Task created.', 201);
  } catch (err) {
    return response.error(res, err.message, err.status || 500);
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(+req.params.id, req.user.id, req.user.role, req.body);
    return response.success(res, task, 'Task updated.');
  } catch (err) {
    return response.error(res, err.message, err.status || 500);
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(+req.params.id, req.user.id, req.user.role);
    return response.success(res, result, 'Task deleted.');
  } catch (err) {
    return response.error(res, err.message, err.status || 500);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };