const express = require('express');
const router = express.Router();
const moment = require('moment');
var pool = require('../connection');

const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);


router.get('/startPaymentProcess/:link', function (req, res) {
    let details = req.params.link;
    // console.log('Details', details)
    const decryptedString = cryptr.decrypt(details);
    // console.log('Decrypted ID',decryptedString)
    let id = decryptedString
    // console.log(id)
    let businessName
    let first_name
    let last_name
    let selectedOption
    let catarea
    let adminAssist
    let categoriesChosen
    var sql = `select id, businessName, first_name, last_name, selectedOption, catarea, adminAssist from client_profiles where id = ${id}`;
    var title = 'Suburbs Directory - Start Payment'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'


    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            resizeBy.send('Error with connection');
        }
        connection.query(sql, function (error, result) {
            if (error) {
                console.log(error)
            };
            // console.log(result)
            businessName = result[0].businessName
            first_name = result[0].first_name
            last_name = result[0].last_name
            selectedOption = result[0].selectedOption
            catarea = result[0].catarea
            catarea = catarea.substring(1, catarea.length - 1).split(',')
            adminAssist = result[0].adminAssist
            let categoriesChosen;
            let myCategories = '';

            for (i = 0; i < catarea.length; i++) {
                if (i == 0) {
                    categoriesChosen = `id = ${parseInt(catarea[i])}`
                } else {
                    categoriesChosen = categoriesChosen + ` or id = ${parseInt(catarea[i])}`
                }
            }
            let catareaLength = catarea.length;
            let sql2 = `select category_description from categories where ${categoriesChosen}`
            let sql3 = `select per_month, per_year, once_off from packages where id = ${selectedOption}`
            finalSQL = `${sql2};${sql3}`
            connection.query(finalSQL, function (error, result) {
                if (error) throw error;
                // console.log('per Month: Cost',result[1][0].per_month)

                let per_month = result[1][0].per_month;
                let per_year = result[1][0].per_year;
                let once_off = result[1][0].once_off
                for (i = 0; i < result[0].length; i++) {
                    myCategories = myCategories + `"${result[0][i].category_description}" `
                }
                catarea = catarea.length;
                res.render('../views/paymentViews/startPaymentView', {
                    title: title,
                    source: "",
                    color: color,
                    navBarType: navBarType,
                    backgroundColor: backgroundColor,
                    businessName,
                    first_name,
                    last_name,
                    id,
                    selectedOption,
                    catareaLength,
                    catarea,
                    adminAssist,
                    myCategories,
                    per_month,
                    per_year,
                    once_off,
                    details
                });

            });
        });
        connection.release();
    });
});

router.get('/createSuccessLink/:id/:terms/:amount', (req, res)=> {
    let id= req.params.id;
    let terms = req.params.terms;
    let amount = req.params.amount;
    let link = `${id}-${terms}-${amount}`
    const encryptedString = cryptr.encrypt(`${link}`);
    const decryptedString = cryptr.decrypt(encryptedString);
    console.log(link)
    console.log(encryptedString)
    console.log(decryptedString)
    res.send(encryptedString)
})


router.get('/successfulPayment/:link', function (req, res) {
    let details = req.params.link

    const decryptedString = cryptr.decrypt(details);
    console.log(decryptedString)
    details = decryptedString.split('-')
    console.log(details)
    let amountPaid = details[2]
    // let lengthParam = details[0].length;
    // let typeAccount = details[1].substring(lengthParam - 3, lengthParam)
    let typeAccount = details[1]
    let id = parseInt(details[0])
    let paidOn = moment(new Date()).format('DD-MMM-YYYY')
    let expiry;
    let check = moment();
    if (typeAccount == 'Monthly') {
        // typeAccount = 'Monthly'
        expiry = moment(check).add(1,'M').format('DD-MMM-YYYY')
    } else if (typeAccount == 'Annual') {
        // typeAccount = 'Annual'
        expiry = moment(check).add(1,'Y').format('DD-MMM-YYYY')
    } else if (typeAccount == 'Once Off') {
        // typeAccount = 'Once Off'
        expiry = moment(check).add(1,'M').format('DD-MMM-YYYY')
    }
    let newDate = moment(expiry).format('YYYY-MM-DD HH:mm:ss')
    // let newDate = (moment(expiry).format('YYYY-MM-DD HH:mm:ss')).toString()
    // var localTime = moment.utc(newDate, 'ddd MMM DD HH:mm:ss ZZ YYYY')
    // newDate = localTime.calendar();
    // console.log(newDate)

    // let newDate = new Date(expiry)
    // let newDate = moment(expiry)

    
    
    // let newDate = moment(expiry)
    let businessName;
    let sql1 = `select businessName from client_profiles where id = ${id}`
    let sql2 = `update client_profiles set paid_to_date = true, terms = '${typeAccount}', payment_expires = '${newDate}' where id = ${id}`
    let sql = `${sql1};${sql2}`
    var title = 'Suburbs Directory'
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    var backgroundColor = 'background-color: #4267b4;"'
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            console.log(err)
            // resizeBy.send('Error with connection');

        }
        connection.query(sql, function (error, result) {
            if (error) {
                console.log(error)
            };
            console.log(result[0][0])
            businessName = result[0][0].businessName
            // console.log(result[0].businessName)
            res.render('../views/paymentViews/successfulPayment', {
                title: title,
                source: "",
                color: color,
                navBarType: navBarType,
                backgroundColor: backgroundColor,
                id,
                typeAccount,
                amountPaid,
                expiry,
                paidOn,
                businessName
            })
        })
        connection.release();
    });
})



module.exports = router;