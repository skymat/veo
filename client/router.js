'use strict';

// Router class
function Router($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: '/components/home/controllers/home.html'
	})

	.when('/:id', {
		templateUrl: '/components/room/controllers/room.html'
	})

	.otherwise({ redirectTo: '/' });
}

module.exports = Router;