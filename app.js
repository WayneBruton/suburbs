const express = require("express"),
    Jimp = require('jimp'),
    app = express();
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads/' // this saves your file into a directory called "uploads"
});


const dotenv = require('dotenv').config();
const port = 3000 || process.env.PORT;

app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

/* routes/index.js */



app.get('/', function (req, res) {
    var title = 'Suburbs Directory - Home'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('index', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
});

app.get('/about', function (req, res) {
    var title = 'Suburbs Directory - About'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('about', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
});

app.get('/register', (req, res) => {
    var title = 'Suburbs Directory - Register'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('register', {
        title: title,
        source: "",
        source2: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/charityApplication', (req, res) => {
    var title = 'Suburbs Directory - Charity'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('charityApplication', {
        title: title,
        source: "",
        source2: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

app.get('/terms', (req, res) => {
    var title = 'Suburbs Directory - Terms & Conditions'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('terms', {
        title: title, source: "",
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

app.get('/packages', (req, res) => {
    var title = 'Suburbs Directory - Package Options'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('packages', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

app.get('/login', (req, res) => {
    // var title = 'Suburbs Directory - Package Options'
    res.render('login');
    // res.send({data: 'test'});
})

app.get('/contact', (req, res) => {
    var title = 'Suburbs Directory - Contact Us'
    // var color = 'color: white;';
    var color = '';
    var navBarType = 'navbar-dark bg-dark';
    // var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'
    res.render('contact', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
    // res.send({data: 'test'});
})

// ================================
// Pages

app.get('/southpeninsula', (req, res) => {
    var title = 'South Peninsula';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #4267b4;"'

    res.render('southpeninsula', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/atlanticseaboard', (req, res) => {
    var title = 'Atlantic Seaboard';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f5c23d;"'

    res.render('atlanticseaboard', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/capeflats', (req, res) => {
    var title = 'Cape Flats';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #afb1b4;"'
    res.render('capeflats', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/citybowl', (req, res) => {
    var title = 'City Bowl';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f7913e;"'
    res.render('citybowl', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/helderberg', (req, res) => {
    var title = 'Helderberg';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #fb3c3f;"'
    res.render('helderberg', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/northernsuburbs', (req, res) => {
    var title = 'Northern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #ae9bd9;"'
    res.render('northernsuburbs', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/southernsuburbs', (req, res) => {
    var title = 'Southern Suburbs';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #41b62a;"'
    res.render('southernsuburbs', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})
app.get('/westcoast', (req, res) => {
    var title = 'Westcoast';
    var color = 'color: white;';
    var navBarType = '';
    var backgroundColor = 'background-color: #f58695;"'
    res.render('westcoast', {
        title: title,
        color: color,
        navBarType: navBarType,
        backgroundColor: backgroundColor
    });
})

app.get('/crop/:image/:x/:y/:w/:h/:pw/:ph', (req, res) => {

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

let source = '';
let source2 = '';


app.post('/upload', upload.fields([{
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
        console.log('The SOURCE IS NOW+++>>>>',source);
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

app.listen(port, () => {
    console.log(`App is running on Port: ${port}`);
})


