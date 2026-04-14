<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
    <div class="site-shell site-header__row">
        <div class="brand">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><h1><?php bloginfo( 'name' ); ?></h1></a>
            <p><?php bloginfo( 'description' ); ?></p>
        </div>
        <div class="header-actions">
            <?php get_search_form(); ?>
        </div>
    </div>
</header>
<main class="site-main">
