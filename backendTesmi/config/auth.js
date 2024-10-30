module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in to view this page')
        res.json({ message: "Please log in to view this resource" })
        // res.redirect('/users/login')
        // res.redirect('/users/login')
    }
}