<?php get_header(); ?>
<section class="site-shell">
    <div class="section-head">
        <div>
            <h1 class="archive-title"><?php esc_html_e( '最新文章', 'insight-journal' ); ?></h1>
            <p class="archive-description"><?php esc_html_e( '这是 index.php 兜底模板。', 'insight-journal' ); ?></p>
        </div>
    </div>
    <div class="post-grid">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <?php get_template_part( 'template-parts/content', 'card' ); ?>
        <?php endwhile; else : ?>
            <p><?php esc_html_e( '暂无文章。', 'insight-journal' ); ?></p>
        <?php endif; ?>
    </div>
</section>
<?php get_template_part( 'template-parts/content', 'single-modal' ); ?>
<?php get_footer(); ?>
