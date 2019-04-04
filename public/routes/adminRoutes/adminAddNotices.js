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
    let notice_image = req.body.notice_image
    console.log(notice_image)
    if (notice_image !== undefined) {
        fs.copyFile(`public/${notice_image}`, `public/images/notices/${heading}.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${notice_image}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 200)
    }

    let newNoticeImage = `/images/notices/${heading}.jpg`
    if (notice_image == '' || notice_image == undefined) {
        newNoticeImage = ``
    }

    let sql = `insert into notices (heading, areas, notice_text, isActive, notice_image) values ('${heading}', '[${areas}]', '${notice_text}', ${isActive}, '${newNoticeImage}')`

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

router.get('/deleteNotice/:id', (req, res) => {
    let id = req.params.id
    let sql1 = `select notice_image from notices where id = ${id}`
    let image;
    let sql2 = `delete from notices where id = ${id}`
    let sql = `${sql1};${sql2}`
    console.log(sql)
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            // console.log('This is the result',result[0][0].notice_image)
            image = result[0][0].notice_image;
            // console.log(image)
            res.send(result);
        });
        connection.release();
    })
    // console.log(`public${image}`)
    setTimeout(() => {
        console.log(image)
        fs.unlink(`public${image}`, (err) => {
            if (err) {
                console.log(err)
            };
        })
    },800)
})



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
    let notice_image = req.body.notice_image;
    console.log(notice_image)
    
    if (notice_image !== undefined) {
        fs.copyFile(`public/${notice_image}`, `public/images/notices/${heading}.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${notice_image}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 200)
    }
    let updateImage;
    if (notice_image == undefined) {
        updateImage = ''
    } else {
        updateImage =  `/images/notices/${heading}.jpg`
    }
    let sql = `update notices set heading = '${heading}', areas = '[${areas}]' , notice_text = '${notice_text}', isActive = ${isActive}, notice_image = '${updateImage}' where id = ${id}`

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