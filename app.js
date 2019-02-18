const express = require("express"),
        // fileUpload = require('express-fileupload'),
        // formidable = require('formidable'),
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
    // res.render('index', { title: title, avatar_field: process.env.AVATAR_FIELD });
    res.render('index', {
        title: title
    });
});

app.get('/about', function (req, res) {
    var title = 'Suburbs Directory - About'
    // res.render('index', { title: title, avatar_field: process.env.AVATAR_FIELD });
    res.render('about', {
        title: title
    });
});

app.get('/register', (req, res) => {
    var title = 'Suburbs Directory - Register'
    res.render('register', {
        title: title, source: "", source2: ""
    });
    // res.send({data: 'test'});
})

app.get('/terms', (req, res) => {
    var title = 'Suburbs Directory - Terms & Conditions'
    res.render('terms', {
        title: title
    });
    // res.send({data: 'test'});
})

app.get('/packages', (req, res) => {
    var title = 'Suburbs Directory - Package Options'
    res.render('packages', {
        title: title
    });
    // res.send({data: 'test'});
})

app.get('/contact', (req, res) => {
    var title = 'Suburbs Directory - Contact Us'
    res.render('contact', {
        title: title
    });
    // res.send({data: 'test'});
})

app.post('/upload', upload.fields([{
    name: 'file-to-upload', maxCount: 1
  }, {
    name: 'file-to-upload2', maxCount: 1
  }]), (req, res) => {
      let data = req.files;
      console.log(data);
      if (data['file-to-upload']) {
        console.log(data['file-to-upload'][0].path);
        // source = data['file-to-upload'][0].path
        source = 'uploads/' + data['file-to-upload'][0].filename;
        console.log(source);
      } else {
          console.log('file-to-upload IS EMPTY')
          source = "";
      }
      if (data['file-to-upload2']) {
        console.log(data['file-to-upload2'][0].path);
        source2 = 'uploads/' + data['file-to-upload2'][0].filename;

      } else {
          console.log('file-to-upload2 IS EMPTY')
          source2 = "";
      }
      var title = 'Suburbs Directory - Register'
    res.render( 'register', { title: title, source: source, source2: source2});

  });
// app.post('/upload', upload.single('file-to-upload'), (req, res) => {
//     console.log(req.file.filename)
//     res.redirect('/register');
//   });


app.listen(port, () => {
    console.log(`App is running on Port: ${port}`);
})