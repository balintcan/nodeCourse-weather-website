const request = require('request')

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFsaW50Y2FuIiwiYSI6ImNrOTduYWR0aDE0N3czbXJ1bXVybDA4YWYifQ.6wWuq5sMqB35wEEjs22FpQ&limit=1'
    request({ url, json: true}, (error, { body }) => { // { body } is destructured here - instead of response
            if(error){
                callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                 latitude : body.features[0].center[1],
                 longitude : body.features[0].center[0],
                 location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode