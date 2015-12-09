module.exports = ['$state', 'booksService', controller];

function controller($state, booksService){

	var ctrl = this;

	var bookID = $state.params.id;

	// query boodID
	var book = booksService.getBookById(bookID);

	// book not found, go back to index
	if (!book) return $state.go('books-index');

	// attach view
	this.book = book;

	this.goToBookById = booksService.goToBookById;

	this.relatedBooks = booksService.getRandomFromGenre(ctrl.book.genre.name, bookID);

}