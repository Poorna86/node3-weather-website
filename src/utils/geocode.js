const request = require('request')
const fs = require('fs')

const geoLocation = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicG9vcm5hODYiLCJhIjoiY2s5Z3FzeTZsMDRkZjNxcTZkam81bXE5aSJ9.o5KUNqK4ZbhLVbXGw04LJQ'
    
    request({url: url, json: true}, (error, response) =>{
        if(error){
            console.log('response data 0')
            callback('error',undefined)
        } else if (response.body.message === 'Not Authorized - No Token') {
            console.log('response data 1')
            callback(response.body.message,undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find the location, try another search',undefined)
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoLocation