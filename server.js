//shif+alt+f : to format document

//_ before a filename means that this is not a main file and is used partially

//To run:
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
//yarn dev

const express = require('express')
const app = express()               //app is like an object of express
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000

//Assets
app.use(express.static('public'))   

//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//routes - should be below the template engine code
app.get('/', (req, res) => {
    res.render('home')                          //resources/views/home
})

app.get('/cart', (req, res) => {
    res.render('customers/cart')                //resources/views/customers/cart
})

app.get('/login', (req, res) => {
    res.render('auth/login')                    //resources/views/auth/login
})

app.get('/register', (req, res) => {
    res.render('auth/register')                 //resources/views/auth/register
})

app.listen(PORT, () => {
    console.log(`Listening on port :  ${PORT}`)
})