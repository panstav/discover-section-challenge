var angular = require('angular');
var states = require('./states');

// let ui-router self register its module
require('angular-ui-router');

// register angular app
var app = angular.module('discover-section-challenge', ['ui.router']);

// configure states handling
app.config(states);

app.run(['$rootScope', '$state', function($rootScope){

	// on state-change
	$rootScope.$on('$stateChangeSuccess', function(e, toState){

		// apply state title
		document.title = toState.title;

		// scroll to top
		window.scroll(0, 0);
	});

}]);

// register this modules components
app.directive('booksIndex', require('./books-index/books-index.dirc'));
app.directive('bookShow', require('./book-show/book-show.dirc'));
app.directive('bookCard', require('./book-card/book-card.dirc'));
app.factory('booksService', require('./books.serv'));
app.filter('daysSince', require('./years-since.filt'));
app.filter('booksSuffix', require('./books-suffix.filt'));