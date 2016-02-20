'use strict';

// Imports
window.jQuery = window.$ = require('jquery');
var angular = require('angular');
require('bootstrap');
require('angular-route');

// Application routing and startup
var Router  = require('./router');
var StartUp = require('./startUp');

// Application modules
require('./components/home/home');
require('./components/room/room');

// Injection
var app = angular.module('app', [
	'ngRoute',
	'app.home',
    'app.room'
]);

app.config(['$routeProvider', Router]);
app.run(StartUp);