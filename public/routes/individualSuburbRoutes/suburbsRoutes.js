const express = require('express');
const router = express.Router();

router.get('/southpeninsula', (req, res) => {
    var title = 'South Peninsula';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    var viewColors = '#4267b4'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 6
    res.render('../views/suburbsViews/southpeninsula', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/atlanticseaboard', (req, res) => {
    var title = 'Atlantic Seaboard';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f5c23d;"'
    var viewColors = '#f5c23d'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 1

    res.render('../views/suburbsViews/atlanticseaboard.ejs', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor

    });
})
router.get('/capeflats', (req, res) => {
    var title = 'Cape Flats';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #afb1b4;"'
    var viewColors = '#afb1b4'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 2
    res.render('../views/suburbsViews/capeflats', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/citybowl', (req, res) => {
    var title = 'City Bowl';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f7913e;"'
    var viewColors = '#f7913e'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 3
    res.render('../views/suburbsViews/citybowl', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/helderberg', (req, res) => {
    var title = 'Helderberg';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #fb3c3f;"'
    var viewColors = '#fb3c3f'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 4
    res.render('../views/suburbsViews/helderberg', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/northernsuburbs', (req, res) => {
    var title = 'Northern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #ae9bd9;"'
    var viewColors = '#ae9bd9'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 5
    res.render('../views/suburbsViews/northernsuburbs', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/southernsuburbs', (req, res) => {
    var title = 'Southern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #41b62a;"' 
    var viewColors = '#41b62a'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 7
    res.render('../views/suburbsViews/southernsuburbs', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/westcoast', (req, res) => {
    var title = 'Westcoast';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f58695;"'
    var viewColors = '#f58695'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 8
    res.render('../views/suburbsViews/westcoast', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})

module.exports = router