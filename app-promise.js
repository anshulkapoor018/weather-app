const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find the address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherURL = `https://api.darksky.net/forecast/ff1fdcc8115fd385a9db780065376207/${lat},${lng}`;

  console.log(response.data.results[0].formatted_address);
  
  return axios.get(weatherURL);
}).then((response) => {
    var temperature = ((((response.data.currently.temperature) - 32) * 0.5556)).toFixed(2) + ' °C';
    var apparentTemperature = ((((response.data.currently.apparentTemperature) - 32) * 0.5556)).toFixed(2) + ' °C';
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect');
  }else{
    console.log(e.message);
  }
});
