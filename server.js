//shif+alt+f : to format document

//_ before a filename means that this is not a main file and is used partially

//To run:
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
//yarn dev

require('dotenv').config()
const express = require('express')
const app = express()               //app is like an object of express
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')

//Database connection
const url = 'mongodb://localhost/foodie';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
//mongoose.connect(process.env.MONGO_CONNECTION_URL , { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });

const connection = mongoose.connection;
connection
    .once('open', function () {
      console.log('MongoDB running');
    })
    .on('error', function (err) {
      console.log(err);
    });


// Session config
app.use(session({                                       //session collection is also created in the db
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store : MongoDBStore.create({
        // mongoUrl : process.env.MONGO_CONNECTION_URL,
        client: connection.getClient()          
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}))

app.use(flash())

//Assets
app.use(express.static('public'))

app.use(express.json())

//global middleware
app.use((req,res,next)=>{
  res.locals.session = req.session
  next()
})

//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//routes - should be below the template engine code
//We should keep all the routes in a different file
//using require we are importing web.js files' initRoutes function and as it is a function we call it using () and passing in the app instance and it is by default via reference so the same instance is shared

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Listening on port :  ${PORT}`)
})