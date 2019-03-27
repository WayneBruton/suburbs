const express = require('express');
const router = express.Router();
var pool = require('../connection');


router.get('/previewProfile/:clientID', function (req, res) {
    let clientID = req.params.clientID;
    var title = 'Suburbs Directory - Preview'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
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
    var sql = `select * from  client_profiles  where id = ${clientID}`;
    console.log(sql)
    
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('error', error)
            }
            req.session.clientID = result[0].id;
            req.session.businessName = result[0].businessName;     
            res.send(result);
        });
        connection.release();
    });
});

router.post('/updateProfile', (req, res) => {
    let data = req.body;
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
                let clientID = req.params.clientID;
                var title = 'Suburbs Directory - Preview'
                var color = '';
                var navBarType = 'navbar-dark bg-dark';
                var backgroundColor = 'background-color: #4267b4;"'
                res.render('previewProfile', {
                    title: title,
                    color: color,
                    navBarType: navBarType,
                    backgroundColor: backgroundColor,
                    clientID: id
                });              
            }
        });
        connection.release();
    });
}); 


router.get('/editprofileImages', (req, res)=>{
    var title = 'Suburbs Directory - Load Profile'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'
    let profileId = req.session.clientID;
    let businessName = req.session.businessName;

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