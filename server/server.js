const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const sampleRoutes = require('./routes/sampleRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware to parse incoming JSON
app.use(express.json());
app.use(cors());

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/order', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/samples', sampleRoutes);
app.use('/api/samples', require('./routes/sampleRoutes'));
app.use('/api', adminRoutes);  // Prefix `/api` for all admin routes

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🧶 Welcome to the Carpet Shop API!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});