const pool = require('../../config/db');

const getAllTasks = async (userId, role) => {
  if (role === 'admin') {
    const result = await pool.query(
      'SELECT tasks.*, users.name as owner FROM tasks JOIN users ON tasks.user_id = users.id ORDER BY tasks.created_at DESC'
    );
    return result.rows;
  }
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

const getTaskById = async (id, userId, role) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  const task = result.rows[0];
  if (!task) throw { status: 404, message: 'Task not found.' };
  if (role !== 'admin' && task.user_id !== userId)
    throw { status: 403, message: 'Access denied.' };
  return task;
};

const createTask = async ({ title, description, status }, userId) => {
  const result = await pool.query(
    'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, status || 'pending', userId]
  );
  return result.rows[0];
};

const updateTask = async (id, userId, role, updates) => {
  const task = await getTaskById(id, userId, role);
  const { title, description, status } = updates;
  const result = await pool.query(
    'UPDATE tasks SET title=$1, description=$2, status=$3, updated_at=NOW() WHERE id=$4 RETURNING *',
    [title || task.title, description || task.description, status || task.status, id]
  );
  return result.rows[0];
};

const deleteTask = async (id, userId, role) => {
  await getTaskById(id, userId, role);
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return { id };
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };