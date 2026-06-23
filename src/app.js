require('dotenv').config();

const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'GitHub Profile Analyzer API',
    endpoints: {
      analyzeProfile: 'POST /api/profiles/analyze',
      allProfiles: 'GET /api/profiles',
      singleProfile: 'GET /api/profiles/:username',
      health: 'GET /health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ success: true, status: 'OK' });
});

app.use('/api/profiles', profileRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
