const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const MongoStore = require('connect-mongo');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const mongoose = require('mongoose');

const connectDB = require('./config/db')

//Load config
dotenv.config({path : './config/config.env'});
connectDB();

const Employee = require('./models/Employee');
const employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' , handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'hbs');

app.listen(8080, () => {
    console.log('Express server started at port : 3000');
});

app.use('/employee', employeeController);
