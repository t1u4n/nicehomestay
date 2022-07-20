const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateHomestay } = require('../middleware');
const homestayController = require('../controllers/homestay');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(homestayController.index))
    .post(isLoggedIn, upload.array('image'), validateHomestay, catchAsync(homestayController.createHomestay))

router.get('/new', isLoggedIn, homestayController.renderNewForm);

router.route('/:id')
    .get(catchAsync(homestayController.showHomestay))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateHomestay, catchAsync(homestayController.updateHomestay))
    .delete(isLoggedIn, isAuthor, catchAsync(homestayController.deleteHomestay))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(homestayController.renderEditForm));

module.exports = router;