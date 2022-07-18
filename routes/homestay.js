const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Homestay = require('../models/homestay');
const ExpressError = require("../utils/ExpressError");
const { homestaySchema } = require("../schemas");


const validateHomestay = (req, res, next) => {
    const { error } = homestaySchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const homestay = await Homestay.find({});
    res.render('./homestay/index', { homestay });
}))

router.get('/new', (req, res) => {
    res.render('homestay/new');
})

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const homestay = await Homestay.findById(id).populate('reviews');
    if(!homestay){
        req.flash('error', 'Cannot find that homestay!');
        res.redirect('/homestay');
    }
    res.render('homestay/show', { homestay });
}))

router.post('/', validateHomestay, catchAsync(async (req, res) => {
    // if(!req.body.homestay) throw new ExpressError('Invalid Homestay', 400);
    const homestay = new Homestay(req.body.homestay);
    await homestay.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/homestay/${homestay._id}`);
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const homestay = await Homestay.findById(id);
    if(!homestay){
        req.flash('error', 'Cannot find that homestay!');
        res.redirect('/homestay');
    }
    res.render('homestay/edit', { homestay });
}))

router.put('/:id', validateHomestay, catchAsync(async (req, res) => {
    const { id } = req.params;
    const homestay = await Homestay.findByIdAndUpdate(id, { ...req.body.homestay }, { new : true});
    req.flash('success', 'Successfully update homestay!')
    res.redirect(`/homestay/${homestay._id}`);
}))

router.delete('/:id', catchAsync(async (req, res) => {
    await Homestay.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted a homestay!');
    res.redirect('/homestay');
}))

module.exports = router;