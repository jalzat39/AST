const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

// initializations
const app = express();
require('./database');
require('./passport/local-auth');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');


// middlewares
app.use('/images', express.static('images'));

app.use( express.static( "public" ) );
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    app.locals.position = req.position;
    console.log(app.locals)
    next();
});

// routes

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));


// Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});