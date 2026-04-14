<?php get_header(); ?>
<section class="site-shell">
    <div class="section-head">
        <div>
            <h1 class="archive-title"><?php the_archive_title(); ?></h1>
            <?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
        </div>
    </div>
    <div class="post-grid">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <?php get_template_part( 'template-parts/content', 'card' ); ?>
        <?php endwhile; else : ?>
            <p><?php esc_html_e( '没有找到文章。', 'insight-journal' ); ?></p>
        <?php endif; ?>
    </div>
</section>
<?php get_template_part( 'template-parts/content', 'single-modal' ); ?>
<?php get_footer(); ?>
