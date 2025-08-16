require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
connectDB();

const app = express();

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '2mb' }));

// Static files
app.use('/uploads', express.static(uploadsDir));

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'mehndi-me backend' });
});

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));
app.use('/api/proposals', require('./src/routes/proposalRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/blog', require('./src/routes/blogRoutes'));

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});


