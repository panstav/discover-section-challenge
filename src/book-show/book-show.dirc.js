var controller = require('./book-show.ctrl');
var template = require('./book-show.jade');

module.exports = [directive];

function directive(){
	return {

		scope: {},

		restrict: 'E',

		template: template,

		controller: controller,
		controllerAs: 'bookShow'

	};
}