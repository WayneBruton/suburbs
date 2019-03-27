const express = require('express');
const router = express.Router();
const pool = require('../connection');
const fs = require('fs')


router.get('/addNotice', (req, res) => {
    var title = 'Suburbs Directory - Add Notice'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/adminViews/adminAddNotice', {
        title: title,
        source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    })
})
router.post('/createNotice', (req, res) => {
    let heading = req.body.heading
    let areas = req.body.areas
    let notice_text = req.body.notice_text
    let isActive = req.body.isActive

    let sql = `insert into notices (heading, areas, notice_text, isActive) values ('${heading}', '[${areas}]', '${notice_text}', ${isActive})`

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            res.send(result);
        });
        connection.release();
    });
});
router.get('/getLatestNotices', (req, res) => {
    
    let sql = `select id, heading, created_at from notices order by id desc`

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            res.send(result);
        });
        connection.release();
    });
})

router.get('/adminEditNotice/:id', (req, res) => {
    var id = req.params.id;
    var title = 'Suburbs Directory - Add Notice'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/adminViews/adminEditNotice', {
        title: title,
        source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        id: id
    })
})

router.get('/getNoticeToEdit/:id', (req, res) => {
    let id = req.params.id;
    let sql = `select * from notices where id = ${id}`

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('Error', error)
            };
            res.send(result);
        });
        connection.release();
    });

})
router.post('/updateNotice', (req, res) => {
    let id = req.body.id
    let heading = req.body.heading
    let areas = req.body.areas
    let notice_text = req.body.notice_text
    let isActive = req.body.isActive
    let sql = `update notices set heading = '${heading}', areas = '[${areas}]' , notice_text = '${notice_text}', isActive = ${isActive} where id = ${id}`

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            res.send(result);
        });
        connection.release();
    });
})

module.exports = router;