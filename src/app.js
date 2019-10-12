const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require(path.join(__dirname, './utils/geocode'))
const forecast = require(path.join(__dirname, './utils/forecast'))

const app = express()
const public = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

// Setup view engine
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup directory for static files
app.use(express.static(public))

const indexValues =  {
    title: 'Weather app',
    description: 'Use this app to search your location forecast!',
    name: 'David'
}

const aboutValues =  {
    title: 'About',
    name: 'David'
}

const helpValues =  {
    title: 'Help',
    description: 'Search forecast for cities: Paris, Ciudad de México, Moscu',
    name: 'David'

}

const errorValues = {
    title: '404 not found',
    description: 'The requested page does not exists',
    name: 'Pulque el gato'
}

app.get('/', (req, res) => {
    res.render('index', indexValues)
})

app.get('/about', (req, res) => {
    res.render('about', aboutValues)
})

app.get('/about/*', (req, res) => {
    const newValues = { description: 'About page not found' }
    const aboutErrorValues = Object.assign({}, errorValues, newValues)

    res.render('404', aboutErrorValues)

    console.log('Requested', req._parsedOriginalUrl.pathname)
})

app.get('/help', (req, res) => {
    res.render('help', helpValues)
})

app.get('/help/*', (req, res) => {
    const newValues = { description: 'Help page not found' }
    const helpErrorValues = Object.assign({}, errorValues, newValues)

    res.render('404', helpErrorValues)
    console.log('Requested', req._parsedOriginalUrl.pathname)
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.status(400)
        const body = {
            error: {
                code: 400,
                message: 'You must provide an address'
            }
        }
        return res.send(body)
    }

    const address = req.query.address

    geocode(address, (err, { lat, lng, location } = {}) => {
        if (err) {
            const body = {
                error: {
                    code: 500,
                    message: 'Cannot get geolocation'
                }
            }
            console.error(body)
            console.error(err)

            res.status(500)
            return res.send(body)
        }

        forecast(lat, lng, (err, forecastData) => {
            if (err) {
                const body = {
                    error: {
                        code: 500,
                        message: 'Cannot get forecast'
                    }
                }
                const status = 500

                console.error(body)
                console.error(err)

                return { body, status }
            }
            const body = { location, address, forecast:forecastData }

            console.log(body)
            res.status(200)
            res.send(body)
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', errorValues)
    console.log('Requested', req._parsedOriginalUrl.pathname)
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
    console.log('http://localhost:3000')
})
