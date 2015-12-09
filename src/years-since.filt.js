// snippet taken from:
// http://www.vijayjoshi.org/2008/10/24/faq-calculate-number-of-days-between-two-dates-in-javascript/

module.exports = function(){
	var oneYear = 365*24*60*60*1000; // hours * minutes * seconds * milliseconds

	return function(inputDate){

		var today = new Date();
		var parsedDate = new Date(inputDate);

		var yearsPast = Math.round(Math.abs((today.getTime() - parsedDate.getTime())/(oneYear)));
		
		return parsedDate.getFullYear() + ' (' + yearsPast + ' years ago)'
	}
};