const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB with error handling
const startServer = async () => {
  try {
    await connectDB();

    // ✅ Use CORS with restricted origins
   const allowedOrigins = ['http://localhost:5173', 'https://codelessweb.io'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

    // ✅ Use built-in JSON parser
    app.use(express.json());

    // ✅ Health check route
    app.get('/', (req, res) => {
      res.send('API is running');
    });

    // ✅ API routes
    app.use('/api', emailRoutes);

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();