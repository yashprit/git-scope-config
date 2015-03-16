'use strict';
var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	nodeunit = require('gulp-nodeunit');
		
gulp.task('lint', function() {
	return gulp.src(['*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
	return gulp.src('test/*.js').pipe(nodeunit());
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('<%= jshint.js.src %>', ['lint']);
  gulp.watch(['<%= jshint.js.src %>', '<%= jshint.test.src %>'], ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch']);
