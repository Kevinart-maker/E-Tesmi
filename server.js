const express = require('express');
const app = express();
require('dotenv').config({  path: './config/.env' })
const morgan = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const path = require('path');
const port = process.env.PORT 
const cors = require('cors')
const helmet = require('helmet')
const MongoStore = require('connect-mongo')
//passport config file

// enable cross origin resource sharing
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://backend-tesmi.vercel.app/'],
  credentials: true,

}));

// Logger
app.use(morgan("dev"))

//helmet
app.use(helmet());

//Static middleware
app.use('/static', express.static(path.join(__dirname, 'public')));

// body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Express session middleware
app.use(session({
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }

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

// unhandled errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

// // rate-limiting
// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);


// Routes
 app.use('/app', require('./routes/app'))
app.use('/users', require('./routes/users'))
app.use('/cart', require('./routes/cart'))
app.use('/checkout', require('./routes/checkout'))
app.use('/ratings', require('./routes/rating'))

// // Connect to DB
mongoose.connect(process.env.DATABASE_URL, {
    
    serverSelectionTimeoutMS: 5000, // 5 seconds
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
  




// START SERVER
app.listen(port, () => {
    console.log("Server is listening on "+ port)
})