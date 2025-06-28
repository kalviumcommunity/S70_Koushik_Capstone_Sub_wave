const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
<<<<<<< HEAD
=======
const budgetRoutes = require('./routes/budgetRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
>>>>>>> be25477 (Implemented google)
const adminRoutes = require('./routes/adminRoutes');
const cron = require('node-cron');
const { sendRenewalReminders } = require('./controllers/subscriptionController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('SubWave API is running');
});

// Routes
app.use('/api/auth', authRoutes);  // login, register
app.use('/api/auth', userRoutes);  // profile, update, delete, all users
app.use('/api/subscriptions', subscriptionRoutes);  // subscription management
<<<<<<< HEAD
=======
app.use('/api/budget', budgetRoutes);  // budget management
app.use('/api/notifications', notificationRoutes);  // notification management
>>>>>>> be25477 (Implemented google)
app.use('/api/admin', adminRoutes);  // admin operations

// Swagger API documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SubWave API',
      version: '1.0.0',
      description: 'API documentation for SubWave backend',
    },
    servers: [
      { url: 'http://localhost:5000' }
    ],
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use(errorHandler);

// Schedule daily renewal reminder emails at 8am
cron.schedule('0 8 * * *', async () => {
  await sendRenewalReminders();
  console.log('Renewal reminder emails sent.');
});

// Connect to DB and start server
 connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
