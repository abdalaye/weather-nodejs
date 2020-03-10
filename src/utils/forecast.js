const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/fd1c54c76d4e489051907fbee8d2c978/${lng},${lat}?lang=fr`

    request.get({url: url, json: true}, (error, response) => {
        if(error) {
            callback("Impossible de se connecter à internet!")
        } else if(response.body.error) {
            callback("Merci de mettre une URL valide avec les bons paramètres!")
        }
        else {
            callback(undefined,response.body.daily.data[0].summary + '. Il fait actuellement ' + response.body.currently.temperature + 'F° degrès, avec ' + response.body.currently.precipProbability +'% de pleuvoir.')
        }
    })
}

module.exports = forecast