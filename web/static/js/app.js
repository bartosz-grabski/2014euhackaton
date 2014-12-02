var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'geopoll.controllers', 'geopoll.services']);


app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl: '/views/dashboard',
                controller: 'DashboardController'
            }).
            otherwise({  
                redirectTo: '/home',
                templateUrl: '/views/home',
                controller: 'HomeController'
            });
    }]);