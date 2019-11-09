const gulp = require('gulp');
const { series } = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

function serve() {
	bs.init({
		server: {
			baseDir: './build'
		},
		port: 8002,
		ui: {
			port: 8003
		}
	});
}

function style() {
	return gulp
		.src('./scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(sourcemaps.write())
		.pipe(concat('styles.css'))
		.pipe(autoprefix())
		.pipe(gulp.dest('./css'))
		.pipe(bs.stream());
}
function scripts() {
	return gulp.src(['./js/app.mjs']).pipe(gulp.dest('./js'));
}

function runBabel() {
	return gulp
		.src('./js/**/*.mjs')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('index.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build'));
}

function defaultTask() {
	bs.init({
		server: {
			baseDir: './'
		},
		port: 8000,
		ui: {
			port: 8001
		}
	});
	bs.init({
		server: {
			baseDir: './'
		},
		port: 8000,
		ui: {
			port: 8001
		}
	});
	scripts();
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./*.html').on('change', bs.reload);
	gulp.watch('./js/**/*.mjs').on('change', bs.reload);
}

function autoprefix() {
	return gulp
		.src('./css/styles.css')
		.pipe(
			autoprefixer({
				browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
				cascade: false
			})
		)
		.pipe(gulp.dest('build'));
}

function copy() {
	return gulp.src('./img/*').pipe(gulp.dest('build/img'));
}
exports.build = series(copy, runBabel);

exports.serve = serve;
exports.style = style;
exports.scripts = scripts;
exports.default = defaultTask;