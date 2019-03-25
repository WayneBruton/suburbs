const express = require('express');
const router = express.Router();
var pool = require('../connection');

router.get('/getActiveProfilesCategories/:areaCode', function (req, res) {
    let areaCode = req.params.areaCode;
    console.log(areaCode)
    let sql = `SELECT
    c.id, c.category_description,
    COUNT(p.id) as count
    FROM
        categories c
    LEFT JOIN
    client_profiles p
      ON  JSON_CONTAINS(p.areas,      '${areaCode}',                    '$')
      AND JSON_CONTAINS(p.catarea, CAST(c.id AS CHAR(32)), '$') and p.paid_to_date = true
    GROUP BY c.id`
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('The Error is', error)
            } else {
                // console.log(result)
                res.send(result);
            }
        });
        connection.release();
    });
});


router.get('/getActiveProfiles/:areaCode/:categoryId', function (req, res) {
    let areaCode = req.params.areaCode;
    let categoryId = req.params.categoryId;
    console.log(areaCode)
    console.log(categoryId)
    let sql = `select id, businessName, profile_description, profile_image
        from client_profiles
        where JSON_CONTAINS(areas, '${areaCode}',"$") and JSON_CONTAINS(catarea, '${categoryId}',"$") and profile_approved = true and paid_to_date = true order by businessName`
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('The Error is', error)
            } else {
                // console.log(result)
                res.send(result);
            }
        });
        connection.release();
    });
});
router.get('/showProfile/:profileID', function (req, res) {
    let profileID = req.params.profileID;
    console.log(profileID)
    var title = 'Profile';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'
    var viewColors = '#ae9bd9'
    var borderColor = `border: 3px solid ${viewColors}`
    var areaCode = 5
    res.render('../views/suburbsViews/showProfile', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        areaCode: areaCode,
        viewColors: viewColors,
        borderColor: borderColor,
        profileID: profileID
    });
});
 
router.get('/getProfileInfo/:profileID', function (req, res) {
    let profileID = req.params.profileID;
    // console.log(profileID)
    let sql = `select id, businessName, profile_description, profile_image, mob_no, email, 
                website, facebook, instagram, linkedin, business_image1, business_image2, business_image3
                from client_profiles where id = ${profileID}`
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('The Error is', error)
            } else {
                // console.log(result)
                res.send(result);
            }
        });
        connection.release();
    });
});



module.exports = router;