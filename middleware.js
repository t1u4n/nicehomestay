module.exports.isLoggedIn = (req, res, next) => {
    // store the url which is requesting
    if(!req.isAuthenticated()){
        // console.log(req.session);
        req.flash('error', 'Please sign in!');
        // redirect to the url we stored before
        return res.redirect('/login');
    }
    next();
}