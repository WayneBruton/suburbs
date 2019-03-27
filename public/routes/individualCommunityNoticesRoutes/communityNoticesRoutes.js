const express = require('express');
const router = express.Router();
var pool = require('../connection');

router.get('/southpeninsulaNotices', (req, res) => {
    var title = 'South Peninsula';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    var viewColors = '#4267b4'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 6
    res.render('../views/communityNoticesViews/southpeninsulaNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/atlanticseaboardNotices', (req, res) => {
    var title = 'Atlantic Seaboard';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f5c23d;"'
    var viewColors = '#f5c23d'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 1
    res.render('../views/communityNoticesViews/atlanticseaboardNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor

    });
})
router.get('/capeflatsNotices', (req, res) => {
    var title = 'Cape Flats';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #afb1b4;"'
    var viewColors = '#afb1b4'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 2
    res.render('../views/communityNoticesViews/capeflatsNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/citybowlNotices', (req, res) => {
    var title = 'City Bowl';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f7913e;"'
    var viewColors = '#f7913e'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 3
    res.render('../views/communityNoticesViews/citybowlNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/helderbergNotices', (req, res) => {
    var title = 'Helderberg';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #fb3c3f;"'
    var viewColors = '#fb3c3f'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 4
    res.render('../views/communityNoticesViews/helderbergNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/northernsuburbsNotices', (req, res) => {
    var title = 'Northern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #ae9bd9;"'
    var viewColors = '#ae9bd9'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 5
    res.render('../views/communityNoticesViews/northernsuburbsNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/southernsuburbsNotices', (req, res) => {
    var title = 'Southern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #41b62a;"' 
    var viewColors = '#41b62a'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 7
    res.render('../views/communityNoticesViews/southernsuburbsNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})
router.get('/westcoastNotices', (req, res) => {
    var title = 'Westcoast';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f58695;"'
    var viewColors = '#f58695'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 8
    res.render('../views/communityNoticesViews/westcoastNotices', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor
    });
})


router.get('/getNotices/:areaCode', function (req, res) {
    let areaCode = req.params.areaCode;
    console.log(areaCode)

    let sql = `select *
    from notices
    where JSON_CONTAINS(areas, '${areaCode}',"$") and isActive = true order by id desc`
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

router.get('/getNoticeArea/:areaCode', function (req, res) {
    let areaCode = req.params.areaCode;
    console.log(areaCode)

    let sql = `select *
    from areas
    where id = ${areaCode}`

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