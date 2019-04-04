const express = require('express');
const router = express.Router();
var pool = require('../connection');
var sanitizeHtml = require('sanitize-html');

const fs = require('fs');
const path = require('path');
const directory = 'public/uploads/';

function deleteUploadedFiles() {
    fs.readdir(directory, (err, files) => {
        if (err) {
            res.send('Error', err)
        };

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}

router.post('/createProfile', (req, res) => {
    let businessName = req.body.Business_name;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let mob_no = req.body.mob_no;
    let email = req.body.email;
    let website = req.body.website;
    let facebook = req.body.facebook;
    let instagram = req.body.instagram;
    let linkedin = req.body.linkedin;
    let feedback = req.body.feedback;
    let areas = req.body.areaChosen;
    let selectedOption = parseInt(req.body.selectedOption);
    let catarea = req.body.catarea;
    var product_service = req.body.psb;
    var adminAssist = req.body.adminAssist;
    if (adminAssist == undefined) {
        adminAssist = 0;
    }
    let profile_heading = req.body.profile_heading;
    if (profile_heading == '') {
        profile_heading = businessName;
    }

    let description = sanitizeHtml(req.body.description);
    // sanitizeHtml(dirty);

    let parseIntAreas = areas.map(function (area) {
        return parseInt(area);
    })

    let parseIntCategories = catarea.map((category) => {
        return parseInt(category);
    })

    let sql = ` INSERT INTO client_profiles (businessName,first_name,last_name,mob_no,email,website,facebook,instagram,
                linkedin,feedback,areas,selectedOption,catarea,product_service,adminAssist,profile_heading,profile_description
        ) values (
        '${businessName}','${first_name}','${last_name}','${mob_no}','${email}','${website}','${facebook}','${instagram}',
        '${linkedin}','${feedback}',"[${parseIntAreas}]",${selectedOption},"[${parseIntCategories}]",'${product_service}','${adminAssist}','${profile_heading}','${description}'
    );`

    var title = 'Suburbs Directory - Load Profile'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'

    pool.getConnection((err, connection) => {
        if (err) {
            connection.release()
        }
        connection.query(sql, (err, result) => {
            if (err) {
                connection.release()
            };
            let profileId = '';
            if (result != undefined) {
                profileId = result.insertId;
            }

            res.render('profileImages', {
                title: title,
                source: "",
                color: color,
                navBarType: navBarType,
                backgroundColor: backgroundColor,
                businessName: businessName,
                profileId: profileId
            });
        });
    })
})

router.get('/checkProfileNames/:businessName', function (req, res) {
    let businessName = req.params.businessName;
    var sql = `select businessName from client_profiles where businessName = '${businessName}'`;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('Error:', error)
            }
            res.send(result);
        });
        connection.release();
    });
});
// =========================

// Select Images

router.get('/getProfileImages/:clientID', function (req, res) {
    let clientID = req.params.clientID;
    var sql = `select profile_image, business_image1, business_image2, business_image3 from client_profiles where id = ${clientID}`;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('The Error is', error)
            } else {
                res.send(result);
            }
        });
        connection.release();
    });
});

// Save Images

router.post('/editProfileImages', function (req, res) {
    // let clientID = req.body.id;
    console.log(req.body)
    let id = req.body.id
    let profile_image = req.body.profile_image
    let business_image1 = req.body.business_image1
    let business_image2 = req.body.business_image2
    let business_image3 = req.body.business_image3


    if (profile_image.substring(0, 8) == 'uploads/') {
        fs.copyFile(`public/${profile_image}`, `public/images/profiles/${id}ProfilePic.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${business_image1}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 200)
    }
    if (business_image1.substring(0, 8) == 'uploads/') {
        fs.copyFile(`public/${business_image1}`, `public/images/profiles/${id}Business1Pic.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${business_image1}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 250)
    }
    if (business_image2.substring(0, 8) == 'uploads/') {
        fs.copyFile(`public/${business_image2}`, `public/images/profiles/${id}Business2Pic.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${business_image2}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 300)
    }
    if (business_image3.substring(0, 8) == 'uploads/') {
        fs.copyFile(`public/${business_image3}`, `public/images/profiles/${id}Business3Pic.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${business_image3}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 350)
    }
    setTimeout(() => {
        let newProfileImage = `/images/profiles/${id}ProfilePic.jpg`
        let newBusinessImage1 = `/images/profiles/${id}Business1Pic.jpg`
        let newBusinessImage2 = `/images/profiles/${id}Business2Pic.jpg`
        let newBusinessImage3 = `/images/profiles/${id}Business3Pic.jpg`
        var sql = `update client_profiles set  profile_image = '${newProfileImage}', business_image1 = '${newBusinessImage1}', business_image2 = '${newBusinessImage2}', business_image3 = '${newBusinessImage3}' where id = ${id}`;
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                resizeBy.send('Error with connection');
            }
            connection.query(sql, function (error, result) {
                if (error) {
                    res.send('The Error is', error)
                } else {
                    console.log('The result is:', result)
                    res.send(result);

                }
            });
            connection.release();
        });
    }, 500)
});

// ===============


router.get('/saveProfileImg/:clientID', function (req, res) {
    let clientID = req.params.clientID;
    let image = `/images/profiles/${clientID}ProfilePic.jpg`
    var sql = `update client_profiles set profile_image = '${image}' where id = ${clientID}`;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('The Error is', error)
            } else {
                deleteUploadedFiles();
                res.send(result);
            }
        });
        connection.release();
    });
});

router.get('/b_saveProfileImg/:clientID', function (req, res) {
    let clientID = req.params.clientID;
    let image = `/images/profiles/${clientID}Business1Pic.jpg`
    var sql = `update client_profiles set business_image1 = '${image}' where id = ${clientID}`;
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            deleteUploadedFiles();

            res.send(result);
        });
        connection.release();
    });
});

router.get('/c_saveProfileImg/:clientID', function (req, res) {
    let clientID = req.params.clientID;
    let image = `/images/profiles/${clientID}Business2Pic.jpg`

    var sql = `update client_profiles set business_image2 = '${image}' where id = ${clientID}`;

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            deleteUploadedFiles();

            res.send(result);
        });
        connection.release();
    });
});

router.get('/d_saveProfileImg/:clientID', function (req, res) {

    let clientID = req.params.clientID;
    let image = `/images/profiles/${clientID}Business3Pic.jpg`

    var sql = `update client_profiles set business_image3 = '${image}' where id = ${clientID}`;

    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                res.send('Error', error)
            };
            deleteUploadedFiles();
            var title = 'Suburbs Directory - Preview'

            res.send(result);
        });
        connection.release();
    });

});

module.exports = router;