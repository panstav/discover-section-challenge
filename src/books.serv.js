var books = require('./books.json');

module.exports = ['$state', service];

function service($state){

	return {

		getAll: function(){ return books },

		getAllGenres: getAllGenres,

		getBookById: getBookById,

		filter: filter,

		getRandomFromGenre: getRandomFromGenre,

		goToBookById: function(id){ $state.go('book-show', { id: id }) }

	};

}

function getAllGenres(){

	return books.reduce(extractGenres, []).sort(sortGenres);

	function extractGenres(genres, book){

		var foundGenre;
		for (var i in genres){
			if (genres[i].name === book.genre.name){
				foundGenre = true;

				break;
			}
		}

		if (!foundGenre) genres.push(book.genre);

		return genres;
	}

	function sortGenres(a, b){
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
	}

}

function getBookById(bookID){
	var book;

	for (var i in books){
		if (books[i].id === bookID){
			book = books[i];

			break;
		}
	}

	return book;
}

function filter(options){

	// by genre
	return books.filter(function(book){
		return !options.genre || book.genre.name === options.genre;

	// by category
	}).filter(function(book){
		return !options.category || book.genre.category === options.category;

	// by string search
	}).filter(function(book){
		if (!options.search) return true;

		// lowercase everything
		var authorName = book.author.name.toLowerCase();
		var bookName = book.name.toLowerCase();
		var searchStr = options.search.toLowerCase();

		// search string in author name and book name
		return [authorName, bookName].some(function(name){
			return name.search(searchStr) > -1;
		});
	});

}

function getRandomFromGenre(genre, excludeID){

	// get books from this category, keep excluded id out
	var filteredBooks = filter({ genre: genre }).filter(function(book){ return book.id !== excludeID });

	// return first three of a randomized filteredBooks
	return filteredBooks.sort( function() { return 0.5 - Math.random() }).slice(0, 3);
}