'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');

var webrtc, _$location;

// HomeCtrl class
function HomeCtrl($location) {
    _$location = $location;
    this.username = window.veo.username;
    this.isDemo = window.veo.demo || false;
}

HomeCtrl.prototype.createRoom = function () {
    var id = uuid.v4();
    _$location.path('/' + id);
};

module.exports = HomeCtrl;