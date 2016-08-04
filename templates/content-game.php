<!-- The slideshow -->
<div class="brainwash">

	<img src="<?php echo get_template_directory_uri(); ?>/temp/New-York-City-5.jpg" alt="">
	<img src="<?php echo get_template_directory_uri(); ?>/temp/New-York-City-4.jpg" alt="">
	<img src="<?php echo get_template_directory_uri(); ?>/temp/New-York-City-3.jpg" alt="">
	<img src="<?php echo get_template_directory_uri(); ?>/temp/New-York-City-2.jpg" alt="">
	<img src="<?php echo get_template_directory_uri(); ?>/temp/New-York-City-1.jpg" alt="">

</div>




<?php the_content(); ?>
<?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
