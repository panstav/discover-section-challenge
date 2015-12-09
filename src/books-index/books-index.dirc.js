var controller = require('./books-index.ctrl');
var template = require('./books-index.jade');

module.exports = [directive];

function directive(){
	
	return {

		scope: {},

		restrict: 'E',

		controllerAs: 'booksIndex',
		controller: controller,

		template: template

	};
}