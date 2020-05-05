
const request = require('request')
const chalk = require('chalk')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2300b60f60cba65ecbe634ddd38a8d06&query='+longitude+','+latitude
    
    request({url:url,json: true},(error,response) => {
        if (error){
            callback(error,undefined)
        } if (response.body.error) {
                callback(response.body.error,undefined)
        } else {
            const forecast = '  ' +response.body.current.weather_descriptions[0]+ ',current temperature ' +response.body.current.temperature+ ' and feelslike ' +response.body.current.feelslike
             
            callback(undefined,{
                error: undefined,
                forecast: forecast
            })
        }
    })
}

module.exports = forecast