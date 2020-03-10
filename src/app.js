const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//create paths
const publicStaticFilePath = path.join(__dirname, '../public')
const viewTemplatesPath = path.join(__dirname, '../templates/views')
const viewPartialsPath = path.join(__dirname, '../templates/partials')

//set paths
app.use(express.static(publicStaticFilePath))
app.set('view engine', 'hbs')
app.set('views', viewTemplatesPath)
hbs.registerPartials(viewPartialsPath)

app.get('', (req, res) => {
    res.render('index', {
        name: "Application Météo",
        auteur: "Abdalaye SOUMARE"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "A propos de nous",
        auteur: "Abdalaye SOUMARE"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(address) {
        geocode(address, (error,{longitude, lattitude, location} = {}) => {
            if(error) {
                return res.send({ error })
            }
            
            forecast(lattitude, longitude,(error, response) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    forecast: response,
                    address,
                    location,
                    auteur: "Abdalaye SOUMARE"
                })
            })

        }) 
    }
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: "Page d'aide",
        auteur: "Abdalaye SOUMARE"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        code: 404,
        errorMessage: "Page non trouvée",
        auteur: "Abdalaye SOUMARE"
    })
})

app.listen(3000, () => {
    console.log('Your server is listen on 3000 port...')
})