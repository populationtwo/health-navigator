<?php

class angular_enqueue {

	function init() {
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_styles' ) );
	}

	function angular_scripts() {

		wp_enqueue_script( 'angular-plugins', get_template_directory_uri() . '/assets/dist/angular-plugins.js', array( 'jquery' ), null, false );


//		wp_enqueue_script( 'angular-core', get_template_directory_uri() . '/assets/bower_components/angular/angular.min.js', array( 'jquery' ), null, false );


//		wp_enqueue_script( 'angular-ui-router', get_template_directory_uri() . '/assets/bower_components/angular-ui-router/release/angular-ui-router.min.js' );
//		wp_enqueue_script( 'angular-ui-bootstrap', get_template_directory_uri() . '/assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js' );
//		wp_enqueue_script( 'lodash', get_template_directory_uri() . '/assets/bower_components/lodash/dist/lodash.min.js' );
//		wp_enqueue_script( 'angularjs-table', get_template_directory_uri() . '/assets/bower_components/ng-table/dist/ng-table.min.js' );
//		wp_enqueue_script( 'angularjs-table-export', get_template_directory_uri() . '/assets/bower_components/ng-table-export/ng-table-export.src.js' );
//		wp_enqueue_script( 'angularjs-ui-select', get_template_directory_uri() . '/assets/bower_components/ui-select/dist/select.js' );
//		wp_enqueue_script( 'angularjs-animate', get_template_directory_uri() . '/assets/bower_components/angular-animate/angular-animate.min.js' );

		//Map
//		wp_enqueue_script( 'd3', get_template_directory_uri() . '/assets/bower_components/d3/d3.min.js' );
//		wp_enqueue_script( 'topojson', get_template_directory_uri() . '/assets/bower_components/topojson/topojson.js' );
//		wp_enqueue_script( 'us-datamaps', get_template_directory_uri() . '/assets/bower_components/datamaps/dist/datamaps.usa.min.js' );
//		wp_enqueue_script( 'angularjs-datamaps', get_template_directory_uri() . '/assets/bower_components/angular-datamaps/dist/angular-datamaps.min.js' );

		//Define scripts in the gulpfile.js
//		wp_enqueue_script( 'app-scripts', get_template_directory_uri() . '/assets/dist/app.js',
//		array( 'angular-plugins' )
//		);
		wp_enqueue_script( 'app-scripts', get_template_directory_uri() . '/app/app.module.js',
			array( 'angular-plugins' )
		);
		wp_enqueue_script( 'app-view', get_template_directory_uri() . '/app/app.views.js' );

		wp_enqueue_script( 'app-routes', get_template_directory_uri() . '/app/app.routes.js' );
		wp_enqueue_script( 'app-lib', get_template_directory_uri() . '/app/app.library.js' );
		wp_enqueue_script( 'app-main-ctrl', get_template_directory_uri() . '/app/components/main/main.controller.js' );
		wp_enqueue_script( 'app-pagination', get_template_directory_uri() . '/app/shared/pagination/dirPagination.js' );
		wp_enqueue_script( 'app-stories-ctrl', get_template_directory_uri() . '/app/components/list/tabs/stories.controller.js' );
		wp_enqueue_script( 'app-resources-ctrl', get_template_directory_uri() . '/app/components/list/tabs/resources.controller.js' );
		wp_enqueue_script( 'app-table-ctrl', get_template_directory_uri() . '/app/components/list/tabs/grantTable.controller.js' );
		wp_enqueue_script( 'app-overview-list-ctrl', get_template_directory_uri() . '/app/components/list/grantOverViewList.controller.js' );
		wp_enqueue_script( 'app-filter', get_template_directory_uri() . '/app/app.filter.js' );
		wp_enqueue_script( 'app-grantee-detail-controller', get_template_directory_uri() . '/app/components/grantee/granteeDetail.controller.js' );
		wp_enqueue_script( 'app-grant-detail-controller', get_template_directory_uri() . '/app/components/grant/grantDetail.controller.js' );
		wp_enqueue_script( 'app-grantee-award-controller', get_template_directory_uri() . '/app/components/grantee-award/granteeAward.controller.js' );
		wp_enqueue_script( 'app-home-controller', get_template_directory_uri() . '/app/components/home/home.controller.js' );
		wp_enqueue_script( 'app-about-controller', get_template_directory_uri() . '/app/components/about/about.controller.js' );
		wp_enqueue_script( 'app-faq-controller', get_template_directory_uri() . '/app/components/faq/faq.controller.js' );

		wp_localize_script( 'app-scripts', 'appLocalized',
			array(
				'components'        => trailingslashit( get_template_directory_uri() ) . '/app/components/',
				'templateDirectory' => get_template_directory_uri() . '/',
				'homeUrl'           => get_home_url(),
				'nonce'             => wp_create_nonce( 'wp_rest' ),
				'is_admin'          => current_user_can( 'administrator' ),
				'environment'       => WP_ENV
			)
		);

	}

	function angular_styles() {
		wp_enqueue_style( 'angular-table-style', get_template_directory_uri() . '/assets/bower_components/ng-table/dist/ng-table.min.css', array(), null, 'all' );
		wp_enqueue_style( 'angular-ui-select-style', get_template_directory_uri() . '/assets/bower_components/ui-select/dist/select.min.css', array(), null, 'all' );
		wp_enqueue_style( 'angular-animate-css', get_template_directory_uri() . '/assets/bower_components/angular-animate-css/build/nga.min.css', array(), null, 'all' );
	}

}


?>