require('dotenv').config();
const mongoose = require('mongoose');
const Toy = require('./models/Toy');

const toys = [
  { name: "Xe hơi điều khiển", price: 500000, description: "Xe hơi điều khiển từ xa", imageUrl: "https://example.com/car.jpg", category: "Đồ chơi điện tử" },
  { name: "Robot thông minh", price: 1200000, description: "Robot có thể nói chuyện", imageUrl: "https://example.com/robot.jpg", category: "Đồ chơi điện tử" },
  { name: "Gấu bông Teddy", price: 200000, description: "Gấu bông mềm mại", imageUrl: "https://example.com/teddy.jpg", category: "Gấu bông" },
  { name: "Lego Star Wars", price: 1500000, description: "Lego chủ đề Star Wars", imageUrl: "https://example.com/lego.jpg", category: "Lego" },
  { name: "Máy bay trực thăng", price: 900000, description: "Trực thăng điều khiển", imageUrl: "https://example.com/helicopter.jpg", category: "Đồ chơi điện tử" },
  { name: "Búp bê công chúa", price: 350000, description: "Búp bê thời trang", imageUrl: "https://example.com/doll.jpg", category: "Búp bê" },
  { name: "Bảng vẽ điện tử", price: 800000, description: "Bảng vẽ thông minh", imageUrl: "https://example.com/drawing.jpg", category: "Đồ chơi học tập" },
  { name: "Xe tải xây dựng", price: 400000, description: "Xe tải mô hình", imageUrl: "https://example.com/truck.jpg", category: "Mô hình" },
  { name: "Bóng rổ mini", price: 250000, description: "Bộ bóng rổ cho bé", imageUrl: "https://example.com/basketball.jpg", category: "Thể thao" },
  { name: "Đồng hồ trẻ em", price: 300000, description: "Đồng hồ thông minh", imageUrl: "https://example.com/watch.jpg", category: "Đồ chơi công nghệ" }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Toy.deleteMany();
    await Toy.insertMany(toys);
    console.log('✅ Dữ liệu mẫu đã được thêm vào MongoDB');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Lỗi khi seed dữ liệu:', error);
    mongoose.connection.close();
  }
}

seedData();
