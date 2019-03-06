const express = require('express');
const router = express.Router();
Jimp = require('jimp'),



router.get('/crop/:image/:x/:y/:w/:h/:pw/:ph', (req, res) => {

    var imageToCrop = 'public/uploads/' + req.params.image;
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
                .write('public/images/wayneresized.jpg'); // save
        })
        .catch(err => {
            console.error(err);
        });
        res.send({data: '/images/wayneresized.jpg'})
});



module.exports = router;