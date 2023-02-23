const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=984f4e1e690da584e8ef5d943dec1c9a&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

        request({url, json: true}, (error, {body}) => {

        if(error)
        {
            console.log(error)
            callback('Unable to connect to weather services', undefined)
        
        } else if(body.error)
        {
            callback('Unable to find location. Please try another search', undefined)
        }
        else
        {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.'
            )
        }
    })

}

module.exports = forecast