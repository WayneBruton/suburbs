const express = require('express');
const router = express.Router();
var pool = require('../connection');  



router.get('/getprofiles/:option', function(req, res){
    let option = req.params.option;
    let additionalSQL;
    console.log(option)
    if (option == 1) {
        additionalSQL = 'profile_approved = false'
    } else if (option == 2) {
        additionalSQL = 'profile_approved = true'
    } else if (option == 3) {
        additionalSQL = 'profile_approved = true and paid_to_date = false'
    }
    profile_approved = false

    let sql = `select id, businessName, email from client_profiles where ${additionalSQL} order by businessName`
    console.log(sql);
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
          }
          connection.query(sql, function(error, result) {
            if (error) throw error;
            console.log(result)
            res.send(result);
        });
        connection.release();
    });
});
router.get('/getprofilesByName/:option', function(req, res){
    let option = req.params.option;
    

    let sql = `select id, businessName, email from client_profiles where businessName like '%${option}%'`
    console.log(sql);
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
          }
          connection.query(sql, function(error, result) {
            if (error) throw error;
            console.log(result)
            res.send(result);
        });
        connection.release();
    });
});





// router.get('/login', (req, res) => {
//     var title = 'Login'
//     // var color = 'color: white;';
//     var color = '';
//     var navBarType = 'navbar-dark bg-dark';
//     // var navBarType = '';
//     var backgroundColor = 'background-color: #4267b4;"'
//     // console.log(req.session.userID)
//     let message = '';
//     // if (req.session.userID != undefined) {
//     res.render('login', {
//         title: title,
//         source: "",
//         source2: "",
//         color: color,
//         navBarType: navBarType,
//         backgroundColor: backgroundColor,
//         message: message
//     });
// })


// var queryClients = `select cl.id, last_name,first_name, ct.client_type_description as cType from clients cl
// join
// client_type  ct on cl.client_type = ct.id
// where active = true
// order by last_name`;
// var queryCarers = 'Select * from carers WHERE ACTIVE = true ORDER BY LAST_NAME';
// var sql = `${queryClients};${queryCarers}`;



module.exports = router;