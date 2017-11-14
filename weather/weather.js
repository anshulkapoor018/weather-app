const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/ff1fdcc8115fd385a9db780065376207/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined,{
        temperature : ((((body.currently.temperature) - 32) * 0.5556)).toFixed(2) + ' °C',
        feelsLike : ((((body.currently.apparentTemperature) - 32) * 0.5556)).toFixed(2) + ' °C'
      });
    }
  });
}

module.exports.getWeather = getWeather;


//    url: `https://api.darksky.net/forecast/ff1fdcc8115fd385a9db780065376207/${lat},${lng}`,
