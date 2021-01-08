const request = require('request');

const api_access_key = 'pk.eyJ1IjoicGlsZ3JpLW0iLCJhIjoiY2tkdnVoMmZrMWtvcDJ1bHFzN2JqZmRkcyJ9.4_kB1Sgu3iYqV7OcUsLwpA';
const baseURL = 'https://api.mapbox.com/';


const getCoordinatesFromLocation = (location, callback) => {
    request({url: getURL(location, api_access_key), json: true}, (error, { body } = {}) => { // { body }: destructuring of response | {}: default value
        if (error) {
            callback('Unable to access geolocation service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
};

const getURL = (location, accessKey) => {
    const url = baseURL + 'geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=' + accessKey + '&limit=1';
    return url;
}

module.exports = {
    getCoordinatesFromLocation,
}