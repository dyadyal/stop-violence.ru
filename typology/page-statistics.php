<?php

if(!(is_user_logged_in() && current_user_can('administrator'))) {
	wp_redirect('/auth');
}

get_header();?>

<?php if( have_posts() ): ?>
	
	<?php while( have_posts() ) : the_post(); ?>
	
	<?php $meta = typology_get_page_meta(); ?>
    <?php $cover_class = !absint($meta['cover']) ? 'typology-cover-empty' : ''; ?>
    <div id="typology-cover" class="typology-cover <?php echo esc_attr($cover_class); ?>">
        <?php if(absint($meta['cover'])): ?>
            <?php get_template_part('template-parts/cover/cover-page'); ?>
            <?php if(typology_get_option( 'scroll_down_arrow' )): ?>
                <a href="javascript:void(0)" class="typology-scroll-down-arrow"><i class="fa fa-angle-down"></i></a>
            <?php endif; ?>
        <?php endif; ?>
    </div>
    <div class="typology-fake-bg">
        <div class="typology-section">
            <?php get_template_part('template-parts/ads/top'); ?>
            <div class="section-content section-content-page">
            	<article id="post-<?php the_ID(); ?>" <?php post_class( 'typology-post typology-single-post' ); ?>>
                        
            		<?php $meta = typology_get_page_meta(); ?>
            		<?php if(!absint($meta['cover']) ) : ?>
            		    <header class="entry-header">
            		        <h2 class="entry-title entry-title-cover-empty">Свободные заявки</h2>
            		    </header>
            		<?php endif; ?>
            	    <div class="entry-content clearfix">
                        <?php
                        
                        $query = array(
                            'post_type' => 'statements',
                            'posts_per_page' => '-1',
                            'post_status' => 'draft',
                            'author' => '0',
                            'meta_query' => array(
                                array(
                                    'key' => 'order_link',
                                    'compare' => 'NOT EXISTS'
                                )
                            )
                        );

                        query_posts($query);

                        if(have_posts()) :?>
                        <div class="orders">
                        <?php
                            while(have_posts()) :
                                the_post();
                                ?>
                            <div class="order" post_id="<? the_ID() ?>">
                                <span><a href="/order/<? the_ID()?>"><? the_title() ?></a></span><a href="#" class="take_on_work">Взять в работу</a>
                            
                            </div>
                            <?php
                            endwhile; wp_reset_query();?>
                        </div>
                        <?endif;?>
                        
            	    </div>
                        
            	</article>
            </div>
            
            
            <?php get_template_part('template-parts/ads/bottom'); ?>
        </div>
        <div class="typology-section">
            <?php get_template_part('template-parts/ads/top'); ?>
            <div class="section-content section-content-page">
            	<article id="post-<?php the_ID(); ?>" <?php post_class( 'typology-post typology-single-post' ); ?>>
                        
            		<?php $meta = typology_get_page_meta(); ?>
                    <header class="entry-header">
            		    <h2 class="entry-title entry-title-cover-empty">В работе</h2>
            		</header>
                            
            	    <div class="entry-content clearfix">
                        <?php
                        
                        $query = array(
                            'post_type' => 'statements',
                            'posts_per_page' => '-1',
                            'post_status' => 'draft',
                            'meta_query' => array(
                                array(
                                    'key' => 'order_link',
                                    'compare' => 'EXISTS'
                                )
                            )
                        );

                        query_posts($query);

                        if(have_posts()) :?>
                        <div class="orders">
                        <?php
                            while(have_posts()) :
                                the_post();
                                ?>
                            <div class="order">
                                <a href="/order/<? the_ID()?>"><? the_title() ?></a><span><? the_author_nickname() ?></span>
                            </div>
                            <?php
                            endwhile; wp_reset_query();?>
                        </div>
                        <?endif;?>
                        
            	    </div>
                        
            	</article>
            </div>
            
            
            <?php get_template_part('template-parts/ads/bottom'); ?>
        </div>
        <div class="typology-section">
            <?php get_template_part('template-parts/ads/top'); ?>
            <div class="section-content section-content-page">
            	<article id="post-<?php the_ID(); ?>" <?php post_class( 'typology-post typology-single-post' ); ?>>
                        
            		<?php $meta = typology_get_page_meta(); ?>
                    <header class="entry-header">
            		    <h2 class="entry-title entry-title-cover-empty">Обработка завершена</h2>
            		</header>
                            
            	    <div class="entry-content clearfix">
                        <?php
                        
                        $query = array(
                            'post_type' => 'statements',
                            'posts_per_page' => '-1',
                            'post_status' => 'publish',
                            'meta_query' => array(
                                array(
                                    'key' => 'order_link',
                                    'compare' => 'EXISTS'
                                )
                            )
                        );

                        query_posts($query);

                        if(have_posts()) :?>
                        <div class="orders">
                        <?php
                            while(have_posts()) :
                                the_post();
                                ?>
                           <div class="order">
                                <div><a href="/order/<? the_ID()?>"><? the_title() ?></a><a href="/order/<? the_ID()?>?download_doc"> (скачать)</a></div><span><? the_author_nickname() ?></span>
                            </div>
                            <?php
                            endwhile; wp_reset_query();?>
                        </div>
                        <?endif;?>
                        
            	    </div>
                        
            	</article>
            </div>
            
            
            <?php get_template_part('template-parts/ads/bottom'); ?>
        </div>
    </div>
	<?php endwhile; ?>
<?php endif; ?>

<?php
get_footer();