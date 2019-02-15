const   express 			= require("express"),
        app      			= express();

const dotenv = require('dotenv').config();
const port = 3000 || process.env.PORT;
          
app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

/* routes/index.js */



app.get('/', function(req, res) {
    var title = 'Suburbs Directory - Home'
    // res.render('index', { title: title, avatar_field: process.env.AVATAR_FIELD });
    res.render('index', {title: title});
    });

app.get('/about', function(req, res) {
    var title = 'Suburbs Directory - About'
    // res.render('index', { title: title, avatar_field: process.env.AVATAR_FIELD });
    res.render('about', {title: title});
    });

app.get('/register', (req, res) => {
    var title = 'Suburbs Directory - Register'
    res.render('register', {title: title});
    // res.send({data: 'test'});
})

app.get('/upload/:files', (req, res) => {
    var files = req.params.files;
    console.log(files)
    res.send(files);
    // console.log(file)
})


app.listen(port, ()=> {
    console.log(`App is running on Port: ${port}`);
})



