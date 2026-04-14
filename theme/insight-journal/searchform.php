<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label class="screen-reader-text" for="search-field"><?php esc_html_e( '搜索', 'insight-journal' ); ?></label>
    <input type="search" id="search-field" class="search-field search" placeholder="<?php echo esc_attr_x( '搜索文章标题或标签', 'placeholder', 'insight-journal' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
    <button type="submit" class="filter-btn search-submit"><?php esc_html_e( '搜索', 'insight-journal' ); ?></button>
</form>
