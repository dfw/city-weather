angular.module("demo", ['ngSanitize']);

function weather($scope, $http) {
  
  $scope.current = [];
  
  $scope.forecast = [];
  
  $scope.getWeather = function() {
    var loc = validLocation();
    if (loc) {
      $scope.location = loc;
      $(".current-conditions, .forecast").fadeOut(250, function() {
        $scope.fetchForecast();    
      });
    }
  };
  
  $scope.fetchForecast = function() {
    $scope.url = "http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location=" + $scope.location + "&format=json";
    $http.get($scope.url).
      success(function(data, status, headers, config) {
        var results = data.query.results.channel.item;
        $scope.current.title = results.title;
        $scope.current.temp = results.condition.temp;
        $scope.current.text = results.condition.text;
        $scope.current.code = '<i class="weather-icon ' + weatherIcons[results.condition.code] + '"></i>';
        $scope.forecast = [];
        angular.forEach(results.forecast, function(v) {
          var day = {
            "code": v.code,
            "icon": weatherIcons[v.code],
            "day": v.day,
            "high": v.high,
            "low": v.low,
            "text": v.text
          };
          this.push(day);
        }, $scope.forecast);
        $(".current-conditions, .forecast").fadeIn(250);
    });
  };

}

function validLocation() {

  if ($("#zip").val()) {
    // Validate zip if not empty
    var zip = $("#zip").val();
    var zipRegEx = new RegExp("^[0-9]{5}$");
    if (zipRegEx.test(zip)) {
      // Valid zip
      resetSelect();
      clearError();
      return zip;
    } else {
      // Invalid zip
      $("p.error").html("Zip code must be 5 digits.");
      return false;
    }
  } else {
    // Validate city
    var city = $("#city").val();
    if (city !== "") {
      // Valid city
      clearError();
      return city;
    } else {
      // Invalid city
      $("p.error").html("Select a city or type in a zip code.");
      return false;
    }
  }

}

function clearError() {

  $("p.error").empty();

}

function resetSelect() {

  $("#city").val("");

}

// Weather icons
var weatherIcons = [
  "wi-tornado",
  "wi-thunderstorm",
  "wi-tornado",
  "wi-thunderstorm",
  "wi-thunderstorm",
  "wi-rain-mix",
  "wi-rain-mix",
  "wi-rain-mix",
  "wi-rain-mix",
  "wi-sprinkle",
  "wi-rain-mix",
  "wi-showers",
  "wi-showers",
  "wi-snow",
  "wi-snow",
  "wi-snow",
  "wi-snow",
  "wi-hail",
  "wi-rain-mix",
  "wi-windy",
  "wi-fog",
  "wi-fog",
  "wi-fog",
  "wi-cloudy-gusts",
  "wi-cloudy-windy",
  "wi-cloudy-gusts",
  "wi-cloudy",
  "wi-night-cloudy",
  "wi-day-cloudy",
  "wi-night-cloudy",
  "wi-day-cloudy",
  "wi-night-clear",
  "wi-day-sunny",
  "wi-night-cloudy",
  "wi-day-sunny-overcast",
  "wi-rain-mix",
  "wi-day-sunny",
  "wi-thunderstorm",
  "wi-thunderstorm",
  "wi-thunderstorm",
  "wi-storm-showers",
  "wi-snow",
  "wi-snow",
  "wi-snow",
  "wi-day-cloudy",
  "wi-storm-showers",
  "wi-snow",
  "wi-storm-showers"
];

weatherIcons[3200] = "wi-thermometer";