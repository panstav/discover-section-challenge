// snippet taken from:
// http://www.vijayjoshi.org/2008/10/24/faq-calculate-number-of-days-between-two-dates-in-javascript/

module.exports = [filter];

function filter(){
	var oneYear = 365*24*60*60*1000; // days * hours * minutes * seconds * milliseconds

	return function(inputDate){

		var now = new Date();
		var parsedDate = new Date(inputDate);

		var yearsPast = Math.round(Math.abs((now.getTime() - parsedDate.getTime())/(oneYear)));

		// return "YYYY (X years ago)" structured date
		return parsedDate.getFullYear() + ' (' + yearsPast + ' years ago)'
	}
}