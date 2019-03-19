const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({
    dest: 'public/uploads/' // this saves your file into a directory called "uploads"
});

let source = '';
let source2 = '';
let source3 = '';
let source4 = '';
let source5 = '';
let source6 = '';




router.post('/upload', upload.fields([{
    name: 'file-to-upload',
    maxCount: 1
}, {
    name: 'file-to-upload2',
    maxCount: 1
}]), (req, res) => {
    let data = req.files;
    console.log('This is the data from the form', data);
    if (data['file-to-upload']) {

        source = 'uploads/' + data['file-to-upload'][0].filename;
        console.log('The SOURCE IS NOW+++>>>>', source);
    } else {
        source = "";
    }
    if (data['file-to-upload2']) {
        source2 = 'uploads/' + data['file-to-upload2'][0].filename;

    } else {
        source2 = "";
    }
    var title = 'Suburbs Directory - Register';
    res.send(source);
});

router.post('/uploadB', upload.fields([{
    name: 'b_file-to-upload',
    maxCount: 1
}, {
    name: 'b_file-to-upload2',
    maxCount: 1
}]), (req, res) => {
    let data = req.files;
    console.log(req.files)
    console.log('This is the data FORM @2 from the form', data);
    if (data['b_file-to-upload']) {

        source3 = 'uploads/' + data['b_file-to-upload'][0].filename;
        console.log('The BUSINESS IMAGE SOURCE IS SOURCE IS NOW+++>>>>', source);
    } else {
        source3 = "";
    }
    if (data['b_file-to-upload2']) {
        source4 = 'uploads/' + data['b_file-to-upload2'][0].filename;

    } else {
        source4 = "";
    }
    var title = 'Suburbs Directory - Register';
    res.send(source3);
});

router.post('/uploadC', upload.fields([{
    name: 'c_file-to-upload',
    maxCount: 1
}, {
    name: 'c_file-to-upload2',
    maxCount: 1
}]), (req, res) => {
    let data = req.files;
    console.log('This is the data FORM @2 from the form', data);
    if (data['c_file-to-upload']) {

        source5 = 'uploads/' + data['c_file-to-upload'][0].filename;
        console.log('The BUSINESS IMAGE <<2>> SOURCE IS SOURCE IS NOW+++>>>>', source);
    } else {
        source5 = "";
    }
    if (data['c_file-to-upload2']) {
        source4 = 'uploads/' + data['c_file-to-upload2'][0].filename;

    } else {
        source4 = "";
    }
    var title = 'Suburbs Directory - Register';
    res.send(source5);
});

router.post('/uploadD', upload.fields([{
    name: 'd_file-to-upload',
    maxCount: 1
}, {
    name: 'd_file-to-upload2',
    maxCount: 1
}]), (req, res) => {
    let data = req.files;
    console.log('This is the data FORM @3 from the form', data);
    if (data['d_file-to-upload']) {

        source6 = 'uploads/' + data['d_file-to-upload'][0].filename;
        console.log('The BUSINESS IMAGE <<2>> SOURCE IS SOURCE IS NOW+++>>>>', source6);
    } else {
        source6 = "";
    }
    if (data['c_file-to-upload2']) {
        source4 = 'uploads/' + data['c_file-to-upload2'][0].filename;

    } else {
        source4 = "";
    }
    var title = 'Suburbs Directory - Register';
    res.send(source6);
});



module.exports = router;