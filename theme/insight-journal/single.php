<?php get_header(); ?>
<section class="site-shell content-entry">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php get_template_part( 'template-parts/content', 'single' ); ?>
        <?php comments_template(); ?>
    <?php endwhile; endif; ?>
</section>
<?php get_footer(); ?>
