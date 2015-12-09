var BOOKS_PER_PAGE = 12;

module.exports = ['$state', 'booksService', controller];

function controller($state, booksService){
	var ctrl = this;

	var books = booksService.getAll();

	this.allGenres = books.reduce(extractGenres, []).sort(sortGenres);
	this.genresOptions = this.allGenres;

	// keep a record of all books going through filter
	// so that pagination could show partials of it
	var filteredBooksCache;

	// main filter === [genre, category, search]
	this.filterBooks = function(){

		// reset genre options at <select> to fit with selected category
		ctrl.genresOptions = ctrl.category ? ctrl.allGenres.filter(onlyGenresOfCategory) : ctrl.allGenres;

		// filter books by user input, and save to cache
		var filteredBooks = filteredBooksCache = booksService.filter({ search: ctrl.search, category: ctrl.category, genre: ctrl.genre });

		// show only the first 12 books (or all of them)
		var paginatedBooks = filteredBooks.slice(0, BOOKS_PER_PAGE);

		// set pagination flag to show/hide next and previous button
		ctrl.pagination = filteredBooks.length > BOOKS_PER_PAGE;

		// either way - reset page indicator and set total
		ctrl.currentPage = 1;
		ctrl.totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

		// attach to view
		ctrl.books = paginatedBooks;
	};

	this.resetFilter = function(){

		// do nothing if no books were shown yet (don't steal the show)
		if (!ctrl.books) return;

		// set filter parameters to initial values
		ctrl.search = '';
		ctrl.category = '';
		ctrl.genre = '';

		// reset genre options
		ctrl.genresOptions = ctrl.allGenres;

		// execute filter to render all books
		ctrl.filterBooks();
	};

	// pagination navigation
	this.nextPage = function(){
		ctrl.currentPage++;

		applyPagination();
	};
	this.prevPage = function(){
		ctrl.currentPage--;

		applyPagination();
	};

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

	function applyPagination(){
		var startPos = (ctrl.currentPage - 1) * BOOKS_PER_PAGE;
		var endPos = ctrl.currentPage * BOOKS_PER_PAGE;

		// attache current page to view
		ctrl.books = filteredBooksCache.slice(startPos, endPos);
	}

	function onlyGenresOfCategory(genre){
		return !ctrl.category || genre.category === ctrl.category;
	}

	function sortGenres(a, b){
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
	}

}