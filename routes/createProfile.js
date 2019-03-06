const express = require('express');
const router = express.Router();

router.post('/createProfile', (req, res) => {

    var title = 'Suburbs Directory - Load Profile'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('profileImages', {
        title: title, source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

module.exports = router;