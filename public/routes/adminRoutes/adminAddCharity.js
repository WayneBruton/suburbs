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
            res.send(result);
        });
        connection.release();
    });
})


// ============== Creates a new Charity ======================

router.post('/createCharity', (req, res) => {
    let image = req.body.charityImg;
    let image1 = req.body.charityImg1;
    let image2 = req.body.charityImg2;
    let image3 = req.body.charityImg3;
    let businessName = req.body.businessName
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let npo_number = req.body.npo_number
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

    console.log(image)
    console.log(image2)
    console.log(image2)
    console.log(image)

    console.log(businessName)

    if (image !== undefined) {
        fs.copyFile(`public/${image}`, `public/images/charities/${businessName}.jpg`, (err) => {
            if (err) {
                router.get('/', function (req, res) {
                    var title = 'Suburbs Directory - Home'
                    var color = '';
                    var navBarType = 'navbar-dark bg-dark';
                    var backgroundColor = 'background-color: #4267b4;"'
                    res.render('../views/index', {
                        title: title,
                        color: color,
                        navBarType: navBarType,
                        backgroundColor: backgroundColor
                    });
                }); 
            }
        })
        setTimeout(() => {
            fs.unlink(`public/${image}`, (err) => {
                if (err) {
                    router.get('/', function (req, res) {
                        var title = 'Suburbs Directory - Home'
                        var color = '';
                        var navBarType = 'navbar-dark bg-dark';
                        var backgroundColor = 'background-color: #4267b4;"'
                        res.render('../views/index', {
                            title: title,
                            color: color,
                            navBarType: navBarType,
                            backgroundColor: backgroundColor
                        });
                    }); 
                };
            })
        }, 200)
    }
    if (image1 !== undefined) {
        fs.copyFile(`public/${image1}`, `public/images/charities/${businessName}1.jpg`, (err) => {
            if (err) {
                router.get('/', function (req, res) {
                    var title = 'Suburbs Directory - Home'
                    var color = '';
                    var navBarType = 'navbar-dark bg-dark';
                    var backgroundColor = 'background-color: #4267b4;"'
                    res.render('../views/index', {
                        title: title,
                        color: color,
                        navBarType: navBarType,
                        backgroundColor: backgroundColor
                    });
                }); 
            }
        })
        setTimeout(() => {
            fs.unlink(`public/${image1}`, (err) => {
                if (err) {
                    router.get('/', function (req, res) {
                        var title = 'Suburbs Directory - Home'
                        var color = '';
                        var navBarType = 'navbar-dark bg-dark';
                        var backgroundColor = 'background-color: #4267b4;"'
                        res.render('../views/index', {
                            title: title,
                            color: color,
                            navBarType: navBarType,
                            backgroundColor: backgroundColor
                        });
                    }); 
                };
            })
        }, 200)
    }
    if (image2 !== undefined) {
        fs.copyFile(`public/${image2}`, `public/images/charities/${businessName}2.jpg`, (err) => {
            if (err) {
                router.get('/', function (req, res) {
                    var title = 'Suburbs Directory - Home'
                    var color = '';
                    var navBarType = 'navbar-dark bg-dark';
                    var backgroundColor = 'background-color: #4267b4;"'
                    res.render('../views/index', {
                        title: title,
                        color: color,
                        navBarType: navBarType,
                        backgroundColor: backgroundColor
                    });
                }); 
            }
        })
        setTimeout(() => {
            fs.unlink(`public/${image2}`, (err) => {
                if (err) {
                    router.get('/', function (req, res) {
                        var title = 'Suburbs Directory - Home'
                        var color = '';
                        var navBarType = 'navbar-dark bg-dark';
                        var backgroundColor = 'background-color: #4267b4;"'
                        res.render('../views/index', {
                            title: title,
                            color: color,
                            navBarType: navBarType,
                            backgroundColor: backgroundColor
                        });
                    }); 
                };
            })
        }, 200)
    }
    if (image3 !== undefined) {
        fs.copyFile(`public/${image3}`, `public/images/charities/${businessName}3.jpg`, (err) => {
            console.log(`public/images/charities/${businessName}3.jpg`)
            if (err) {
                router.get('/', function (req, res) {
                    var title = 'Suburbs Directory - Home'
                    var color = '';
                    var navBarType = 'navbar-dark bg-dark';
                    var backgroundColor = 'background-color: #4267b4;"'
                    res.render('../views/index', {
                        title: title,
                        color: color,
                        navBarType: navBarType,
                        backgroundColor: backgroundColor
                    });
                }); 
            }
        })
        setTimeout(() => {
            fs.unlink(`public/${image3}`, (err) => {
                if (err) {
                    router.get('/', function (req, res) {
                        var title = 'Suburbs Directory - Home'
                        var color = '';
                        var navBarType = 'navbar-dark bg-dark';
                        var backgroundColor = 'background-color: #4267b4;"'
                        res.render('../views/index', {
                            title: title,
                            color: color,
                            navBarType: navBarType,
                            backgroundColor: backgroundColor
                        });
                    }); 
                };
            })
        }, 200)
    }

    let charity_image = `/images/charities/${businessName}.jpg`
    let charity_image1 = `/images/charities/${businessName}1.jpg`
    let charity_image2 = `/images/charities/${businessName}2.jpg`
    let charity_image3 = `/images/charities/${businessName}3.jpg`

    var sql = `Insert into charities (businessName,first_name,last_name,mob_no,email,website,
            facebook,areas,profile_description,bankName,branchName,accountNumber,branchCode,isActive, charity_image, npo_number, charity_image1, charity_image2, charity_image3) values (
                '${businessName}','${first_name}','${last_name}','${mob_no}','${email}','${website}','${facebook}',${areas},
                '${profile_description}','${bankName}','${branchName}','${accountNumber}','${branchCode}',${isActive},'${charity_image}', '${npo_number}','${charity_image1}', '${charity_image2}', '${charity_image3}'
            )`;
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


// ============== Edit existing Charity ======================

router.post('/editCharity', (req, res) => {
    let id = req.body.id
    let originalImage = req.body.originalCharityImage
    let originalImage1 = req.body.originalCharityImage1
    let originalImage2 = req.body.originalCharityImage2
    let originalImage3 = req.body.originalCharityImage3
    let image = req.body.newCharityImg;
    let image1 = req.body.newCharityImg1;
    let image2 = req.body.newCharityImg2;
    let image3 = req.body.newCharityImg3;
    let businessName = req.body.businessName
    let npo_number = req.body.npo_number
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

    console.log(image1)
    console.log(image2)
    console.log(image3)
    // console.log(originalImage)
    // console.log(originalImage1)
    // console.log(originalImage2)
    // console.log(originalImage3)



    if (image !== undefined) {
        fs.copyFile(`public/${image}`, `public/images/charities/${businessName}.jpg`, (err) => {
            if (err) throw err;
        })
        setTimeout(() => {
            fs.unlink(`public/${image}`, (err) => {
                if (err) throw err;
            })
        }, 200)
    }
    if (image1 !== undefined || image1 !== '') {
        fs.copyFile(`public/${image1}`, `public/images/charities/${businessName}1.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${image1}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 200)
    }
    if (image2 !== undefined) {
        fs.copyFile(`public/${image2}`, `public/images/charities/${businessName}2.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${image2}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 200)
    }
    if (image3 !== undefined) {
        fs.copyFile(`public/${image3}`, `public/images/charities/${businessName}3.jpg`, (err) => {
            if (err) {
                console.log(err)
            };
        })
        setTimeout(() => {
            fs.unlink(`public/${image3}`, (err) => {
                if (err) {
                    console.log(err)
                };
            })
        }, 200)
    }

    let charity_image = `/images/charities/${businessName}.jpg`
    let charity_image1 = `/images/charities/${businessName}1.jpg`
    let charity_image2 = `/images/charities/${businessName}2.jpg`
    let charity_image3 = `/images/charities/${businessName}3.jpg`
    if (image1 == '' || image1 == undefined) {
        charity_image1 = ``
    }
    if (image2 == '' || image2 == undefined) {
        charity_image2 = ``
    }
    if (image3 == '' || image3 == undefined) {
        charity_image3 = ``
    }
    // let charity_image1 = `/images/charities/${businessName}1.jpg`
    // let charity_image2 = `/images/charities/${businessName}2.jpg`
    // let charity_image3 = `/images/charities/${businessName}3.jpg`


    var sql = `Update charities set businessName = '${businessName}', npo_number = '${npo_number}', first_name = '${first_name}',last_name = '${last_name}',
            mob_no = '${mob_no}' ,email = '${email}' ,website = '${website}',facebook = '${facebook}' ,areas = ${areas},
            profile_description = '${profile_description}',bankName = '${bankName}' ,branchName = '${branchName}',
            accountNumber = '${accountNumber}',branchCode = '${branchCode}',isActive = ${isActive}, charity_image = '${charity_image}', charity_image1 = '${charity_image1}', charity_image2 = '${charity_image2}', charity_image3 = '${charity_image3}'
             where id = ${id} `;
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