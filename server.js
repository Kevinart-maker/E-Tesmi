const express = require('express');
const app = express();
require('dotenv').config({  path: './config/.env' })
const morgan = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT 
const cors = require('cors')
//passport config file
require('./config/passport')(passport);

// Logger
app.use(morgan("dev"))

// enable cross origin resource sharing
app.use(cors());

// body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));

// Passport middlware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash Middleware
app.use(flash());

//Global variables for messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
 app.use('/app', require('./routes/app'))
app.use('/users', require('./routes/users'))
app.use('/cart', require('./routes/cart'))
app.use('/checkout', require('./routes/checkout'))
app.use('/ratings', require('./routes/rating'))

// // Connect to DB
mongoose.connect(process.env.DATABASE_URL) 
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));




// START SERVER
app.listen(port, () => {
    console.log("Server is listening on "+ port)
})