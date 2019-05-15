const router = require('express').Router();
const passport = require('passport');

require('../index');
const Horno = require('../models/horno');
const Molienda = require('../models/molienda');
const Ciudad = require('../models/ciudad');
const HM = require('../models/hm');
const Entrada = require('../models/entrada');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/city',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/city',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/gps', isAuthenticated, async (req, res, next) => {
    const ciudad = await Ciudad.find();
    res.render('gps',{
        ciudad
    });
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
    const horno = await Horno.find();
    const molienda = await Molienda.find();
    const hm = await HM.find();
    res.render('uploading', {
        horno,
        molienda,
        hm
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
    const horno = new Horno(req.body);
    await horno.save();
    console.log(horno);
    res.redirect('/upload');
});

router.post('/agregarMolienda',isAuthenticated, async (req,res) => {
    const molienda = new Molienda(req.body);
    await molienda.save();
    console.log(molienda);
    res.redirect('/upload')
});

router.post('/agregarHM',isAuthenticated, async (req,res) => {
    const hm = new HM(req.body);
    await hm.save();
    console.log(hm);
    res.redirect('/upload')
});

router.post('/agregarCiudad',isAuthenticated, async (req,res) => {
    const ciudad = new Ciudad(req.body);
    await ciudad.save();
    console.log(ciudad);
    res.redirect('/gps');
});

router.post('/agregarCabecera',isAuthenticated, async (req,res) => {
    const entrada = new Entrada(req.body);
    await entrada.save();
    console.log(entrada);
    res.redirect('/upload');
});

router.get('/delete/:id', isAuthenticated, async (req,res) => {
    const { id } = req.params;
    await Horno.remove({ _id: id });
    res.redirect('/upload');
});

router.get('/agregarDistancia/:imolienda/:idistancia', isAuthenticated, async (req,res) => {
    const hm = new HM(req.params);
    await hm.save()
    res.redirect('/upload');
});

router.get('/deleteVenta/:id', isAuthenticated, async (req,res) => {
    const { id } = req.params;
    await Molienda.remove({ _id: id });
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