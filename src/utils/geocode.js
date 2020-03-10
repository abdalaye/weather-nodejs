const request = require('request')

const geocode = (address, calback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=pk.eyJ1Ijoic291bWFyZSIsImEiOiJjazc3a3U0dXYwNzJ6M2xwZDNsc3hsajJ2In0.VdGNMf-6reNfZDov6B96eA`
    request.get({url: url, json: true}, (error, response) => {
        if(error) {
            calback("Impossible de se connecter à Internet!", undefined)
        } else if(response.body.features.length === 0) {
            calback("Aucun résultat pour votre recherche, essayer avec une autre!",undefined)
        } else {
            const longitude = response.body.features[0].center[0]
            const lattitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            const body = {
                longitude,
                lattitude,
                location
            }
            calback(undefined, body)
        }
    })
}

module.exports = geocode