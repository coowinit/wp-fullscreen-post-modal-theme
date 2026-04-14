<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function insight_journal_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'custom-logo' );
    register_nav_menus(
        array(
            'primary' => __( 'Primary Menu', 'insight-journal' ),
        )
    );
}
add_action( 'after_setup_theme', 'insight_journal_setup' );

function insight_journal_enqueue_assets() {
    wp_enqueue_style( 'insight-journal-theme', get_template_directory_uri() . '/assets/css/theme.css', array(), '1.5.0' );

    if ( is_home() || is_archive() || is_search() || is_front_page() ) {
        wp_enqueue_script( 'insight-journal-modal-route', get_template_directory_uri() . '/assets/js/modal-route.js', array(), '1.5.0', true );
        wp_localize_script(
            'insight-journal-modal-route',
            'InsightJournal',
            array(
                'restUrl' => esc_url_raw( rest_url( 'insight/v1/post/' ) ),
                'homeUrl' => esc_url_raw( home_url( '/' ) ),
                'strings' => array(
                    'loading' => __( '正在加载文章详情…', 'insight-journal' ),
                    'error'   => __( '加载失败，请稍后重试。', 'insight-journal' ),
                    'retry'   => __( '重试', 'insight-journal' ),
                    'open'    => __( '打开原文', 'insight-journal' ),
                    'copy'    => __( '复制链接', 'insight-journal' ),
                    'copied'  => __( '已复制链接', 'insight-journal' ),
                    'share'   => __( '分享这篇文章', 'insight-journal' ),
                    'related' => __( '相关文章', 'insight-journal' ),
                    'prev'    => __( '上一篇', 'insight-journal' ),
                    'next'    => __( '下一篇', 'insight-journal' ),
                ),
            )
        );
    }

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'insight_journal_enqueue_assets' );

function insight_journal_reading_time( $post_content ) {
    $plain = wp_strip_all_tags( (string) $post_content );
    $words = str_word_count( $plain );
    $minutes = (int) ceil( max( 1, $words ) / 220 );
    return max( 1, $minutes );
}

function insight_journal_featured_image_url( $post_id, $size = 'large' ) {
    if ( has_post_thumbnail( $post_id ) ) {
        $url = get_the_post_thumbnail_url( $post_id, $size );
        if ( $url ) {
            return $url;
        }
    }
    return '';
}

function insight_journal_share_links( $post ) {
    $permalink = get_permalink( $post );
    $title     = get_the_title( $post );

    return array(
        array(
            'label' => __( '复制链接', 'insight-journal' ),
            'url'   => $permalink,
            'copy'  => true,
        ),
        array(
            'label' => 'X / Twitter',
            'url'   => 'https://twitter.com/intent/tweet?url=' . rawurlencode( $permalink ) . '&text=' . rawurlencode( $title ),
            'copy'  => false,
        ),
        array(
            'label' => 'Facebook',
            'url'   => 'https://www.facebook.com/sharer/sharer.php?u=' . rawurlencode( $permalink ),
            'copy'  => false,
        ),
        array(
            'label' => 'LinkedIn',
            'url'   => 'https://www.linkedin.com/sharing/share-offsite/?url=' . rawurlencode( $permalink ),
            'copy'  => false,
        ),
    );
}

function insight_journal_author_data( $author_id ) {
    return array(
        'name'  => get_the_author_meta( 'display_name', $author_id ),
        'bio'   => get_the_author_meta( 'description', $author_id ),
        'url'   => get_author_posts_url( $author_id ),
        'avatar'=> get_avatar_url( $author_id, array( 'size' => 160 ) ),
    );
}

function insight_journal_related_posts( $post_id, $limit = 3 ) {
    $category_ids = wp_get_post_categories( $post_id );
    $args = array(
        'post_type'           => 'post',
        'post_status'         => 'publish',
        'post__not_in'        => array( $post_id ),
        'posts_per_page'      => $limit,
        'ignore_sticky_posts' => true,
    );

    if ( ! empty( $category_ids ) ) {
        $args['category__in'] = $category_ids;
    }

    $query = new WP_Query( $args );
    $items = array();

    while ( $query->have_posts() ) {
        $query->the_post();
        $items[] = array(
            'id'        => get_the_ID(),
            'title'     => get_the_title(),
            'excerpt'   => get_the_excerpt(),
            'permalink' => get_permalink(),
        );
    }
    wp_reset_postdata();

    return $items;
}

function insight_journal_adjacent_post_data( $post, $direction = 'previous' ) {
    if ( ! $post instanceof WP_Post ) {
        return null;
    }

    $args = array(
        'post_type'      => $post->post_type,
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'post__not_in'   => array( $post->ID ),
        'orderby'        => 'date',
        'order'          => ( 'previous' === $direction ) ? 'DESC' : 'ASC',
        'date_query'     => array(
            array(
                ( 'previous' === $direction ) ? 'before' : 'after' => $post->post_date,
                'inclusive' => false,
            ),
        ),
    );

    $items = get_posts( $args );
    if ( empty( $items ) ) {
        return null;
    }

    $adjacent = $items[0];
    return array(
        'id'        => $adjacent->ID,
        'title'     => get_the_title( $adjacent ),
        'permalink' => get_permalink( $adjacent ),
    );
}

function insight_journal_post_payload( $post_id ) {
    $post = get_post( $post_id );

    if ( ! $post || 'publish' !== $post->post_status ) {
        return null;
    }

    $categories = get_the_category( $post_id );
    $tags       = get_the_tags( $post_id );

    return array(
        'id'             => $post->ID,
        'title'          => get_the_title( $post ),
        'excerpt'        => get_the_excerpt( $post ),
        'content'        => apply_filters( 'the_content', $post->post_content ),
        'permalink'      => get_permalink( $post ),
        'date'           => get_the_date( 'Y-m-d', $post ),
        'reading_time'   => insight_journal_reading_time( $post->post_content ),
        'featured_image' => insight_journal_featured_image_url( $post->ID ),
        'categories'     => array_map(
            static function( $category ) {
                return array(
                    'id'   => $category->term_id,
                    'name' => $category->name,
                    'url'  => get_term_link( $category ),
                );
            },
            $categories ? $categories : array()
        ),
        'tags'           => array_map(
            static function( $tag ) {
                return array(
                    'id'   => $tag->term_id,
                    'name' => $tag->name,
                    'url'  => get_term_link( $tag ),
                );
            },
            $tags ? $tags : array()
        ),
        'author'         => insight_journal_author_data( (int) $post->post_author ),
        'share'          => insight_journal_share_links( $post ),
        'adjacent'       => array(
            'previous' => insight_journal_adjacent_post_data( $post, 'previous' ),
            'next'     => insight_journal_adjacent_post_data( $post, 'next' ),
        ),
        'related'        => insight_journal_related_posts( $post->ID, 3 ),
    );
}

function insight_journal_register_rest_routes() {
    register_rest_route(
        'insight/v1',
        '/post/(?P<id>\d+)',
        array(
            'methods'             => 'GET',
            'callback'            => function( WP_REST_Request $request ) {
                $payload = insight_journal_post_payload( (int) $request['id'] );
                if ( ! $payload ) {
                    return new WP_Error( 'insight_not_found', __( 'Post not found', 'insight-journal' ), array( 'status' => 404 ) );
                }
                return rest_ensure_response( $payload );
            },
            'permission_callback' => '__return_true',
        )
    );
}
add_action( 'rest_api_init', 'insight_journal_register_rest_routes' );
