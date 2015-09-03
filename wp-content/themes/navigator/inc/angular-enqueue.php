<?php

class angular_enqueue {

	function init() {
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_styles' ) );
	}

	function angular_scripts() {

		wp_enqueue_script( 'angular-core', get_template_directory_uri() . '/assets/bower_components/angular/angular.min.js', array( 'jquery' ), null, false );
		wp_enqueue_script( 'angular-ui-router', get_template_directory_uri() . '/assets/bower_components/angular-ui-router/release/angular-ui-router.min.js' );

		//Angular UI Bootstap
		wp_enqueue_script( 'angular-ui-bootstrap', get_template_directory_uri() . '/assets/bower_components/angular-bootstrap/ui-bootstrap.min.js' );
		wp_enqueue_script( 'angular-ui-bootstrap-template', get_template_directory_uri() . '/assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js' );

		//Map
		wp_enqueue_script( 'd3', get_template_directory_uri() . '/assets/bower_components/d3/d3.min.js' );
		wp_enqueue_script( 'topojson', get_template_directory_uri() . '/assets/bower_components/topojson/topojson.js' );
		wp_enqueue_script( 'datamaps', get_template_directory_uri() . '/assets/bower_components/datamaps/dist/datamaps.usa.min.js' );
		wp_enqueue_script( 'angular-datamaps', get_template_directory_uri() . '/assets/bower_components/angular-datamaps/dist/angular-datamaps.min.js' );


		wp_enqueue_script( 'app-scripts', get_template_directory_uri() . '/app/app.module.js',
			array( 'angular-core', 'angular-ui-router', 'angular-ui-bootstrap', 'angular-ui-bootstrap-template', 'angular-datamaps' )
		);
		wp_localize_script( 'app-scripts', 'appLocalized',
			array(
				'components'         => trailingslashit( get_template_directory_uri() ) . '/app/components/',
//				'api_url'            => rest_get_url_prefix() . '/wp/v2/',
				'template_directory' => get_template_directory_uri() . '/',
				'nonce'              => wp_create_nonce( 'wp_rest' ),
				'is_admin'           => current_user_can( 'administrator' )

			)
		);

	}

	function angular_styles() {
//		wp_enqueue_style( 'angularStyles', get_template_directory_uri() . '/build/css/styles.css', array(), null, 'all' );
	}

}


?>