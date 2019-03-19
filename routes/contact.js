const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// if (port === 3000) {
require('dotenv/config');
//   }


router.post('/send-email', (req, res) => {

    let response = {
        success: 'Your Email has been sent!',
        failure: 'There was a problem'
    }
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.content;
    const output = `
	<p>You have a new contact request</p>
	<h3>Contact Details</h3>
	<ul>
		<li>Name: ${name}</li><br>

		<li>Email: ${email}</li><br>
		

	</ul><br>
	<h3>Message</h3><br>
	<p>${message}</p>
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
        to: 'lisasallyberg@gmail.com, waynebruton@icloud.com',
        // subject: 'Suburbs Directory Contact Request',
        // subject: `Suburbs Directory Contact Request - ${subject}`,
        subject: `Suburbs Directory Contact Request - ${subject}`,
        text: 'Hello world?',
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('This is the ERROR', error)
            console.log('This is the Info', info)
            res.end(JSON.stringify(response.failure));
            var title = 'Suburbs Directory - Contact Us'
            // var color = 'color: white;';
            var color = '';
            var navBarType = 'navbar-dark bg-dark';
            // var navBarType = '';
            var message = response.failure;
            var alertType = 'danger'
            var display = 'block'
            var backgroundColor = 'background-color: #4267b4;"'
            res.render('contact', {
                title: title,
                color: color,
                navBarType: navBarType,
                backgroundColor: backgroundColor,
                message: message,
                display: display,
                alertType: alertType


            });
        }
        console.log(info);
        var title = 'Suburbs Directory - Contact Us'
        // var color = 'color: white;';
        var color = '';
        var navBarType = 'navbar-dark bg-dark';
        // var navBarType = '';
        var message = response.success;
        var alertType = 'success'
        var display = 'block'
        var backgroundColor = 'background-color: #4267b4;"'
        res.render('contact', {
            title: title,
            color: color,
            navBarType: navBarType,
            backgroundColor: backgroundColor,
            message: message,
            display: display,
             alertType: alertType
        });
        // res.end(JSON.stringify(response.success));
    });
});

module.exports = router;