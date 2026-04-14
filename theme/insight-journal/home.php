<?php get_header(); ?>
<section class="site-shell">
    <div class="hero">
        <article class="hero-card">
            <div>
                <div class="hero-card__meta">
                    <span class="chip"><?php esc_html_e( '文章列表', 'insight-journal' ); ?></span>
                    <span><?php echo esc_html( wp_date( 'Y-m-d' ) ); ?></span>
                    <span><?php esc_html_e( '路由化详情弹层', 'insight-journal' ); ?></span>
                </div>
                <h2><?php bloginfo( 'name' ); ?></h2>
                <p><?php esc_html_e( '从列表点击文章时会以全屏详情弹层形式打开；直接访问文章链接时，则显示为普通单篇页面。', 'insight-journal' ); ?></p>
            </div>
            <div class="hero-card__image">
                <?php if ( have_posts() ) : the_post(); ?>
                    <?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'large' ); else : ?><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="" /><?php endif; ?>
                    <?php rewind_posts(); ?>
                <?php endif; ?>
            </div>
        </article>
    </div>

    <section>
        <div class="section-head">
            <div>
                <h3><?php esc_html_e( '最新文章', 'insight-journal' ); ?></h3>
                <p><?php esc_html_e( '卡片列表适合博客首页、分类页、归档页。', 'insight-journal' ); ?></p>
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
</section>
<?php get_template_part( 'template-parts/content', 'single-modal' ); ?>
<?php get_footer(); ?>
