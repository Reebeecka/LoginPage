var express = require('express');
var mongoose = require('mongoose');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGODBNAME}:${process.env.PASSWORD}@rebecka.i3dmu.mongodb.net/Newsletter?retryWrites=true&w=majority`, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Database is connected");
    }
});

const port = 5000
const app = express();

app.use(express.json());
app.use('/admin', adminRouter);
app.use('/api', apiRouter);



app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});