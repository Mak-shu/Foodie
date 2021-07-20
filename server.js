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

app.get('/', (req, res) => {
    res.render('home')              //resources/views/home
})


//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


app.listen(PORT, () => {
    console.log(`Listening on port :  ${PORT}`)
})