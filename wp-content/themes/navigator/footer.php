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


<footer id="colophon" class="site-footer" role="contentinfo">
    <div class="container">
        <?php if ( is_active_sidebar( 'footer-widgets' ) ) { ?>
            <div class="widget-area" role="complementary">
                <div class="row">
                    <?php dynamic_sidebar( 'footer-widgets' ); ?>
                </div>
            </div><!-- #secondary -->
        <?php } ?>

        <?php if ( get_field( 'footer_content', 'option' ) ): ?>

            <div class="widget-area" role="complementary">
                <div class="row">
                    <?php while ( the_repeater_field( 'footer_content', 'option' ) ): ?>
                        <div class="col-xs-4">
                            <aside id="text-4" class="widget widget_text">
                                <?php if ( get_sub_field( 'footer_content_heading', 'option' ) ) { ?>
                                    <h2 class="widget-title"><?php echo the_sub_field( 'footer_content_heading', 'option' ); ?></h2>
                                <?php } ?>
                                <div class="textwidget">
                                    <?php echo the_sub_field( 'footer_content_text', 'option' ); ?>

                                    <p>
                                        <?php if ( get_sub_field( 'footer_content_button_url', 'option' ) && get_sub_field( 'footer_content_button_text', 'option' ) ) { ?>
                                            <a href="<?php echo the_sub_field( 'footer_content_button_url', 'option' ); ?>"
                                               class="btn btn-basic large" target="_blank"><?php echo the_sub_field( 'footer_content_button_text', 'option' ); ?></a>
                                        <?php } ?>
                                    </p>
                                </div>
                            </aside>
                        </div>
                    <?php endwhile; ?>
                </div>
            </div>
        <?php endif; ?>

        <!-- #secondary -->

        <div class="site-info">
            <div class="row">
                <div class="col-xs-6">
                    <?php wp_nav_menu( array(
                            'theme_location' => 'footer',
                            'menu_id'        => '',
                            'menu_class'     => 'list-inline',
                            'depth'          => 1,
                    ) ); ?>
                </div>
                <div class="col-xs-6">

                    <p class="text-right">
                        Copyright &copy; <?php echo date( "Y" ); ?> <?php echo the_field( 'copyright_note', 'option' ); ?></p>
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
