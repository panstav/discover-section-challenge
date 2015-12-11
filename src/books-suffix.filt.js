module.exports = function(){
	return function(genre){

		// make sure string has the word 'books'
		return genre.toLowerCase().search('books') ? genre : genre + ' books';
	}
};