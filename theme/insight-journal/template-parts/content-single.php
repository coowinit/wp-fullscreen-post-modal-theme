<?php
$post_id = get_the_ID();
$payload = insight_journal_post_payload( $post_id );
$categories = $payload['categories'];
$tags = $payload['tags'];
$author = $payload['author'];
$related = $payload['related'];
$adjacent = $payload['adjacent'];
?>
<article <?php post_class(); ?>>
    <?php if ( ! empty( $payload['featured_image'] ) ) : ?>
        <div class="detail-cover"><img src="<?php echo esc_url( $payload['featured_image'] ); ?>" alt="<?php the_title_attribute(); ?>" /></div>
    <?php endif; ?>
    <header class="entry-header">
        <div class="detail-meta">
            <?php if ( ! empty( $categories ) ) : ?>
                <a class="chip" href="<?php echo esc_url( $categories[0]['url'] ); ?>"><?php echo esc_html( $categories[0]['name'] ); ?></a>
            <?php endif; ?>
            <span><?php echo esc_html( $payload['date'] ); ?></span>
            <span><?php printf( esc_html__( '阅读 %d 分钟', 'insight-journal' ), (int) $payload['reading_time'] ); ?></span>
        </div>
        <h1 class="detail-title"><?php the_title(); ?></h1>
        <?php if ( has_excerpt() ) : ?>
            <p class="detail-excerpt"><?php echo esc_html( get_the_excerpt() ); ?></p>
        <?php endif; ?>
    </header>

    <div class="detail-layout">
        <div>
            <div class="detail-content entry-content">
                <?php the_content(); ?>

                <section class="author-card">
                    <?php if ( ! empty( $author['avatar'] ) ) : ?>
                        <img class="author-avatar" src="<?php echo esc_url( $author['avatar'] ); ?>" alt="<?php echo esc_attr( $author['name'] ); ?>" />
                    <?php endif; ?>
                    <div>
                        <h4><?php echo esc_html( $author['name'] ); ?></h4>
                        <p><?php echo esc_html( $author['bio'] ? $author['bio'] : __( '这个作者还没有填写简介。', 'insight-journal' ) ); ?></p>
                        <a class="share-pill" href="<?php echo esc_url( $author['url'] ); ?>"><?php esc_html_e( '查看作者页面', 'insight-journal' ); ?></a>
                    </div>
                </section>

                <section class="share-block">
                    <h3 class="detail-subtitle"><?php esc_html_e( '分享这篇文章', 'insight-journal' ); ?></h3>
                    <div class="share-list">
                        <?php foreach ( $payload['share'] as $share_item ) : ?>
                            <?php if ( ! empty( $share_item['copy'] ) ) : ?>
                                <button type="button" class="share-pill js-copy-link" data-link="<?php echo esc_url( $share_item['url'] ); ?>"><?php echo esc_html( $share_item['label'] ); ?></button>
                            <?php else : ?>
                                <a class="share-pill" target="_blank" rel="noopener noreferrer" href="<?php echo esc_url( $share_item['url'] ); ?>"><?php echo esc_html( $share_item['label'] ); ?></a>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                </section>

                <?php if ( ! empty( $tags ) ) : ?>
                    <section class="share-block">
                        <h3 class="detail-subtitle"><?php esc_html_e( '标签', 'insight-journal' ); ?></h3>
                        <div class="inline-tags">
                            <?php foreach ( $tags as $tag ) : ?>
                                <a class="chip" href="<?php echo esc_url( $tag['url'] ); ?>"><?php echo esc_html( $tag['name'] ); ?></a>
                            <?php endforeach; ?>
                        </div>
                    </section>
                <?php endif; ?>

                <div class="adjacent-links">
                    <div class="adjacent-item">
                        <strong><?php esc_html_e( '上一篇', 'insight-journal' ); ?></strong>
                        <?php if ( ! empty( $adjacent['previous'] ) ) : ?>
                            <a class="share-pill" href="<?php echo esc_url( $adjacent['previous']['permalink'] ); ?>"><?php echo esc_html( $adjacent['previous']['title'] ); ?></a>
                        <?php else : ?>
                            <span><?php esc_html_e( '已经是最后一篇', 'insight-journal' ); ?></span>
                        <?php endif; ?>
                    </div>
                    <div class="adjacent-item">
                        <strong><?php esc_html_e( '下一篇', 'insight-journal' ); ?></strong>
                        <?php if ( ! empty( $adjacent['next'] ) ) : ?>
                            <a class="share-pill" href="<?php echo esc_url( $adjacent['next']['permalink'] ); ?>"><?php echo esc_html( $adjacent['next']['title'] ); ?></a>
                        <?php else : ?>
                            <span><?php esc_html_e( '已经是最新一篇', 'insight-journal' ); ?></span>
                        <?php endif; ?>
                    </div>
                </div>

                <?php if ( ! empty( $related ) ) : ?>
                    <section class="share-block related-section">
                        <h3 class="detail-subtitle"><?php esc_html_e( '相关文章', 'insight-journal' ); ?></h3>
                        <div class="related-grid">
                            <?php foreach ( $related as $item ) : ?>
                                <article class="related-card">
                                    <h4><?php echo esc_html( $item['title'] ); ?></h4>
                                    <p><?php echo esc_html( $item['excerpt'] ); ?></p>
                                    <a class="share-pill" href="<?php echo esc_url( $item['permalink'] ); ?>"><?php esc_html_e( '阅读这篇', 'insight-journal' ); ?></a>
                                </article>
                            <?php endforeach; ?>
                        </div>
                    </section>
                <?php endif; ?>
            </div>
        </div>

        <aside class="detail-sidebar">
            <section class="side-card">
                <h5><?php esc_html_e( '说明', 'insight-journal' ); ?></h5>
                <ul>
                    <li><?php esc_html_e( '直接访问单篇 URL 时，这里渲染的是普通 single.php 页面。', 'insight-journal' ); ?></li>
                    <li><?php esc_html_e( '从列表页点击进入时，同一篇文章会以弹层形式展示。', 'insight-journal' ); ?></li>
                    <li><?php esc_html_e( '分享按钮和相关文章在单篇页与弹层里都保持一致。', 'insight-journal' ); ?></li>
                </ul>
            </section>
        </aside>
    </div>
</article>
