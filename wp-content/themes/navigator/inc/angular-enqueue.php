<?php

class angular_enqueue {

	function init() {
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_styles' ) );
	}

	function angular_scripts() {

		wp_enqueue_script( 'angular-core', get_template_directory_uri() . '/assets/bower_components/angular/angular.min.js', array( 'jquery' ), null, false );
		wp_enqueue_script( 'angular-ui-router', get_template_directory_uri() . '/assets/bower_components/angular-ui-router/release/angular-ui-router.min.js' );
		wp_enqueue_script( 'app-scripts', get_template_directory_uri() . '/app/app.module.js',
			array( 'angular-core', 'angular-ui-router' )
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