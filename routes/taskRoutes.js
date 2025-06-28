const express = require('express');
const router = express.Router();
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.post('/', createTask);

router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;