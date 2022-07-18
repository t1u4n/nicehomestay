const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const Homestay = require('../models/homestay');
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schemas");
const Review = require('../models/review');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const homestay = await Homestay.findById(req.params.id);
    const review = new Review(req.body.review);
    homestay.reviews.push(review);
    await review.save();
    await homestay.save();
    req.flash('success', 'Created a new review!');
    res.redirect(`/homestay/${homestay._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Homestay.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!');
    res.redirect(`/homestay/${id}`);
}));

module.exports = router;