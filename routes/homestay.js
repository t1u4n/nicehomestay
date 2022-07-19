const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Homestay = require('../models/homestay');
const { homestaySchema } = require("../schemas");
const { isLoggedIn, isAuthor, validateHomestay } = require('../middleware');
const { populate } = require("../models/homestay");
const homestayController = require('../controllers/homestay');

router.route('/')
    .get(catchAsync(homestayController.index))
    .post(isLoggedIn, validateHomestay, catchAsync(homestayController.createHomestay))

router.get('/new', isLoggedIn, homestayController.renderNewForm);

router.route('/:id')
    .get(catchAsync(homestayController.showHomestay))
    .put(isLoggedIn, isAuthor, validateHomestay, catchAsync(homestayController.updateHomestay))
    .delete(isLoggedIn, isAuthor, catchAsync(homestayController.deleteHomestay))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(homestayController.renderEditForm));

module.exports = router;