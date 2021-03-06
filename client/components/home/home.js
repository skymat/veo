'use strict';

// Imports
var angular = require('angular');
var HomeCtrl  = require('./controllers/homeCtrl');

// Home sub-module definition
var home = angular.module('app.home', []);
home.controller('HomeCtrl', ['$location', HomeCtrl]);

module.exports = home;