const express = require('express');
const multer = require('multer');
const Toy = require('../models/toyModel');

const router = express.Router();

// Cấu hình lưu ảnh vào thư mục 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Lưu ảnh vào thư mục uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách đồ chơi' });
  }
});

// Thêm sản phẩm mới
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newToy = new Toy({ name, price, stock, image: imagePath });
    await newToy.save();

    res.status(201).json({ message: 'Thêm đồ chơi thành công!', toy: newToy });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm đồ chơi' });
  }
});

// Cập nhật sản phẩm
router.put('/update/:id', async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const updatedToy = await Toy.findByIdAndUpdate(req.params.id, { name, price, stock }, { new: true });

    if (!updatedToy) return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });

    res.json({ message: 'Cập nhật thành công!', toy: updatedToy });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
  }
});

// Xóa sản phẩm
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedToy = await Toy.findByIdAndDelete(req.params.id);
    if (!deletedToy) return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });

    res.json({ message: 'Xóa sản phẩm thành công!' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
  }
});

module.exports = router;
