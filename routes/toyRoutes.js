const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Toy = require('../models/toyModel');

const router = express.Router();

// Kiểm tra thư mục 'uploads/', nếu chưa có thì tạo mới
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Cấu hình lưu ảnh vào thư mục 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Kiểm tra định dạng ảnh hợp lệ
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh có định dạng .jpg, .jpeg, .png, .webp'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// API thêm sản phẩm với ảnh
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Kiểm tra nếu không có file được tải lên
    if (!req.file) {
      return res.status(400).json({ error: 'Vui lòng chọn ảnh để tải lên!' });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newToy = new Toy({ name, price, category, image: imagePath });
    await newToy.save();

    res.status(201).json({ message: 'Thêm đồ chơi thành công!', toy: newToy });
  } catch (error) {
    console.error('Lỗi khi thêm đồ chơi:', error);
    res.status(500).json({ error: 'Lỗi khi thêm đồ chơi' });
  }
});

// API lấy danh sách đồ chơi
router.get('/', async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đồ chơi:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách đồ chơi' });
  }
});

module.exports = router;
