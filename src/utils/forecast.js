const request = require('request')

//Backward Geocoding ==> lat/long -> Address
const backwardGeocode = (longitude, latitude, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?access_token=pk.eyJ1IjoiYWFyYXYwMTAiLCJhIjoiY2ticDVxcWExMjk1ODJ5cHZ6dGNqeXcxNCJ9.pgxBpgB45GXjg4RdTofYgA&limit=1'

    request( { url, json: true}, (error, response) => {
        //console.log("In Backward")
        if(error)
            callback("Unable to connect to Location Service..!!")
        else if(response.body.features === undefined)
            callback("Unable to find the Location..!!")
        else{
            const location = response.body.features[0].place_name
            callback(location)
        }
    })
}

const forecast = (longitude, latitude, callback) => {    
    backwardGeocode(longitude, latitude, (location) => {
        //console.log('"'+location+'"')
        const url = 'http://api.weatherstack.com/current?access_key=bfb6f08193c20949473802449e43fb96&query='+location

        request({ url, json: true }, (error, response) => {
            if(error)
                callback("Unable to connect to Weather Services..!!", undefined)
            else if(response.body.error)
                callback("Unable to find the Location..!!", undefined)
            else{
                callback(undefined, {
                    temperature: response.body.current.temperature,
                    precip: response.body.current.precip,
                    location
                })
            }
        })
    })
}

module.exports = forecast