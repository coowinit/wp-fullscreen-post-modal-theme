<?php
$post_id = get_the_ID();
$category = get_the_category();
$primary_category = ! empty( $category ) ? $category[0]->name : __( '未分类', 'insight-journal' );
?>
<article <?php post_class( 'post-card' ); ?>>
    <a class="post-thumb" data-modal-link data-post-id="<?php echo esc_attr( $post_id ); ?>" href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
        <?php if ( has_post_thumbnail() ) : ?>
            <?php the_post_thumbnail( 'large' ); ?>
        <?php else : ?>
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" alt="" />
        <?php endif; ?>
    </a>
    <div class="post-meta">
        <span class="chip"><?php echo esc_html( $primary_category ); ?></span>
        <span><?php echo esc_html( get_the_date( 'Y-m-d' ) ); ?></span>
    </div>
    <h4><a data-modal-link data-post-id="<?php echo esc_attr( $post_id ); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
    <p><?php echo esc_html( get_the_excerpt() ); ?></p>
    <footer>
        <span class="read-link"><?php esc_html_e( '继续阅读 →', 'insight-journal' ); ?></span>
        <a class="btn btn-secondary" data-modal-link data-post-id="<?php echo esc_attr( $post_id ); ?>" href="<?php the_permalink(); ?>"><?php esc_html_e( '查看详情', 'insight-journal' ); ?></a>
    </footer>
</article>
