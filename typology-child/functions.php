<?php 

/* 
	This is Typology Child Theme functions file
	You can use it to modify specific features and styling of Gridlove Theme
*/	

add_action( 'after_setup_theme', 'typology_child_theme_setup', 99 );

function typology_child_theme_setup(){
	add_action('wp_enqueue_scripts', 'typology_child_load_scripts');
}

function typology_child_load_scripts() {	
	wp_register_style('typology_child_style', trailingslashit(get_stylesheet_directory_uri()).'style.css', false, TYPOLOGY_THEME_VERSION, 'screen');
	wp_enqueue_style('typology_child_style');
}


?>