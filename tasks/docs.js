var gulp  = require('gulp');
var docco = require("gulp-docco");

gulp.task('docs', function () {
	return gulp.src("./client/**/*.js")
	  .pipe(docco())
	  .pipe(gulp.dest('./docs/code'));
});