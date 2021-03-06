'use strict';

let gulp = require('gulp');
let concat = require('gulp-concat');
let minifyCSS = require('gulp-minify-css');
let browserify = require('browserify');
let vsource = require("vinyl-source-stream");
let babel = require('babelify');

let source = {
	appjs: './ui-src/app.js',
	js: ['./ui-src/**/*.js'],
	libjs: ['./ui-src/lib/primus/primus.js'],
	appcss: ['./ui-src/css/*.css'],
	apphtml: ['./ui-src/**/*.html'],
	appimg: ['./ui-src/img/*']
};

gulp.task('appjs', function(){
	browserify({ debug: true })
		.transform(babel.configure({stage: 0}))
		.require(source.appjs, { entry: true })
		.bundle()
		.pipe(vsource('app.min.js'))
		.pipe(gulp.dest('./ui-dist'));
});

gulp.task('libjs', function () {
	gulp.src(source.libjs)
		.pipe(concat('lib.min.js'))
		.pipe(gulp.dest('./ui-dist'))
});

gulp.task('appcss', function () {
	gulp.src(source.appcss)
		.pipe(concat('app.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./ui-dist'))
});

gulp.task('apphtml', function() {
	gulp.src(source.apphtml)
		.pipe(gulp.dest('./ui-dist'));
	gulp.src(source.appimg, {base: 'ui-src'})
		.pipe(gulp.dest('./ui-dist'));
});

gulp.task('watch', function() {
	gulp.watch(source.appcss, ['appcss']);
	gulp.watch(source.apphtml, ['apphtml']);
	gulp.watch(source.js, ['appjs']);
});

gulp.task('default', ['appjs', 'libjs', 'appcss', 'apphtml', 'watch']);

gulp.task('nw', ['appjs', 'libjs', 'appcss', 'apphtml']);
