const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYWFyYXYwMTAiLCJhIjoiY2ticDVxcWExMjk1ODJ5cHZ6dGNqeXcxNCJ9.pgxBpgB45GXjg4RdTofYgA&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if(error)
            callback("Unable to connect to Location Services..!!", undefined)
        else if(body.features.length === 0)
            callback("Unable to find Location..!!", undefined)
        else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode




