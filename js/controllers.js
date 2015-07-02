// Controllers
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
    // Pass in the city through scope
    $scope.city = cityService.city;

    // Setup a watch to update the city based on the input from the user
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

    $scope.submit = function() {
        $location.path('/forecast');
    };
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    // Pass in the city through scope
    $scope.city = cityService.city;

    // Pass in routeParams for days
    $scope.days = $routeParams.days || '5';

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily',
        {
            callback: 'JSON_CALLBACK'
        },
        {
            get: {
                method: 'JSONP'
            }
        });

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days
    });

    // Convert degree Kelvin to Fahrenheit
    $scope.convertToFahrenheit = function(degK) {

        return Math.round((1.8 * (degK - 273)) + 32);
    };

    // Convert date
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
}]);