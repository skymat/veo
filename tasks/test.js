var gulp       = require('gulp');
var jshint     = require('gulp-jshint');

module.exports = gulp.task('test', function(cb) {

  	return gulp.src('./client/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('jshint-stylish'));

    cb();
});