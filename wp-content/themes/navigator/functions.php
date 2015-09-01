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

	/**
	 * Angular classes
	 */
	require get_template_directory() . '/inc/angular-enqueue.php';

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

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'navigator_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Angular App setup
	$angularScripts = new angular_enqueue();
	$angularScripts->init();


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

	// WP Comments
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', 'navigator_scripts' );