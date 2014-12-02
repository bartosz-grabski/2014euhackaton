var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'controllers', 'services', 'directives']);


app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/dashboard/:id', {
                templateUrl: '/views/dashboard/',
                controller: 'DashboardController'
            }).
            otherwise({  
                redirectTo: '/home',
                templateUrl: '/views/home',
                controller: 'HomeController'
            });
    }]);