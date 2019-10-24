const gulp = require('gulp');
const bs 	 = require('browser-sync').create();
const sass = require('gulp-sass');

function serve() {
	bs.init({
		server: {
			baseDir: './'
		},
		port: 8000,
		ui: {
			port: 8001
		}
	});
}

function style() {
	return gulp.src('./scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./css'))
		.pipe(bs.stream());
}

function watch() {
	serve();
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./*.html').on('change', bs.reload);
	gulp.watch('./js/**/*.js').on('change', bs.reload);
}

exports.style = style;
exports.watch = watch;
exports.default = watch;