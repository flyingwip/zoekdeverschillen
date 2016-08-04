<?php
/**
 * Template Name: Start Template
 */
?>

<?php while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/content', 'start'); ?>
<?php endwhile; ?>
