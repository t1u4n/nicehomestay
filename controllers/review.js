const Homestay = require('../models/homestay');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const homestay = await Homestay.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    homestay.reviews.push(review);
    await review.save();
    await homestay.save();
    req.flash('success', 'Created a new review!');
    res.redirect(`/homestay/${homestay._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Homestay.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!');
    res.redirect(`/homestay/${id}`);
}