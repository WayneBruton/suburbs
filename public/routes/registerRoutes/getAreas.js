var express = require('express');
var router = express.Router();
var pool = require('../connection');

router.get('/getAreas', function(req, res){
    let numberOfAreas = req.params.numberOfAreas;
    var sql = `select * from areas where isActive = true order by id`;



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