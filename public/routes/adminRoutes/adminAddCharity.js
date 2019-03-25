const express = require('express');
const router = express.Router();
const pool = require('../connection');
const fs = require('fs')


// ================== populates the dashboard ========================
router.get('/getLatestCharities', (req, res) => {
    let mysql = 'select id, businessName, email from charities'
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(mysql, function (error, result) {
            if (error) throw error;
            console.log(result)
            res.send(result);
        });
        connection.release();
    });

})



router.get('/addCharity', (req, res) => {
    var title = 'Suburbs Directory - Load Profile'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/adminViews/adminAddCharity', {
        title: title,
        source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    })
})
// ========== Opens EDIT Charity View =================
router.get('/adminEditCharity/:id', (req, res) => {
    let id = req.params.id;
    var title = 'Suburbs Directory - Load Profile'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('../views/adminViews/adminEditCharity', {
        title: title,
        source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        id: id
    })
})
// ========== retrieves charity data for editing =================

router.get('/retrieveCharity/:charityID', (req, res) => {
    let charityID = req.params.charityID;
    let mysql = `select * from charities where id = ${charityID}`
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(mysql, function (error, result) {
            if (error) throw error;
            console.log(result)
            res.send(result);
        });
        connection.release();
    });

    console.log(charityID)

})


// ============== Creates a new Charity ======================

router.post('/createCharity', (req, res) => {
    let image = req.body.charityImg;
    let businessName = req.body.businessName
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let mob_no = req.body.mob_no
    let email = req.body.email
    let website = req.body.website
    let facebook = req.body.facebook
    let areas = req.body.areaSelect
    let profile_description = req.body.businessDescription
    let bankName = req.body.bankName
    let branchName = req.body.branchName
    let accountNumber = req.body.accountNumber
    let branchCode = req.body.branchCode
    let isActive = req.body.isActive

    console.log(req.body)

    if (image !== undefined) {
        fs.copyFile(`public/${image}`, `public/images/charities/${businessName}.jpg`, (err) => {
            if (err) throw err;
            console.log(image, 'copied to')
        })
        setTimeout(() => {
            fs.unlink(`public/${image}`, (err) => {
                if (err) throw err;
                console.log('Succesfully deleted')
            })
        }, 200)

    }

    let charity_image = `/images/charities/${businessName}.jpg`

    var sql = `Insert into charities (businessName,first_name,last_name,mob_no,email,website,
            facebook,areas,profile_description,bankName,branchName,accountNumber,branchCode,isActive, charity_image) values (
                '${businessName}','${first_name}','${last_name}','${mob_no}','${email}','${website}','${facebook}',${areas},
                '${profile_description}','${bankName}','${branchName}','${accountNumber}','${branchCode}',${isActive},'${charity_image}'
            )`;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result)
            res.send(result);
        });
        connection.release();
    });
})


// ============== Edit existing Charity ======================

router.post('/editCharity', (req, res) => {
    let id = req.body.id
    let originalImage = req.body.originalCharityImage
    let image = req.body.newCharityImg;
    let businessName = req.body.businessName
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let mob_no = req.body.mob_no
    let email = req.body.email
    let website = req.body.website
    let facebook = req.body.facebook
    let areas = req.body.areaSelect
    let profile_description = req.body.businessDescription
    let bankName = req.body.bankName
    let branchName = req.body.branchName
    let accountNumber = req.body.accountNumber
    let branchCode = req.body.branchCode
    let isActive = req.body.isActive

    console.log('Profile Description', profile_description)

    if (image !== undefined) {
        fs.copyFile(`public/${image}`, `public/images/charities/${businessName}.jpg`, (err) => {
            if (err) throw err;
            console.log(image, 'copied to')
        })
        setTimeout(() => {
            fs.unlink(`public/${image}`, (err) => {
                if (err) throw err;
                console.log('Succesfully deleted')
            })
        }, 200)
    }

    let charity_image = `/images/charities/${businessName}.jpg`


    var sql = `Update charities set businessName = '${businessName}',first_name = '${first_name}',last_name = '${last_name}',
            mob_no = '${mob_no}' ,email = '${email}' ,website = '${website}',facebook = '${facebook}' ,areas = ${areas},
            profile_description = '${profile_description}',bankName = '${bankName}' ,branchName = '${branchName}',
            accountNumber = '${accountNumber}',branchCode = '${branchCode}',isActive = ${isActive}, charity_image = '${charity_image}'
             where id = ${id} `;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result)
            res.send(result);
        });
        connection.release();
    });
})




module.exports = router;