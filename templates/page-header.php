<?php use Roots\Sage\Titles; ?>

<?php
global $post;
?>

<div class="page-header">
  
  <!-- clickable logo -->
  <a href="<?= esc_url(home_url('/')); ?>"><div class="click_logo"></div></a>

  
  <?php
  	if ( has_post_thumbnail() ) {
	    //echo get_the_post_thumbnail();
		$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' );
		echo '<img src="'. $image[0]. '" alt="Landal Greenparks">';
	}
  ?>
  <h1><?= Titles\title(); ?></h1>
</div>
