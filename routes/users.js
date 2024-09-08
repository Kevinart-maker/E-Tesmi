const express = require('express')
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs')
const passport = require('passport')


//login route
router.get("/login", (req, res) => {
    // res.render('login')
    res.send("Hello, World!, welcome to login page");
})

//register route
router.get("/register", (req, res) => {
    res.send("Hello, World!, welcome to signup page");
})

// registration handler
router.post("/register", (req, res) => {

    const { name, email, password, mobileNo } = req.body;
    let errors = [];

    // Validate that all fields are filled
    if (!name || !email || !password || !mobileNo) {
        errors.push({ msg: "Please fill in all fields" });
    }

    // Validate that password is at least 8 characters long
    if (password && password.length < 8) {
        errors.push({ msg: "Password should be at least 8 characters" });
    }

    // Validate that mobile number is at least 10 digits
    if (mobileNo && mobileNo.length < 10) {
        errors.push({ msg: "Mobile number should be at least 10 digits" });
    }

    // Check for errors
    if (errors.length > 0) {
        // res.status(400).render('register', {errors, name, email, password, mobileNo})

        return res.status(400).json({ msg: "Invalid input", errors: errors });
    } else {
        User.findOne({ email:email })
        .then(user => {
            if (user) {
                // If user exists
                errors.push({ msg: "email is already registered" });
                // res.render('register', {errors, name, email, password, mobileNo})
                res.status(400).send("user already exists")
            }
            else {
                const newUser = new User({
                    name, email, password, mobileNo
                });
              // Hash password
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;
                // Store hashed password
                newUser.password = hash;
                // Save user
                newUser.save()
                .then(user => {
                    res.redirect("/users/login")
                    req.flash('success_msg', 'You have successfully signed up, proceed to login')
                    res.send("Successful")
                })
                    
            })) 
            }
        });
    
    }
});


// login request handler
router.post('/login', (res, req, next) =>{
    passport.authenticate('local', {
        successRedirect: '/app/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(res, req, next)
});



// logout request handler
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Handle the error if any
        }
        req.flash('success_msg', 'You have logged out');
        res.redirect('/users/login');
    });
});


module.exports = router;