const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app =  express()

// Defines paths for express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ofek Primor'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: 'About me',
        name: 'Ofek Primor'
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        message: 'Press control+c to copy and contol+v to paste!',
        title: 'Help',
        name: 'Ofek Primor'
    })
})

app.get('/weather', ({query}, res) => {
    if (!query.address) {
        return res.send({
            error: 'Please previde an address!'
        })
    }

    geocode(query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get ('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        page: 'Help article',
        name: 'Ofek Primor'
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        page: 'Page',
        name: 'Ofek Primor'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})