<?php
/**
 * The sidebar containing the main widget area.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package navigator
 */

if ( ! is_active_sidebar( 'sidebar-widgets' ) ) {
	return;
}
?>
<div class="col-xs-4">
	<div id="secondary" class="widget-area" role="complementary">
		<?php dynamic_sidebar( 'sidebar-widgets' ); ?>
	</div><!-- #secondary -->
</div>