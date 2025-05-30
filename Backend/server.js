const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectdb = require('./config/db');
const authRoutes = require('./routes/authRoutes');  // ✅ Import your auth routes
const userRoutes = require('./routes/userRoutes');  // ✅ (if needed)


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // ✅ Attach your API routes here
app.use('/api/users', userRoutes); // ✅ If you have userRoutes


app.get('/', (req, res) => {
  res.send('SubWave API is running ');
});

// Connect Database and Start Server
connectdb()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server started on port', process.env.PORT || 5000);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
