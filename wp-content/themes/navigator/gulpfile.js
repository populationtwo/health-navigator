var gulp = require('gulp'),
//var uglify = require( 'gulp-uglify' );
//var usemin = require( 'gulp-usemin' );
//var jshint = require( 'gulp-jshint' )
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');


var basePath = ['assets'];
var scssPath = ['assets/scss'];
var cssPath = 'assets/css';
var jsPath = ['assets/js'];
var bowerPath = ['assets/bower_components'];
var imagesPath = ['assets/img'];

gulp.task('sass', function () {
    gulp.src(scssPath + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', includePaths: bowerPath + '/bootstrap-sass/assets/stylesheets'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(cssPath))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(scssPath + '/**/*.scss', ['sass']);
});
// TODO: watch js, jshint, uglify, livereload


//gulp.task( 'lint', function () {
//    gulp.src( ['./app/partials/**/*.js', './app/index.js'] )
//        .pipe( jshint() )
//        .pipe( jshint.reporter( 'default' ) )
//} );


// Default Task
gulp.task('default', ['sass', 'watch']);
//gulp.task( 'build', ['lint', 'usemin'] );