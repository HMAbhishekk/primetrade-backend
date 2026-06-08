const pool = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async ({ name, email, password, role }) => {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) throw { status: 409, message: 'Email already registered.' };

  const hashed = await bcrypt.hash(password, 12);
  const userRole = role === 'admin' ? 'admin' : 'user';

  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, hashed, userRole]
  );
  return result.rows[0];
};

const loginUser = async ({ email, password }) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) throw { status: 401, message: 'Invalid email or password.' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: 'Invalid email or password.' };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { registerUser, loginUser };