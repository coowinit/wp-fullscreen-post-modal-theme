<?php
if ( post_password_required() ) {
    return;
}
?>
<section id="comments" class="comments-area">
    <?php if ( have_comments() ) : ?>
        <h2 class="comments-title"><?php printf( esc_html( _n( '%s 条评论', '%s 条评论', get_comments_number(), 'insight-journal' ) ), number_format_i18n( get_comments_number() ) ); ?></h2>
        <ol class="comment-list">
            <?php
            wp_list_comments(
                array(
                    'style'      => 'ol',
                    'short_ping' => true,
                    'avatar_size'=> 56,
                )
            );
            ?>
        </ol>
        <?php the_comments_navigation(); ?>
    <?php endif; ?>

    <?php
    comment_form(
        array(
            'class_submit' => 'submit',
            'title_reply'  => __( '留下你的评论', 'insight-journal' ),
        )
    );
    ?>
</section>
