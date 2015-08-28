<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package navigator
 */

?>

</div><!-- #content -->

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="container">
		<?php if ( is_active_sidebar( 'footer-widgets' ) ) { ?>
			<div class="widget-area" role="complementary">
				<div class="row">
					<?php dynamic_sidebar( 'footer-widgets' ); ?>
				</div>
			</div><!-- #secondary -->
		<?php } ?>

		<div class="site-info">
			<div class="row">
				<div class="col-xs-6">
					<ul class="list-inline">
						<li>
							<a href="<?php echo esc_url( __( 'https://tfah.com/', 'navigator' ) ); ?>">Privacy
								Policy</a>
						</li>
						<li>
							<a href="<?php echo esc_url( __( 'https://tfah.com/', 'navigator' ) ); ?>">Legal
								Information</a>
						</li>
						<li>
							<a href="<?php echo esc_url( __( 'https://tfah.com/', 'navigator' ) ); ?>">Contact TFAH</a>
						</li>
					</ul>
				</div>
				<div class="col-xs-6">
					<p class="text-right">Copyright &copy; <?php echo date("Y"); ?> Trust for America&acute;s Health. All Rights</p>
				</div>
			</div>
		</div>
		<!-- .site-info -->
	</div>
</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
