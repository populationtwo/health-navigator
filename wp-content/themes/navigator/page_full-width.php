<?php
/**
 * Template Name: Full Width Page
 * The template for pages without sidebar.
 *
 * @package navigator
 */


get_header(); ?>
	<div class="container">
		<div class="row">
			<div class="col-xs-8">
				<div id="primary" class="content-area">
					<main id="main" class="site-main" role="main">

						<?php while ( have_posts() ) : the_post(); ?>

							<?php get_template_part( 'template-parts/content', 'page' ); ?>

							<?php
								// If comments are open or we have at least one comment, load up the comment template.
								if ( comments_open() || get_comments_number() ) :
									comments_template();
								endif;
							?>

						<?php endwhile; // End of the loop. ?>

					</main><!-- #main -->
				</div><!-- #primary -->
			</div>
			<?php get_sidebar(); ?>
		</div>
	</div>
<?php get_footer(); ?>