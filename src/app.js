const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 8585

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rushabh Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rushabh Patel',
        ques: 'How uh doin?'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rushabh Patel'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address Not Provided'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {} ) => {
        if(error)
            return res.send({ error })
        forecast(longitude, latitude, (error, {temperature, precip, humidity, weather} = {} ) => {
            if(error)
                return res.send({ error })
            res.send({
                precip,
                humidity,
                temperature,
                weather,
                address: req.query.address,
                location
            })
        })
    })
    // res.send({
    //     temperature: 31,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query.a)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        errorMsg: 'Help article not found',
        title: '404',
        name: 'Rushabh Patel'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        errorMsg: 'Page Not Found',
        title: '404',
        name: 'Rushabh Patel'
    })
})

app.listen(port, () => {
    console.log('Server listening on port '+port)
})