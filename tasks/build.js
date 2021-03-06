var gulp        = require('gulp');
var del         = require('del');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var buffer      = require('vinyl-buffer');
var runSequence = require('run-sequence');

// build project
gulp.task('build', function (cb) {
    runSequence('clean', 'assets', 'templates', 'browserify');
});

// build project in release mode
gulp.task('release', function (cb) {
    runSequence('clean', 'assets', 'templates', 'browserify:release');
});

// build src
gulp.task('browserify', function(cb){
	
 	return browserify('./client/app.js', {
             debug: true
         })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./server/www/'));

    cb();
});

// build:release
gulp.task('browserify:release', function(cb){
	
 	return browserify('./src/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./server/www/'));

    cb();
});

// watch files and run appropriate tasks
gulp.task('watch', function () {
    gulp.watch(['./assets/**'], ['assets']);
    gulp.watch(['./client/**/*.js'], ['browserify']);
    gulp.watch(['./client/**/*.html'], ['templates']);
});

// assets tasks
gulp.task('assets', function(cb){
    return gulp.src('./assets/**')
        .pipe(gulp.dest('./server/www'));
    cb();
});

// templates tasks
gulp.task('templates', function(cb){
    return gulp.src('./client/**/*.html')
        .pipe(gulp.dest('./server/www/'));
    cb();
});

// clean build folder task
gulp.task('clean', function(cb){
    del(['./server/www/'], {force: true}, cb);
});