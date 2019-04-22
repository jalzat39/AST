const router = require('express').Router();
const passport = require('passport');

require('../index');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/gps',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/gps',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/gps', isAuthenticated, (req, res, next) => {
    res.render('gps');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.post('/save', passport.authenticate('local-save', {
    successRedirect: '/',
    failureRedirect: '/gps',
    failureFlash: true
}));

router.get('/city', isAuthenticated, (req, res, next) => {
    res.render('ciudad');
});

router.get('/upload', isAuthenticated, (req, res, next) => {
    res.render('uploading');
});

router.post('/upl', isAuthenticated,(req,res) => {
    let EDFile = req.files.file
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).send({ message : 'File upload' })
    })
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/')
}

module.exports = router;