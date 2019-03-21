const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    var title = 'Suburbs Directory - Home'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('index', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
});

router.get('/about', function (req, res) {
    var title = 'Suburbs Directory - About'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/menuViews/about', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
});

router.get('/register', (req, res) => {
    var title = 'Suburbs Directory - Register'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/menuViews/register', {
        title: title,
        source: "",
        source2: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

router.get('/charityApplication', (req, res) => {
    var title = 'Suburbs Directory - Charity'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/menuViews/charityApplication', {
        title: title,
        source: "",
        source2: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

router.get('/terms', (req, res) => {
    var title = 'Suburbs Directory - Terms & Conditions'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/menuViews/terms', {
        title: title, source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });

})

router.get('/packages', (req, res) => {
    var title = 'Suburbs Directory - Package Options'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/menuViews/packages', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

router.get('/contact', (req, res) => {
    var title = 'Suburbs Directory - Contact Us'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var message = '';
    var alertType = 'success'
    var display = 'none'
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/menuViews/contact', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        message: message,
        display: display,
        alertType: alertType
    });
    // res.send({data: 'test'});
})

// router.get('/editprofileImages', (req, res)=>{
//     var title = 'Suburbs Directory - Load Profile'
//     // var color = 'color: white;';
//     var color = '';
//     var navBarType = 'navbar-dark bg-dark';
//     // var navBarType = '';
//     var backgroundColor = 'background-color: #4267b4;"'
//     let profileId = 215;
//     let businessName = 'Bob the Builder'
//     res.render('profileImages', {
//         title: title,
//         source: "",
//         color: color,
//         navBarType: navBarType,
//         backgroundColor: backgroundColor,
//         businessName: businessName,
//         profileId: profileId
//     });
// }) 

module.exports = router;