////////////////////////////////////////////////////////////////////
//run using nodemon with specific extensions
//nodemon ./src/app.js -e js, hbs
//This will restart the server when templates or JS are changed
// dont commit node_modules to git. use NPM init instead
///////////////////////////////////////////////////////////////////

//CORE modules
const path = require('path')

//NPM modules
const express = require('express')
const hbs = require('hbs')


//local modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for Express config
const pubicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath, partialsPath)


//Setup Static director to serve
app.use(express.static(pubicDirectoryPath)) 

//configure server for specific URL
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'carly'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'carly programmer extrodinare'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the error you got',
        title: 'Help',
        name: 'Carly'    
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error: 'provide an address'
        })
    }
    //Sets a default object incase no data is provided to prevent errors
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        //get the forecast data based on geocode info
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({
                    error
                })
            }         
            //Send info back to client
            res.send({
                location: place_name,
                forecast: forecastData,
                address: req.query.address
            })      
        })
    })
})

app.get('/products', (req, res) => {
    //get the info off the query string 
    //console.log(req.query)

    if(!req.query.search)
    {
        //stops the function running
        return res.send({
            error: 'provide a search term'
        })
    }
    //access the key value pair
    //console.log(req.query.search)
    //console.log(req.query.rating)


    res.send({
        products: []
    })
})

//Matches any page that hasnt been matches under the help section
//to create specifc help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page not found',
        name: 'Carly the error machine',
        errorMessage: 'Help article not found'

    })
})

//404 page
//* means match anything that hasnt been matched above
app.get('*', (req, res) => {

    res.render('404', {
        title: '404 Page not found',
        name: 'Lost carly',
        errorMessage: 'Page not found' 
    })
})

app.listen(3006, () => {
    console.log('Starting server on port 3006')
})
