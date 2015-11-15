//TODO: Uglify and minify scripts

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    basePath = ['assets'],
    scssPath = ['assets/scss'],
    cssPath = 'assets/css',
    jsPath = ['assets/js'],
    bowerPath = ['assets/bower_components'],
    imagesPath = ['assets/img'],
    appPath = ['app'];


gulp.task('sass', function () {
    return gulp.src(scssPath + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber()) // prevents compilation errors from killing gulp
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bowerPath + '/bootstrap-sass/assets/stylesheets'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssPath))
        .pipe(livereload());

})

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(scssPath + '/**/*.scss', ['sass']);
    gulp.watch(appPath + '/**/*.js', ['js']);
});


gulp.task('vendor', function () {
    return gulp.src([
        bowerPath + '/angular/angular.min.js',
        bowerPath + '/angular-ui-router/release/angular-ui-router.min.js',
        bowerPath + '/angular-bootstrap/ui-bootstrap-tpls.min.js',
        //bowerPath + '/lodash/dist/lodash.min.js',
        bowerPath + '/lodash/dist/lodash.min.js',
        bowerPath + '/ng-table/dist/ng-table.min.js',
        bowerPath + '/ng-table-export/ng-table-export.src.js',
        bowerPath + '/ui-select/dist/select.js',
        bowerPath + '/angular-animate/angular-animate.min.js',
        bowerPath + '/d3/d3.min.js',
        bowerPath + '/topojson/topojson.js',
        bowerPath + '/datamaps/dist/datamaps.usa.min.js',
        bowerPath + '/angular-datamaps/dist/angular-datamaps.min.js',
        bowerPath + '/angular-clipboard/angular-clipboard.js',
        bowerPath + '/angular-socialshare/dist/angular-socialshare.min.js'
    ])
        //.pipe(sourcemaps.init())
        //.pipe(plumber())
        .pipe(concat('angular-plugins.js'))
        .pipe(ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(uglify({
            mangle: true
        }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(basePath + '/dist'));
})


//gulp.task('js', function () {
//    return gulp.src([
//        //scripts need to be defined to prevent conflict with wp_localize_script
//        appPath + '/app.module.js',
//        appPath + '/app.views.js',
//        appPath + '/app.routes.js',
//        appPath + '/app.library.js',
//        appPath + '/components/main/main.controller.js',
//        appPath + '/shared/pagination/dirPagination.js',
//        appPath + '/components/list/tabs/stories.controller.js',
//        appPath + '/components/list/tabs/resources.controller.js',
//        appPath + '/components/list/tabs/grantTable.controller.js',
//        appPath + '/app.filter.js',
//        appPath + '/components/grantee/granteeDetail.controller.js',
//        appPath + '/components/grantee/grantDetail.controller.js',
//        appPath + '/components/grantee/granteeAward.controller.js',
//        appPath + '/components/home/home.controller.js',
//        appPath + '/components/about/about.controller.js',
//        appPath + '/components/faq/faq.controller.js'
//    ])
//        .pipe(sourcemaps.init())
//        .pipe(plumber())
//        .pipe(concat('app.js'))
//        .pipe(ngAnnotate({
//            add: true,
//            single_quotes: true
//        }))
//        .pipe(uglify({
//            mangle: true
//        }))
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest(basePath + '/dist'));
//})


gulp.task('lint', function () {
    gulp.src([appPath + '/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Default Task
gulp.task('default', ['sass', 'watch']);
gulp.task('build', ['lint', 'vendor']);