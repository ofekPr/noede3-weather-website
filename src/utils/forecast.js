const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d0cf2282a99786a1d08414c2634adba9&query=" +
    lat +
    "," +
    long +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          "c degress out. It feels like " +
          body.current.feelslike +
          "c degress out. The humidity is " +
          body.current.humidity +
          '%. The wind is ' +
          body.current.wind_speed +
          'km/h.'
      );
    }
  });
};

module.exports = forecast;
