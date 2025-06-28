const pool = require('../config/db');
const { sendTaskCreationEmail, sendTaskUpdateEmail } = require('../services/emailService');

// @desc    Fetch all tasks (with filtering and search)
// @route   GET /api/tasks
exports.getAllTasks = async (req, res) => {
  try {
    console.log('Fetching all tasks');
    const { status, priority, search } = req.query;

    let sql = 'SELECT * FROM tasks';
    const params = [];
    const whereClauses = [];

    if (status) {
      whereClauses.push('status = ?');
      params.push(status);
    }
    if (priority) {
      whereClauses.push('priority = ?');
      params.push(priority);
    }
    if (search) {
      whereClauses.push('(title LIKE ? OR description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    sql += ' ORDER BY due_date ASC'; // Order by due date by default

    const [tasks] = await pool.query(sql, params);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Fetch a single task by ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(tasks[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, email, status, priority, due_date } = req.body;
    // ... (validation)
    if (!title || !email) { return res.status(400).json({ message: 'Title and Email are required' }); }

    const sql = 'INSERT INTO tasks (title, description, email, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(sql, [title, description, email, status, priority, due_date]);

    const newTask = { id: result.insertId, ...req.body };
    
    // Send email after successfully creating the task
    sendTaskCreationEmail(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, email, status, priority, due_date } = req.body;

    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!email || email.trim() === '') {
      return res.status(400).json({ message: 'Email is required' });
    }

    const sql = 'UPDATE tasks SET title = ?, description = ?, email=?, status = ?, priority = ?, due_date = ? WHERE id = ?';
    const [result] = await pool.query(sql, [title, description, email, status, priority, due_date, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = { id, title, description, email, status, priority, due_date };
    sendTaskUpdateEmail(updatedTask);
    
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};