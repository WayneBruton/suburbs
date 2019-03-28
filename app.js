const express = require("express"),
    app = express();
    var session = require('express-session');
    const bodyParser = require('body-parser');
    

    

const port = 3000 || process.env.PORT;



if (port === 3000) {
    const dotenv = require('dotenv').config();
}

const portExport = { //Not sure if I need this
  port: port
}
module.exports = portExport;


app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } //1 hour
  }))

const   screenRoutes  =  require('./public/routes/screenRoutes'),
        suburbsRoutes = require('./public/routes/individualSuburbRoutes/suburbsRoutes'),
        createProfileRoutes = require('./public/routes/registerRoutes/createProfile'),
        uploadImagesRoute = require('./public/routes/registerRoutes/uploadImagesRoute'),
        cropImagaesRoute = require('./public/routes/registerRoutes/cropImagesRoute'),
        getPackages = require('./public/routes/registerRoutes/getPackages'),
        contactRoute = require('./public/routes/contact'),
        getAreasRoute = require('./public/routes/registerRoutes/getAreas'),
        getCategoriesRoute = require('./public/routes/registerRoutes/getCategories'),
        previewProfileRoute = require('./public/routes/adminRoutes/previewProfile'),
        createUserRoute = require('./public/routes/adminRoutes/users'),
        userAdminRoute = require('./public/routes/adminRoutes/usersAdmin'),
        userAdminEditViewProfileRoute = require('./public/routes/adminRoutes/adminEditViewProfile'),
        activeRoutes = require('./public/routes/individualSuburbRoutes/activeRoutes'), 
        activeCharityRoute = require('./public/routes/adminRoutes/adminAddCharity'),
        charityRoutes = require('./public/routes/individualCharityRoutes/charityRoutes'),
        noticeRoutes = require('./public/routes/individualCommunityNoticesRoutes/communityNoticesRoutes'),
        addNoticeRoutes = require('./public/routes/adminRoutes/adminAddNotices')



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
app.use(activeCharityRoute);
app.use(charityRoutes);
app.use(noticeRoutes);
app.use(addNoticeRoutes);

app.listen(port, () => {
    console.log(`App is running on Port: ${port}`);
})




