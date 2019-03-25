const express = require('express');
const router = express.Router();
var pool = require('../connection');


router.get('/previewProfile/:clientID', function (req, res) {
    let clientID = req.params.clientID;
    var title = 'Suburbs Directory - Preview'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('previewProfile', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        clientID: clientID
    });
});


router.get('/viewNewProfile/:clientID', function (req, res) {

    let clientID = req.params.clientID;
    console.log(clientID)
    var sql = `select * from  client_profiles  where id = ${clientID}`;
    console.log(sql)
    
    // req.session.userID = 'AAAWWWEEESSOME'
    // console.log('THIS IS THE SESSION', req.session, "SESSION IS OVER")


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
    console.log('THIS IS THE SESSION', req.session, "SESSION IS OVER")
            
            res.send(result);
            // res.render('previewProfile')
        });
        connection.release();
    });
});

router.post('/updateProfile', (req, res) => {
    console.log(req.body);
    let data = req.body;
    console.log(req.body.id)
    let id = req.body.id; 

    let sql = `update client_profiles set ? where id = ${req.body.id}`
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, data, function (error, result) {
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
                res.render('previewProfile', {
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
router.get('/editprofileImages', (req, res)=>{
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


    res.render('profileImages', {
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