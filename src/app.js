const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./modules/auth/auth.routes');
const taskRoutes = require('./modules/tasks/tasks.routes');

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Swagger Docs - lazy load to avoid startup crash
app.use('/api/docs', (req, res, next) => {
  try {
    const swaggerUi = require('swagger-ui-express');
    const swaggerSpec = require('./config/swagger');
    swaggerUi.serve(req, res, next);
  } catch (e) {
    res.send('Swagger not available');
  }
});

app.get('/api/docs', (req, res) => {
  try {
    const swaggerUi = require('swagger-ui-express');
    const swaggerSpec = require('./config/swagger');
    res.send(swaggerUi.generateHTML(swaggerSpec));
  } catch (e) {
    res.send('Swagger not available');
  }
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'API is running', version: 'v1' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;