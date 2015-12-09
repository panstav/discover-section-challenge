var template = require('./book-card.jade');

module.exports = [directive];

function directive(){
	return {

		scope: {
			book: '=bookCard'
		},

		restrict: 'A',

		template: template,

		controllerAs: 'bookCard',
		controller: ['booksService', controller]

	};
}

function controller(booksService){

	this.goToBookById = booksService.goToBookById;

}