const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: false }  // Lưu đường dẫn ảnh
});

const Toy = mongoose.model('Toy', toySchema);
module.exports = Toy;
