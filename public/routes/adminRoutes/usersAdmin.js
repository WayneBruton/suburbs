const express = require('express');
const router = express.Router();
var pool = require('../connection');  



router.get('/getprofiles/:option', function(req, res){
    let option = req.params.option;
    let additionalSQL;
    if (option == 1) {
        additionalSQL = 'profile_approved = false'
    } else if (option == 2) {
        additionalSQL = 'profile_approved = true'
    } else if (option == 3) {
        additionalSQL = 'profile_approved = true and paid_to_date = false'
    }
    profile_approved = false

    let sql = `select id, businessName, email from client_profiles where ${additionalSQL} order by businessName`
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
          }
          connection.query(sql, function(error, result) {
            if (error) throw error;
            res.send(result);
        });
        connection.release();
    });
});
router.get('/getprofilesByName/:option', function(req, res){
    let option = req.params.option;
    
    let sql = `select id, businessName, email from client_profiles where businessName like '%${option}%'`
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
          }
          connection.query(sql, function(error, result) {
            if (error) throw error;
            res.send(result);
        });
        connection.release();
    });
});

module.exports = router;