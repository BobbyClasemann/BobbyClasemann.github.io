function getWeather(lat, lng) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=053d80af6f612d3706b7b7d211d5d242`)
  	.then(function(response) {
    	return response.json();
  })
  	.then(function(json) {
  		console.log('Request successful', json);
  		extractWeatherData(json);
  })
  	.catch(function(error) {
    	console.log('Request failed', error)
  });
}

function fahrenheitConverter(temperature) {
	return Math.round((temperature - 273.15) * 9/5 + 32);
}

function extractWeatherData(json) {
   		var temp = fahrenheitConverter(json.main.temp);
   		var condition = json.weather[0].main;
      var detailedCondition = json.weather[0].description;
   		var maxTemp = fahrenheitConverter(json.main.temp_max);
   		var minTemp = fahrenheitConverter(json.main.temp_min);
   		var humidity = json.main.humidity;
   		var weatherData = {
   			temp : temp,
   			condition : condition,
        detailedCondition : detailedCondition,
   			maxTemp : maxTemp,
   			minTemp : minTemp,
   			humidity : humidity
   		};

   		populateWeather(weatherData);
}
