const Homestay = require('../models/homestay');

module.exports.index = async (req, res) => {
    const homestay = await Homestay.find({});
    res.render('./homestay/index', { homestay });
}

module.exports.renderNewForm = (req, res) => {
    res.render('homestay/new');
}

module.exports.createHomestay = async (req, res) => {
    const homestay = new Homestay(req.body.homestay);
    homestay.author = req.user._id;
    await homestay.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/homestay/${homestay._id}`);
}

module.exports.showHomestay = async (req, res) => {
    const { id } = req.params;
    const homestay = await Homestay.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!homestay){
        req.flash('error', 'Cannot find that homestay!');
        res.redirect('/homestay');
    }
    res.render('homestay/show', { homestay });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const homestay = await Homestay.findById(id);
    if(!homestay){
        req.flash('error', 'Cannot find that homestay!');
        res.redirect('/homestay');
    }
    res.render('homestay/edit', { homestay });
}

module.exports.updateHomestay = async (req, res) => {
    const { id } = req.params;
    const homestay = await Homestay.findByIdAndUpdate(id, { ...req.body.homestay }, { new : true});
    req.flash('success', 'Successfully update homestay!')
    res.redirect(`/homestay/${homestay._id}`);
}

module.exports.deleteHomestay = async (req, res) => {
    const { id } = req.params;
    const homestay = await Homestay.findById(id);
    if(!homestay.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/homestay/${id}`);
    }
    await Homestay.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a homestay!');
    res.redirect('/homestay');
}