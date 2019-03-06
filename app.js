const express = require("express"),
    app = express();


const port = 3000 || process.env.PORT;

if (port === 3000) {
    const dotenv = require('dotenv').config();
}

app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const   screenRoutes  =  require('./routes/screenRoutes'),
        suburbsRoutes = require('./routes/suburbsRoutes'),
        createProfileRoutes = require('./routes/createProfile'),
        uploadImagesRoute = require('./routes/uploadImagesRoute'),
        cropImagaesRoute = require('./routes/cropImagesRoute')


app.use(screenRoutes);
app.use(suburbsRoutes);
app.use(createProfileRoutes);
app.use(uploadImagesRoute);
app.use(cropImagaesRoute);

app.listen(port, () => {
    console.log(`App is running on Port: ${port}`);
})


