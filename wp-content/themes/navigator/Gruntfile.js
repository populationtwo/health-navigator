module.exports = function (grunt) {
	'use strict';
	// load all grunt tasks matching the `grunt-*` pattern
	require( 'load-grunt-tasks' )( grunt );
	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		//path variables
		app: {
			src: {
				base  : 'assets',
				scss  : 'assets/scss',
				css   : 'assets/css',
				js    : 'assets/js',
				bower : 'assets/bower_components',
				images: 'assets/img'
			}
		},

		watch  : {
			css: {
				files  : ['<%= app.src.scss %>/**/*.scss', '<%= app.src.scss %>/*.scss'],
				tasks  : ['compass'],
				options: {
					debounceDelay: 500
				}
			},
			js : {
				files: '<%= jshint.all %>',
				tasks: ['jshint', 'uglify']
			}
		},

		//compass
		compass: {
			dev : {
				options: {
					sourcemap  : true,
					sassDir    : '<%= app.src.scss %>',
					cssDir     : '<%= app.src.css %>/min',
					outputStyle: 'compressed'
				}
			},
			dist: {
				options: {
					sourcemap  : false,
					sassDir    : '<%= app.src.scss %>',
					cssDir     : '<%= app.src.css %>/uncompressed',
					outputStyle: 'nested'
				}
			}
		},

		// javascript linting with jshint
		jshint : {
			options: {
				jshintrc: '.jshintrc',
				'force' : true
			},
			all    : [
				'Gruntfile.js',
				'<%= app.src.js %>/app.js'
			]
		},

		// uglify to concat, minify, and make source maps
		//uglify : {
		//	dist  : {
		//		options: {
		//			sourceMap       : 'assets/js/build/app.js.map',
		//			sourceMappingURL: 'app.js.map',
		//			sourceMapPrefix : 2
		//		},
		//		files  : {
		//			'<%= app.src.js %>/build/app.min.js': ['assets/js/app.js']
		//		}
		//	},
		//	vendor: {
		//		options: {
		//			sourceMap       : '<%= app.src.js %>/vendor.js.map',
		//			sourceMappingURL: 'vendor.js.map',
		//			sourceMapPrefix : 2
		//		},
		//		files  : {
		//			'<%= app.src.js %>/build/vendor.min.js': [
		//				'<%= app.src.bower %>/modernizr/modernizr.js',
		//				'<%= app.src.bower %>/foundation/js/foundation.js',
		//				'<%= app.src.bower %>/jquery-ui/jquery-ui.js',
		//				'<%= app.src.bower %>/video.js/dist/video-js/video.js',
		//				'<%= app.src.bower %>/bigvideo.js/lib/bigvideo.js',
		//				'<%= app.src.bower %>/owlcarousel/owl-carousel/owl.carousel.js',
		//				'<%= app.src.bower %>/gsap/src/uncompressed/TweenMax.js',
		//				'<%= app.src.bower %>/flexslider/jquery.flexslider.js',
		//				'<%= app.src.js %>/uisearch.js'
		//			]
		//		}
		//	}
        //
		//}

		// delete build directory
		//clean  : {
		//	options: {
		//		force: true
		//	},
		//	dist   : ['../dist']
		//},

		// copy files to build directory
		//copy   : {
		//	build: {
		//		files: [
		//			// includes files within path
		//			{
		//				cwd   : '../',
		//				src   : ['camden/**/*', '!camden/node_modules/**', '!camden/.sass-cache/**'],
		//				dest  : '../dist',
		//				expand: true,
		//				filter: 'isFile'
		//			},
		//			{
		//				cwd   : '../',
		//				src   : ['camden-child/**/*'],
		//				dest  : '../dist',
		//				expand: true,
		//				filter: 'isFile'
		//			}
        //
		//		]
		//	}
		//}

	} );


// Default task.
	grunt.registerTask( 'default', ['compass:dev', 'uglify', 'watch'] );

	grunt.registerTask( 'build', ['clean', 'compass', 'uglify', 'copy'] );

	grunt.util.linefeed = '\n';
};