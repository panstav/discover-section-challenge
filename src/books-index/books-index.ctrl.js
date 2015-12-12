var BOOKS_PER_PAGE = 12;

module.exports = ['booksService', controller];

function controller(booksService){

	var ctrl = this;

	// get genres of both categories
	this.allGenres = booksService.getAllGenres();

	// apply all of them to genreSelection
	this.genresOptions = this.allGenres;

	// keep a record of all books going through filter
	// so that pagination could show sections of it
	var filteredBooksCache;

	// main filter === [genre, category, search]
	this.filterBooks = function(){

		// reset genre options at <select> to fit with selected category
		ctrl.genresOptions = ctrl.category
				? ctrl.allGenres.filter(onlyGenresOfCategory)
				: ctrl.allGenres;

		// filter books by user input, and save to cache
		var filteredBooks = filteredBooksCache = booksService.filter({ search: ctrl.search, category: ctrl.category, genre: ctrl.genre });

		// show only the first page
		// or all the books if there's less than what fits in one page
		var paginatedBooks = filteredBooks.slice(0, BOOKS_PER_PAGE);

		// set pagination flag to show/hide next and previous button
		ctrl.pagination = filteredBooks.length > BOOKS_PER_PAGE;

		// either way - reset page indicator and set total
		ctrl.currentPage = 1;
		ctrl.totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

		// attach to view
		ctrl.books = paginatedBooks;

		function onlyGenresOfCategory(genre){
			return !ctrl.category || genre.category === ctrl.category;
		}

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

	function applyPagination(){
		var startPos = (ctrl.currentPage - 1) * BOOKS_PER_PAGE;
		var endPos = ctrl.currentPage * BOOKS_PER_PAGE;

		// attach books on current page to view
		ctrl.books = filteredBooksCache.slice(startPos, endPos);
	}

}