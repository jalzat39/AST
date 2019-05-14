const router = require('express').Router();
const passport = require('passport');

require('../index');
const Demanda = require('../models/demanda');
const Venta = require('../models/venta');

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

router.get('/upload', isAuthenticated, async (req, res, next) => {
    const demanda = await Demanda.find();
    const venta = await Venta.find();
    res.render('uploading', {
        demanda,
        venta
    });
});

router.get('/uploadO', isAuthenticated, (req, res, next) => {
    res.render('uploadingO');
});

router.get('/savePl', isAuthenticated, (req, res, next) => {
    res.render('uploading');
});

router.post('/upl', isAuthenticated,(req,res) => {
    let EDFile = req.files.file
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).render('uploading')
    })
});

router.post('/agregar',isAuthenticated, async (req,res) => {
    const demanda = new Demanda(req.body);
    await demanda.save();
    console.log(demanda);
    res.redirect('/upload');
});

router.post('/agregarVenta',isAuthenticated, async (req,res) => {
    const venta = new Venta(req.body);
    await venta.save();
    console.log(venta);
    res.redirect('/upload');
});

router.post('/agregarCabecera',isAuthenticated, async (req,res) => {
    res.redirect('/upload');
});

router.post('/uplO', isAuthenticated,(req,res) => {
    let EDFile = req.files.file
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).render('uploadingO')
    })
});

router.get('/descargar/:id',function(req,res){
    res.download('./files/'+req.params.id,req.params.id,function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log("Listo")
        } 
    });
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/')
}

module.exports = router;