const express = require('express');
const router = express.Router();
var pool = require('../connection');


router.get('/AdminpreviewProfile/:clientID', function (req, res) {
    let clientID = req.params.clientID;
    var title = 'Suburbs Directory - Preview'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/adminViews/adminEditProfile', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        clientID: clientID
    }); 
});


router.get('/adminEditProfile/:clientID', function (req, res) {

    let clientID = req.params.clientID;
    console.log(clientID)
    var sql1 = `select * from  client_profiles  where id = ${clientID}`;
    var sql2 = `select * from  areas where isActive = true`;
    var sql3 = `select * from  categories where isActive = true`;
    var sql = `${sql1};${sql2};${sql3}`
    console.log(sql)
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result[0].id)
            console.log(result[0].businessName)
            req.session.clientID = result[0].id;
            req.session.businessName = result[0].businessName;
            res.send(result);
        });
        connection.release();
    });
});



router.post('/adminUpdateProfile', (req, res) => {
    // console.log(req.body);
    let data = req.body;
    console.log(req.body.id)
    let id = req.body.id;
    let businessName = req.body.businessName
    let mob_no = req.body.mob_no
    let email = req.body.email
    let website = req.body.website
    let facebook = req.body.facebook
    let instagram = req.body.instagram
    let linkedin = req.body.linkedin
    let profile_description = req.body.profile_description
    let catarea = req.body.catarea
    let areas = req.body.areas
    let adminAssist = req.body.adminAssist
    let paid_to_date = req.body.paid_to_date
    let payment_expires = req.body.payment_expires
    let terms = req.body.terms
    let selectedOption = req.body.selectedOption
    let profile_approved = req.body.profile_approved

    let sql = `update client_profiles set profile_approved = ${profile_approved}, areas = '[${areas}]', catarea = '[${catarea}]',
                businessName = '${businessName}',  mob_no = '${mob_no}', email = '${email}', website = '${website}'
                , facebook = '${facebook}' , instagram = '${instagram}', linkedin = '${linkedin}', profile_description = '${profile_description}'
                , adminAssist = ${adminAssist}, paid_to_date = ${paid_to_date}, payment_expires = '${payment_expires}', terms = '${terms}', selectedOption = '${selectedOption}' where id = ${id}`
    
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        // connection.query(sql, data, function (error, result) {
        connection.query(sql, function (error, result) {
            if (error) {
                res.send(error)
            } else {
                console.log(result)
                let clientID = req.params.clientID;
                var title = 'Suburbs Directory - Preview'
                // var color = 'color: white;';
                var color = '';
                var navBarType = 'navbar-dark bg-dark';
                // var navBarType = '';
                var backgroundColor = 'background-color: #4267b4;"'
                // res.send(result)
                res.render('../views/adminViews/adminEditProfile', {
                    title: title,
                    color: color,
                    navBarType: navBarType,
                    backgroundColor: backgroundColor,
                    clientID: id
                });

            }
            // res.send(result);
            // res.render('previewProfile')
        });
        connection.release();
    });
});

// router.get('/editprofileImages/:id/:businessName', (req, res)=>{
router.get('/editprofileImages', (req, res) => {
    var title = 'Suburbs Directory - Load Profile'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    // let profileId = req.params.id;
    let profileId = req.session.clientID;

    console.log('ProfileID is::::', profileId)
    // let businessName = req.params.businessName;
    let businessName = req.session.businessName;
    console.log('BusinessName is::::', profileId)


    res.render('../views/adminViews/profileImages', {
        title: title,
        source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        businessName: businessName,
        profileId: profileId
    })
})



module.exports = router;