

const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d1bfcf1f59ca95493ecee3d889fe0211&query=' + lat +',' + long +'&units=f'

    request ({url, json: true}, (error, { body }) => {   // { body } is destructured here - instead of response

        if(error){
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find coordinates', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Currently it is ' + body.current.temperature + ' degrees and it feel like ' +body.current.feelslike + ' degrees')
        }

    })  //request call over

}   //forecast function over


module.exports = forecast