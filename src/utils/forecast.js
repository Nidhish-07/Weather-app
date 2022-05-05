"use strict";

const request = require("postman-request");

const forecast = function (lng, lat, callback) {
  const url = `http://api.weatherstack.com/current?access_key=330e896f8e539589c223f6ef273d883c&query=${lng},${lat}&units=m`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback(`Unable to connect to Weather API`);
    } else if (body.error) {
      callback(body.error.info);
    //   console.log();
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degree outside, but feels like ${body.current.feelslike} degree outside`
      );
    }
  });
};

module.exports = forecast;
