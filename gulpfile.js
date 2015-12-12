var path = require('path');
var gulp = require('gulp');
var jsonfile = require('jsonfile');

var sass = require('gulp-sass');
var jade = require('gulp-jade');
var util = require('gulp-util');
var rename = require('gulp-rename');

var webpack = require('webpack');

gulp.task('sass', function(){

	// compile index file which includes everything else
	return gulp.src('src/index.sass')
		.pipe(sass({ errLogToConsole: true, sourceComments : 'normal' }))
		.pipe(rename({ basename: 'styles' }))
		.pipe(gulp.dest('public'));

});

gulp.task('jade', function(){

	// compile only the index page
	// the rest would be included in bundle using webpack loaders
	return gulp.src('src/index.jade')
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('public'));

});

gulp.task('js', function(done){

	var webpackOptions = {
		entry: './index.js',
		context: path.join(__dirname, './src'),

		output: { path: './public', filename: 'bundle.js' },

		module: {
			loaders: [

				// jade => inject(html)
				{ test: /\.jade/, loader: 'html!jade-html' },

				// json => js object
				{ test: /\.json/, loader: 'json' }

			]
		},

		plugins: []
	};

	webpack(webpackOptions, function(err){
		if (err) throw new util.PluginError('webpack', err);

		done();
	});

});

gulp.task('prep-books', function(done){

	jsonfile.readFile('./books.json', function(err, booksArr){
		if (err) return console.error(err);

		// make each book cover unique
		var readyBooksArr = booksArr.map(uniquefyCovers);

		// write file to whether it would be farther handled by webpack
		jsonfile.writeFile('./src/books.json', readyBooksArr, done);
	});

	function uniquefyCovers(book){

		// allow skipping over this uniquefication
		if (process.env.CLONE_IMAGES) return book;

		book.cover += '?seed=' + Math.round(Math.random() * 1000);

		book.author.avatar += 'people?seed=' + Math.round(Math.random() * 1000);

		return book;
	}

});

gulp.task('build', ['prep-books', 'sass', 'jade', 'js']);