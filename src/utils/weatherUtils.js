const request = require('request');

const api_access_key = '638a243c84c28822f7e84bfaa3c24284';
const baseURL = 'http://api.weatherstack.com/';


const getCurrentWeather = (latitude, longitude, callback) => {
    request({url: getURL(latitude, longitude, api_access_key), json: true}, (error, { body } = {}) => { // { body }: destructuring of response | {}: default value
        if (error) {
            callback('Unable to access weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find current weather using specified location.', undefined);
        } else {
            callback(undefined, {
                currentDescription: body.current.weather_descriptions[0],
                currentTemperature: body.current.temperature,
                currentFeelsLike: body.current.feelslike,
            })
        }
});
};

const getURL = (latitude, longitude, accessKey) => {
    const url = baseURL + 'current?access_key=' + accessKey + '&query=' + latitude + ',' + longitude;
    return url;
}

module.exports = {
    getCurrentWeather,
}