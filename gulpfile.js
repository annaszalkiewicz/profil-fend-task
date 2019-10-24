const gulp = require('gulp');
const bs = require('browser-sync').create();

// Create Static server
gulp.task('serve', function() {
	bs.init({
		server: {
			baseDir: './'
		},
		port: 8000,
		ui: {
			port: 8001
		}
	});
});
