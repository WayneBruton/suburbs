const express = require("express"),
    app = express();
    var session = require('express-session');
    const bodyParser = require('body-parser');
    

    

const port = 3000 || process.env.PORT;

const portExport = { //Not sure if I need this
    port: 9999
  }
  module.exports = portExport;

if (port === 3000) {
    const dotenv = require('dotenv').config();
}

app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'Chester is awesome',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } //1 hour
  }))

 

const   screenRoutes  =  require('./routes/screenRoutes'),
        suburbsRoutes = require('./routes/suburbsRoutes'),
        createProfileRoutes = require('./routes/createProfile'),
        uploadImagesRoute = require('./routes/uploadImagesRoute'),
        cropImagaesRoute = require('./routes/cropImagesRoute'),
        getPackages = require('./routes/getPackages'),
        contactRoute = require('./routes/contact'),
        getAreasRoute = require('./routes/getAreas'),
        getCategoriesRoute = require('./routes/getCategories'),
        previewProfileRoute = require('./routes/previewProfile'),
        createUserRoute = require('./routes/users'),
        userAdminRoute = require('./routes/usersAdmin'),
        userAdminEditViewProfileRoute = require('./routes/adminEditViewProfile'),
        activeRoutes = require('./routes/individualSuburbRoutes/activeRoutes') 


app.use(screenRoutes);
app.use(suburbsRoutes);
app.use(createProfileRoutes);
app.use(uploadImagesRoute);
app.use(cropImagaesRoute);
app.use(getPackages);
app.use(contactRoute);
app.use(getAreasRoute);
app.use(getCategoriesRoute);
app.use(previewProfileRoute);
app.use(createUserRoute);
app.use(userAdminRoute);
app.use(userAdminEditViewProfileRoute);
app.use(activeRoutes);

app.listen(port, () => {
    console.log(`App is running on Port: ${port}`);
})


