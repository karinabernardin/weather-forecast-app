const path = require('path');
const express = require('express');
const hbs = require('hbs');
const locationUtils = require('./utils/locationUtils');
const weatherUtils = require('./utils/weatherUtils');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 3000;

// Setup handlebars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Karina Bernardin'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Karina Bernardin'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Karina Bernardin'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'The request could not be executed. Please provide an address.'
        });
    }

    locationUtils.getCoordinatesFromLocation(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
            
        weatherUtils.getCurrentWeather(latitude, longitude, (error, {currentDescription, currentTemperature, currentFeelsLike} = {}) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                address: req.query.address,
                location,
                forecast: currentDescription + '. The current temperature is ' + currentTemperature + '°C and the temperature sensation is of ' + currentFeelsLike + '°C.',
            });
        });
    });    

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karina Bernardin',
        errorMessage: 'Help article not found.'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karina Bernardin',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Server is up on port 3000.');
})
