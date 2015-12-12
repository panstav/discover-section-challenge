module.exports = ['$stateProvider', '$locationProvider', '$urlRouterProvider', registerStates];

function registerStates($stateProvider, $locationProvider, $urlRouterProvider){

	// some folks say hashbangs are a good indicator to differ between static-file requests and API calls
	// i'm just fine with using '/api' or '/v1' as a top-level route and have beautiful urls
	// I suppose users respond to urls that look like a familiar structure - such as breadcrumbs
	$locationProvider.html5Mode(true);

	$stateProvider.state('books-index', {
		title: 'Books Index | Discover Section',
		url: '/',
		views: { main: { template: '<books-index></books-index>' } }
	});

	$stateProvider.state('book-show', {
		title: 'Book Details | Discover Section',
		url: '/show/:id',
		views: { main: { template: '<book-show></book-show>' } }
	});

	// fallback
	$urlRouterProvider.otherwise("/");

}