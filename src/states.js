module.exports = ['$stateProvider', '$locationProvider', '$urlRouterProvider', registerStates];

function registerStates($stateProvider, $locationProvider, $urlRouterProvider){

	// some folks say hashbangs are a good indicator to differ between SPA and API calls
	// i'm just fine with using '/api' or '/v1' and have beautiful urls
	// users respond to urls that look like works in a familiar structure
	$locationProvider.html5Mode(true);

	$stateProvider.state('books-index', {
		title: 'Books Index | Discover Section',
		url: '/',
		views: { main: { template: '<books-index></books-index>' } },
		params: { page: 0 }
	});

	$stateProvider.state('book-show', {
		title: 'Book Details | Discover Section',
		url: '/show/:id',
		views: { main: { template: '<book-show></book-show>' } }
	});

	// fallback to homepage
	$urlRouterProvider.otherwise("/");

}