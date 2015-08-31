<?php
/**
 * Template Name: Toolkit Page
 * The template for Navigator Toolkit.
 *
 * @package navigator
 */


get_header(); ?>
<div class="container">
	<div class="row">
		<div class="col-xs-12">
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title page-title">', '</h1>' ); ?>
			</header>
			<!-- .entry-header -->
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
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

					<section class="state-map">
						<div class="state-map__content">
							<img src="http://placehold.it/1170x600" alt="">
						</div>
						<div class="state-map__filter">
							<header>
								<h1 class="state-map__filter__header">Refine Your Search</h1>
								<a href="">Clear All Filters</a>
							</header>
							<div class="row">
								<div class="col-xs-6">
									<select class="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
								<div class="col-xs-2">
									<select class="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
								<div class="col-xs-2">
									<select class="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
								<div class="col-xs-2">
									<select class="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
							</div>
						</div>
					</section>
					<section class="tool-results">
						<div class="tool-results__nav">

							<ul class="nav nav-pills" role="tablist">
								<li role="presentation" class="active"><a href="#">Grants <span class="badge">80</span></a>
								</li>
								<li role="presentation"><a href="#">Stories <span class="badge">13</span></a></li>
								<li role="presentation"><a href="#">Resources <span class="badge">8</span></a></li>
							</ul>
						</div>

						<div class="view-grants">
							<table class="table table-striped">
								<thead>
								<tr>
									<th>Grant Name</th>
									<th>Grantee Organization</th>
									<th>Year</th>
									<th>Amount</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>CDC: REACH</td>
									<td>"EvidenceNOW"</td>
									<td>2015</td>
									<td>$100,000</td>

								</tr>
								<tr>
									<td>CMS: Healthcare Innovation Awards</td>
									<td>State Public Health Actions to Prevent and Control Diabetes</td>
									<td>2015</td>
									<td>$22,500</td>

								</tr>
								<tr>
									<td>CMS: Healthcare Innovation Awards</td>
									<td>National Public Health Improvement Initiative (NPHII)</td>
									<td>2015</td>
									<td>$55,000</td>

								</tr>

								<tr>
									<td>DOE: Promise Neighborhoods</td>

									<td>Chronic Disease Self-Management Education</td>
									<td>2015</td>
									<td>$10,000</td>

								</tr>


								</tbody>
							</table>
							<footer>
								<div class="row">
									<div class="col-xs-6">
										<a href="">Export grant data to spreadsheet</a>

									</div>
									<div class="col-xs-6 text-right">
										<nav>
											<ul class="pagination">
												
												<li><a href="#">1</a></li>
												<li><a href="#">2</a></li>
												<li><a href="#">3</a></li>
												<li><a href="#">4</a></li>
												<li><a href="#">5</a></li>
												<li>
													<a href="#" aria-label="Next">
														<span aria-hidden="true">&raquo;</span>
													</a>
												</li>
											</ul>
										</nav>


									</div>
								</div>
							</footer>
						</div>


					</section>


				</main>
				<!-- #main -->
			</div>
			<!-- #primary -->
		</div>
	</div>
</div>
<?php get_footer(); ?>
