const { registerUser, loginUser } = require('./auth.service');
const response = require('../../utils/response');

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return response.success(res, user, 'User registered successfully.', 201);
  } catch (err) {
    return response.error(res, err.message, err.status || 500);
  }
};

const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    return response.success(res, data, 'Login successful.');
  } catch (err) {
    return response.error(res, err.message, err.status || 500);
  }
};

const getMe = async (req, res) => {
  return response.success(res, req.user, 'Authenticated user.');
};

module.exports = { register, login, getMe };