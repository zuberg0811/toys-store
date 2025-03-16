const mongoose = require('mongoose');

const ToySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true }
});

const Toy = mongoose.model('Toy', ToySchema);
module.exports = Toy;
