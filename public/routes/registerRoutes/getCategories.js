var express = require('express');
var router = express.Router();
var pool = require('../connection');

router.get('/getCategories', function(req, res){
    let numberOfAreas = req.params.numberOfAreas;

    var sql = `select * from categories where isActive = true order by category_description`;

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