const express = require("express"),
    app = express();
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

const   screenRoutes  =  require('./routes/screenRoutes'),
        suburbsRoutes = require('./routes/suburbsRoutes'),
        createProfileRoutes = require('./routes/createProfile'),
        uploadImagesRoute = require('./routes/uploadImagesRoute'),
        cropImagaesRoute = require('./routes/cropImagesRoute'),
        getPackages = require('./routes/getPackages'),
        contactRoute = require('./routes/contact'),
        getAreasRoute = require('./routes/getAreas'),
        getCategoriesRoute = require('./routes/getCategories'),
        previewProfileRoute = require('./routes/previewProfile')


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

app.listen(port, () => {
    console.log(`App is running on Port: ${port}`);
})


