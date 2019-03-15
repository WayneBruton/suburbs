var express = require('express');
var router = express.Router();
var pool = require('./connection');

router.get('/getPackages/:numberOfAreas', function(req, res){
    let numberOfAreas = req.params.numberOfAreas;
    // console.log(numberOfAreas)
    var sql = `select * from packages where number_of_suburbs = ${numberOfAreas} order by id`;
    // console.log(sql)


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






module.exports = router;