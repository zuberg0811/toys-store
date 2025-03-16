require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const toyRoutes = require('./routes/toyRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Chào mừng đến với Toys Store API!');
});


// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Phục vụ ảnh từ thư mục 'uploads'

// Kết nối MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
}
connectDB();

// Routes
app.use('/api/toys', toyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
