<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package navigator
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<base href="http://tfah-navigator.dev/">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> ng-app="navigatorApp">
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'navigator' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="container">
			<div class="row">
				<div class="col-xs-5">
					<div class="site-branding">
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="banner-logo"
						                          rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					</div>
					<!-- .site-branding -->
				</div>
				<div class="col-xs-7">
					<nav id="site-navigation" class="main-navigation" role="navigation">
						<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
					</nav>
					<!-- #site-navigation -->
				</div>

			</div>
		</div>

	</header>
	<!-- #masthead -->

	<div id="content" class="site-content page-wrapper">