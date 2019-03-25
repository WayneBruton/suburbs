const express = require('express');
const router = express.Router();
Jimp = require('jimp'),

  

router.get('/crop/:image/:x/:y/:w/:h/:pw/:ph/:profileImageName', (req, res) => {

    var imageToCrop = 'public/uploads/' + req.params.image;
    let profileImageName = req.params.profileImageName;
    console.log('Wayne::::::',imageToCrop);
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let w = parseInt(req.params.w);
    let h = parseInt(req.params.h);
    let pw = parseInt(req.params.pw);
    let ph = parseInt(req.params.ph);
    // console.log(pw);
    Jimp.read(imageToCrop)
        .then(lenna => {
            return lenna
                .resize(pw, ph) // resize
                .crop(x,y,w,h)
                .resize(200, 200) // resize
                .quality(100) // set JPEG quality
                // .greyscale() // set greyscale
                .write(`public/images/profiles/${profileImageName}.jpg`); // save
        })
        .catch(err => {
            console.error(err);
        });
        res.send({data: `/images/profiles/${profileImageName}.jpg`})
});

router.get('/cropB/:image/:x/:y/:w/:h/:pw/:ph/:business1ImageName', (req, res) => {

    var imageToCrop = 'public/uploads/' + req.params.image;
    let business1ImageName = req.params.business1ImageName;
    console.log('Wayne::::::',imageToCrop);
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let w = parseInt(req.params.w);
    let h = parseInt(req.params.h);
    let pw = parseInt(req.params.pw);
    let ph = parseInt(req.params.ph);
    // console.log(pw);
    Jimp.read(imageToCrop)
        .then(lenna => {
            return lenna
                .resize(pw, ph) // resize
                .crop(x,y,w,h)
                .resize(200, 200) // resize
                .quality(100) // set JPEG quality
                // .greyscale() // set greyscale
                .write(`public/images/profiles/${business1ImageName}.jpg`); // save
        })
        .catch(err => {
            console.error(err);
        });
        res.send({data: `/images/profiles/${business1ImageName}.jpg`})
});

router.get('/cropC/:image/:x/:y/:w/:h/:pw/:ph/:business2ImageName', (req, res) => {

    var imageToCrop = 'public/uploads/' + req.params.image;
    let business2ImageName = req.params.business2ImageName;
    console.log('Wayne::::::',imageToCrop);
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let w = parseInt(req.params.w);
    let h = parseInt(req.params.h);
    let pw = parseInt(req.params.pw);
    let ph = parseInt(req.params.ph);
    // console.log(pw);
    Jimp.read(imageToCrop)
        .then(lenna => {
            return lenna
                .resize(pw, ph) // resize
                .crop(x,y,w,h)
                .resize(200, 200) // resize
                .quality(100) // set JPEG quality
                // .greyscale() // set greyscale
                .write(`public/images/profiles/${business2ImageName}.jpg`); // save
        })
        .catch(err => {
            console.error(err);
        });
        res.send({data: `/images/profiles/${business2ImageName}.jpg`})
});

router.get('/cropD/:image/:x/:y/:w/:h/:pw/:ph/:business3ImageName', (req, res) => {

    var imageToCrop = 'public/uploads/' + req.params.image;
    let business3ImageName = req.params.business3ImageName;
    console.log('Wayne::::::',imageToCrop);
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let w = parseInt(req.params.w);
    let h = parseInt(req.params.h);
    let pw = parseInt(req.params.pw);
    let ph = parseInt(req.params.ph);
    // console.log(pw);
    Jimp.read(imageToCrop)
        .then(lenna => {
            return lenna
                .resize(pw, ph) // resize
                .crop(x,y,w,h)
                .resize(200, 200) // resize
                .quality(100) // set JPEG quality
                // .greyscale() // set greyscale
                .write(`public/images/profiles/${business3ImageName}.jpg`); // save
        })
        .catch(err => {
            console.error(err);
        });
        res.send({data: `/images/profiles/${business3ImageName}.jpg`})
});






module.exports = router;