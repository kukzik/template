'use strict';

var gulp         = require('gulp'),
	browserSync  = require('browser-sync').create(),
	reload       = browserSync.reload,
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	stylus       = require('gulp-stylus'),
	csslint      = require('gulp-csslint'),
	autoPrefixer = require('gulp-autoprefixer'),
	rigger       = require('gulp-rigger');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cmq         = require('gulp-merge-media-queries'),
	cleanCss    = require('gulp-clean-css'),
	browserify  = require('gulp-browserify'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	concatCss   = require('gulp-concat-css'),
	jade        = require('gulp-jade'),
	imageMin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	cache       = require('gulp-cache'),
	notify      = require('gulp-notify'),
	runSequence = require('run-sequence'),
	gulpif      = require('gulp-if'),
	clean       = require('gulp-clean'),
	svgSprite   = require('gulp-svg-sprite');

gulp.task('stylus',function(){
	return gulp.src(['src/styles/main.styl'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(stylus({
			'include css': true
		}))
		.pipe(autoPrefixer({cascade: false}))
		.pipe(csslint.formatter("compact"))
		.pipe(concatCss('main.css', {rebaseUrls: false}))
		.pipe(gulp.dest('htdocs/css'))
		.pipe(cleanCss())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('htdocs/css'))
		.pipe(browserSync.reload())
		.pipe(notify({
			title: 'Сообщение Gulp',
			message: 'stylus task завершен',
			onLast: true
		}))
});

gulp.task('js',function(){
	return gulp.src('src/js/main.js')
			.pipe(plumber({
				handleError: function (err) {
					console.log(err);
					this.emit('end');
				}
			}))
			.pipe(rigger())
			.pipe(concat('main.js'))
			.pipe(gulp.dest('htdocs/js'))
			.pipe(uglify())
			.pipe(rename({ suffix: '.min' }))
			.pipe(gulp.dest('htdocs/js'))
			.pipe(browserSync.reload({stream:true}))
			.pipe(notify({
				title: 'Сообщение Gulp',
				message: 'js task завершен',
				onLast: true
			}))
});

var page = '*';

gulp.task('jade',function(){
	return gulp.src([
			'src/html/'+page+'.jade',
			'!src/html/_'+page+'.jade'
		])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(rigger())
		.pipe(gulp.dest('htdocs/'))
		.pipe(reload({stream:true}))
		.pipe(notify({
			title: 'Сообщение Gulp',
			message: 'jade task завершен',
			onLast: true
		}))
});

gulp.task('mixins',function(){
	return gulp.src('src/html/mixins/*.jade')
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(concat('_mixins.jade'))
		.pipe(gulp.dest('src/html'))
		.pipe(reload({stream:true}))
		.pipe(notify({
			title: 'Сообщение Gulp',
			message: 'mixins task завершен',
			onLast: true
		}))
});

gulp.task('img',function(){
	return gulp.src([
			'!src/img/svg/*',
			'src/img/**/*'
		])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(imageMin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest('htdocs/img/'))
		.pipe(reload({stream:true}))
		.pipe(notify({
			title: 'Сообщение Gulp',
			message: 'img task завершен',
			onLast: true
		}));
});


gulp.task('svgSprite', function () {
	return gulp.src('src/img/svg/**/*')
		.pipe(svgSprite({
				mode: {
					stack: {
						sprite: "../sprite.svg"
					}
				},
			}
		))
		.pipe(gulp.dest('src/html/'))
		.pipe(reload({stream:true}))
		.pipe(notify({
			title: 'Сообщение Gulp',
			message: 'svgSprite task завершен',
			onLast: true
		}));
});


gulp.task('fonts', function() {
	gulp.src('src/fonts/*')
		.pipe(plumber())
		.pipe(gulp.dest('htdocs/fonts'));
});

gulp.task('files', function() {
	gulp.src('src/files/*')
		.pipe(plumber())
		.pipe(gulp.dest('htdocs/files'));
});

gulp.task('w',function(){
	browserSync.init({
		server: "htdocs/"
	});
	gulp.watch('src/js/**/*.js',['js']);
	gulp.watch('src/styles/**/*.styl',['stylus']);
	gulp.watch('src/html/mixins/*.jade',['mixins']);
	gulp.watch('src/html/**/*.jade',['jade']);
	gulp.watch('src/img/**/*',['img']);
	gulp.watch('src/img/svg/**/*',['svgSprite']);
	gulp.watch('src/fonts/*',['fonts']);
	gulp.watch('src/files/*',['files']);
});


gulp.task('clean', function () {
	return gulp.src(['htdocs/'], {read: false})
		.pipe(clean())
		.pipe(notify({
			title: 'Сообщение Gulp',
			message: 'clean task завершен'
		}));
});


gulp.task('build',
	['stylus', 'js', 'mixins', 'jade', 'img', 'svgSprite', 'fonts', 'files'], function(){
		console.log('build complete');
	}
);
