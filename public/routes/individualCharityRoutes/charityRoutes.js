const express = require('express');
const router = express.Router();
var pool = require('../connection');

router.get('/southpeninsulaCharity', (req, res) => {
    var title = 'South Peninsula';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    var viewColors = '#4267b4'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 6
    res.render('../views/charityViews/southpeninsulaCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/atlanticseaboardCharity', (req, res) => {
    var title = 'Atlantic Seaboard';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f5c23d;"'
    var viewColors = '#f5c23d'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 1
    res.render('../views/charityViews/atlanticseaboardCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor

    });
})
router.get('/capeflatsCharity', (req, res) => {
    var title = 'Cape Flats';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #afb1b4;"'
    var viewColors = '#afb1b4'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 2
    res.render('../views/charityViews/capeflatsCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/citybowlCharity', (req, res) => {
    var title = 'City Bowl';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f7913e;"'
    var viewColors = '#f7913e'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 3
    res.render('../views/charityViews/citybowlCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/helderbergCharity', (req, res) => {
    var title = 'Helderberg';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #fb3c3f;"'
    var viewColors = '#fb3c3f'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 4
    res.render('../views/charityViews/helderbergCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/northernsuburbsCharity', (req, res) => {
    var title = 'Northern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #ae9bd9;"'
    var viewColors = '#ae9bd9'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 5
    res.render('../views/charityViews/northernsuburbsCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/southernsuburbsCharity', (req, res) => {
    var title = 'Southern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #41b62a;"' 
    var viewColors = '#41b62a'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 7
    res.render('../views/charityViews/southernsuburbsCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/westcoastCharity', (req, res) => {
    var title = 'Westcoast';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f58695;"'
    var viewColors = '#f58695'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 8
    res.render('../views/charityViews/westcoastCharity', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})


router.get('/getCharityProfile/:areaCode', function (req, res) {
    let areaCode = req.params.areaCode;
    var sql = `Select * from charities where isActive = true and areas = ${areaCode}`

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            res.send(result);
        });
        connection.release();
    });
});

module.exports = router