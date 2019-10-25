const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');

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
	return gulp
		.src('./scss/**/*.scss')
		.pipe(sass())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./css'))
		.pipe(bs.stream());
}
function scripts() {
	return gulp
		.src(['./js/app.mjs'])
		.pipe(gulp.dest('./js'));
}

function defaultTask() {
	serve();
	scripts();
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./*.html').on('change', bs.reload);
	gulp.watch('./js/**/*.mjs').on('change', bs.reload);
}

exports.style = style;
exports.scripts = scripts;
exports.default = defaultTask;
