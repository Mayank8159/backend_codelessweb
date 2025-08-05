const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');

dotenv.config({ override: true }); // ✅ Avoid duplicate .env injection

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // ✅ MongoDB connection without deprecated options

    // ✅ Define allowed origins
    const allowedOrigins = ['http://localhost:5173', 'https://codelessweb.io'];

    const corsOptions = {
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
    };

    // ✅ Apply CORS middleware
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions)); // ✅ Handle preflight requests

    // ✅ Parse JSON bodies
    app.use(express.json());

    // ✅ Health check
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