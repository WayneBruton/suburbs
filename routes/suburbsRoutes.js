const express = require('express');
const router = express.Router();

router.get('/southpeninsula', (req, res) => {
    var title = 'South Peninsula';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'

    res.render('southpeninsula', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
router.get('/atlanticseaboard', (req, res) => {
    var title = 'Atlantic Seaboard';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f5c23d;"'

    res.render('atlanticseaboard', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
router.get('/capeflats', (req, res) => {
    var title = 'Cape Flats';
    var color = 'color: white;';
    console.log('THIS IS THE USER SESSION::',req.session.userID)
    var navBarType = '';
    var backgroundColor = 'background-color: #afb1b4;"'
    res.render('capeflats', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
router.get('/citybowl', (req, res) => {
    var title = 'City Bowl';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f7913e;"'
    res.render('citybowl', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
router.get('/helderberg', (req, res) => {
    var title = 'Helderberg';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #fb3c3f;"'
    res.render('helderberg', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
router.get('/northernsuburbs', (req, res) => {
    var title = 'Northern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #ae9bd9;"'
    res.render('northernsuburbs', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
router.get('/southernsuburbs', (req, res) => {
    var title = 'Southern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #41b62a;"'
    res.render('southernsuburbs', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
router.get('/westcoast', (req, res) => {
    var title = 'Westcoast';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f58695;"'
    res.render('westcoast', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

module.exports = router