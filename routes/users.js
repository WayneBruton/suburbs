const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var saltRounds = 10;
const nodemailer = require('nodemailer');



var pool = require('./connection');

router.get('/login', (req, res) => {
    var title = 'Login'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    // console.log(req.session.userID)
    let message = '';
    // if (req.session.userID != undefined) {
    res.render('login', {
        title: title,
        source: "",
        source2: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        message: message
    });
})

router.get('/reset', (req, res) => {
    var title = 'Reset Password'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    // console.log(req.session.userID)
    let message = '';
    // if (req.session.userID != undefined) {
    res.render('resetPassword', {
        title: title,
        source: "",
        source2: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor,
        message: message
    });
})
router.get('/dashboard', (req, res) => {
    var title = 'Dashboard'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    console.log(req.session.userID)

    console.log(req.session.userID)
    if (req.session.userID == undefined) {
        var title = 'New User'
        // var color = 'color: white;';
        var color = '';
        var navBarType = 'navbar-dark bg-dark';
        // var navBarType = '';
        var backgroundColor = 'background-color: #4267b4;"'
        // console.log(req.session.userID)
        let message = '';
        res.render('login', {
            title: title,
            source: "",
            source2: "",
            color: color,
            navBarType: navBarType,
            backgroundColor: backgroundColor,
            message: message
        });

    } else {
        res.render('dashboard', {
            title: title,
            source: "",
            source2: "",
            color: color,
            navBarType: navBarType,
            backgroundColor: backgroundColor
        });
    }
})

router.get('/createUser', (req, res) => {
    var title = 'New User'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    console.log(req.session.userID)
    let message = '';
    if (req.session.userID != undefined) {
        res.render('newUser', {
            title: title,
            source: "",
            source2: "",
            color: color,
            navBarType: navBarType,
            backgroundColor: backgroundColor,
            message: message
        });
    } else {
        res.render('login', {
            title: title,
            source: "",
            source2: "",
            color: color,
            navBarType: navBarType,
            backgroundColor: backgroundColor,
            message: 'You need to be logged in to add a user'
        });
    }
})

router.post('/createUser', (req, res) => {
    let user = req.body.email;
    let user_password = req.body.Upassword;

    // console.log(user)
    console.log(user_password)
    bcrypt.hash(user_password, saltRounds, function (err, hash) {
        console.log(hash)
        let sql = `insert into users (email, Upassword) values ('${user}', '${hash}')`
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                // resizeBy.send('Error with connection');
            }
            connection.query(sql, function (error, result) {
                if (error) throw error;
                var title = 'New User'
                // var color = 'color: white;';
                var color = '';
                var navBarType = 'navbar-dark bg-dark';
                // var navBarType = '';
                var backgroundColor = 'background-color: #4267b4;"'
                console.log(req.session.userID)
                let message = `New User - ${user} Successfully Added`;
                // console.log(result)
                // res.render('newUser')
                res.render('newUser', {
                    title: title,
                    source: "",
                    source2: "",
                    color: color,
                    navBarType: navBarType,
                    backgroundColor: backgroundColor,
                    message: message
                });
            });
            connection.release();
        });
    })
})

router.get('/checkUserExists/:userEmail', (req, res) => {
    let userEmail = req.params.userEmail;
    let sql = `select email from users where email = '${userEmail}'`
    // console.log(userEmail);
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            // resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            res.send(result);
        });
        connection.release();
    });
})


router.post('/loginUser', (req, res) => {
    let userEmail = req.body.email;
    let upassword = req.body.Upassword;
    console.log(upassword);
    let sql = `select email, upassword from users where email = '${userEmail}'`
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            // resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            const hash = result[0].upassword.toString();
            bcrypt.compare(upassword, hash, function (err, response) {
                if (response) {
                    console.log('Passwords Agree')
                    req.session.userID = userEmail;
                    var title = 'Dashboard'
                    var color = '';
                    var navBarType = 'navbar-dark bg-dark';
                    var backgroundColor = 'background-color: #4267b4;"'
                    // let message = '';
                    res.render('dashboard', {
                        title: title,
                        source: "",
                        source2: "",
                        color: color,
                        navBarType: navBarType,
                        backgroundColor: backgroundColor
                    });

                } else {
                    console.log('PasswordsDo not Agree');
                    var title = 'Login'
                    var color = '';
                    var navBarType = 'navbar-dark bg-dark';
                    var backgroundColor = 'background-color: #4267b4;"'
                    let message = 'Incorrect Password - try again';
                    res.render('login', {
                        title: title,
                        source: "",
                        source2: "",
                        color: color,
                        navBarType: navBarType,
                        backgroundColor: backgroundColor,
                        message: message
                    });
                };
            });
        });
        connection.release();
    })
})

router.get('/resetUser/:email', (req, res) => {
    let email = req.params.email;
    console.log(email)
    let token = Math.round(Math.random() * 10000000000);
    console.log('Token', token)
    let sql = `update users set resettoken = '${token}' where email = '${email}'`
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            // resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) throw error;
            let sql = `select * from users where email = '${email}'`
            connection.query(sql, function (error, result) {
                if (error) throw error;
                //send email here


                email = email;
                const output = `
                <p>Reset your password</p>
                <h3>Contact Details</h3>
                <ul>
              
            
                    <li>Email: ${email}</li><br>
                    
            
                </ul><br>
                <h3>Message</h3><br>
                <p>Hi, this is the token to change your pasword: ${token}</p>
                <p>Copy and paste this token into the space provided</p>
                `;

                console.log(output);
                let transporter = nodemailer.createTransport({

                    // host: "mail.eccentrictoad.com",
                    host: process.env.MAILHOST,
                    port: 465, //587

                    secure: true,
                    auth: {

                        user: process.env.MAILUSER,
                        pass: process.env.MAILPASSWORD

                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                let mailOptions = {
                    // from: 'Suburbs Directory Contact Form" <waynebruton@icloud.com>', 
                    from: 'Suburbs Directory Contact Form <lisa@suburbsdirectory.co.za>',
                    to: `${email}, waynebruton@icloud.com`,
                    // subject: 'Suburbs Directory Contact Request',
                    // subject: `Suburbs Directory Contact Request - ${subject}`,
                    subject: `PASSWORD RESET`,
                    text: 'Hello world?',
                    html: output
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('This is the ERROR', error)
                        console.log('This is the Info', info)
                        res.end(JSON.stringify(response.failure));
                    }
                    console.log(info);

                    // res.end(JSON.stringify(response.success));
                });
                res.send(result);
                console.log(result)
            });
        });
        connection.release();
    })
})

router.post('/changePassword', (req, res) => {
    let user = req.body.email;
    let user_password = req.body.Upassword;

    // console.log(user)
    console.log(user_password)
    bcrypt.hash(user_password, saltRounds, function (err, hash) {
        console.log(hash)
        let sql = `update users set Upassword = '${hash}', resettoken = '' where email = '${user}'`
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                // resizeBy.send('Error with connection');
            }
            connection.query(sql, function (error, result) {
                if (error) throw error;
                var title = 'New User'
                // var color = 'color: white;';
                var color = '';
                var navBarType = 'navbar-dark bg-dark';
                // var navBarType = '';
                var backgroundColor = 'background-color: #4267b4;"'
                console.log(req.session.userID)
                let message = `${user} Password Successfully Changed`;
                // console.log(result)
                // res.render('newUser')
                res.render('login', {
                    title: title,
                    source: "",
                    source2: "",
                    color: color,
                    navBarType: navBarType,
                    backgroundColor: backgroundColor,
                    message: message
                });
            });
            connection.release();
        });
    })
})





module.exports = router;