const express = require('express');
const router = express.Router();
var pool = require('./connection');


router.get('/previewProfile/:clientID', function(req, res){
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

router.get('/viewNewProfile/:clientID', function(req, res){

    let clientID = req.params.clientID;
    console.log(clientID)
    var sql = `select * from  client_profiles  where id = ${clientID}`;
    console.log(sql)
    pool.getConnection(function(err, connection){
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
          }
          connection.query(sql, function(error, result) {
            if (error) throw error;
            console.log(result)
            res.send(result);
            // res.render('previewProfile')
        });
        connection.release();
    });
    
});

module.exports = router;