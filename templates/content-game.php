
<!-- 

ALL slides are in the slideshiw options
-->



<!-- The slideshow -->
<div class="brainwash">

<?php
$slides =  array_reverse(get_field('afbeeldingen', 'option'));
$slides = array_reverse($slides[0]);
foreach ($slides as $key => $slide) {
	echo '<img src="'. $slide. '" alt="Landau Hotspots game">';
}

?>
</div>




<?php the_content(); ?>
<?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
