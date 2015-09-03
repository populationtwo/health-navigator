var gulp = require('gulp'),
//var uglify = require( 'gulp-uglify' );
//var usemin = require( 'gulp-usemin' );
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),


    basePath = ['assets'],
    scssPath = ['assets/scss'],
    cssPath = 'assets/css',
    jsPath = ['assets/js'],
    bowerPath = ['assets/bower_components'],
    imagesPath = ['assets/img'],
    appPath = ['app'];

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
// TODO: watch js, jshint, uglify


gulp.task('lint', function () {
    gulp.src([appPath + '**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});


// Default Task
gulp.task('default', ['sass', 'watch']);
//gulp.task( 'build', ['lint', 'usemin'] );