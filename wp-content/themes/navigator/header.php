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
	<base href="<?php get_bloginfo('wpurl')?>">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=1200, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <meta property="og:title" content="Healthy Communities Navigator"/>
    <meta property="og:description" content="Explore cross-sector grants, success stories & policy papers from the Healthy Communities Navigator"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Healthy Communities Navigator"/>
    <meta property="og:image" content="<?php get_stylesheet_directory_uri();?>'/assets/img/tfah-og.jpg"/>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> ng-app="navigatorApp">

<div ng-hide="(allGrantsDataLoaded && storyDataLoaded) || acfDataLoaded" class="preloader nga-default nga-stagger nga-fade">
    <!-- image here via CSS -->
</div>

<div id="page" class="hfeed site" >
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'navigator' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="container">
			<div class="row">
				<div class="col-xs-5">
					<div class="site-branding">
						<h1 class="site-title"><a href="#/" class="banner-logo"
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

