const path = require ('path')
const express = require ('express')  //express here returns a function, not an object
const hbs = require('hbs')
const geocode =  require ('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')

app = express() // here we generate the application by calling express
const port = process.env.PORT || 3000

//defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Balint'
    })
} )

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Balint'
    })
} )

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page message',
        title: 'Help',
        name: 'Balint'
        
    })
} )


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }  
    address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => { //vagy az error vagy a masik lesz kitoltve
                        // = {} megadok egy default valuet arra az esetre ha ertek nelkul hivodik meg
        if (error) {
            //return console.log(error)  //using return stop funtion execution right here, no need for else clause
            res.send(error)  //ez eredetileg error : error volt
        }
        
        forecast(latitude, longitude, (error, forecastData) => {  //ha a response van kitoltve akkor hasznalja azokat
    
            if (error) {
                res.send(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        name: 'Balint',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: '404',
        name: 'Balint'
        
      })
})

app.listen(port, () => {
    console.log('Server is running on port '+port)
})