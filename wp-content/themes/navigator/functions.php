<?php
/**
 * navigator functions and definitions.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package navigator
 */

if ( ! function_exists( 'navigator_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function navigator_setup() {


	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'navigator' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'navigator_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // navigator_setup
add_action( 'after_setup_theme', 'navigator_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function navigator_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'navigator_content_width', 640 );
}
add_action( 'after_setup_theme', 'navigator_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function navigator_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'navigator' ),
		'id'            => 'sidebar-widgets',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
	register_sidebar( array(
		'name'          => esc_html__( 'Footer', 'navigator' ),
		'id'            => 'footer-widgets',
		'description'   => '',
		'before_widget' => '<div class="col-xs-4"><aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside></div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'navigator_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function navigator_scripts() {
	wp_enqueue_style( 'custom-style', get_template_directory_uri() . '/assets/css/style.css' );
	wp_enqueue_style( 'navigator-style', get_stylesheet_uri() );
	wp_enqueue_script( 'navigator-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), '20120206', true );
	wp_enqueue_script( 'navigator-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '20130115', true );
	wp_enqueue_script( 'typekit', get_template_directory_uri() . '/assets/js/typekit.js', array(), '', true );

	// Angular App setup
	wp_enqueue_script( 'angularjs', get_template_directory_uri() . '/assets/bower_components/angular/angular.min.js' );
	wp_enqueue_script( 'angularjs-route', get_template_directory_uri() . '/assets/bower_components/angular-route/angular-route.min.js' );
	wp_enqueue_script('app-scripts', get_template_directory_uri() . '/app/app.module.js',
		array( 'angularjs', 'angularjs-route' )
	);
	wp_localize_script(
		'app-scripts',
		'appLocalized',
		array(
			'components' => trailingslashit( get_template_directory_uri() ) . '/app/components/'
		)
	);

	// WP Comments
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', 'navigator_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
