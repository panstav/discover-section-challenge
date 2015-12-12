module.exports = [filter];

function filter(){
	return function(genre){

		// make sure string has the word 'books' in it
		return genre.toLowerCase().search('books') ? genre : genre + ' books';
	}
}