<?php

add_action( 'admin_init', 'typology_buddy_compatibility' );

function typology_buddy_compatibility() {

	if ( is_admin() && current_user_can( 'activate_plugins' ) && !typology_buddy_is_theme_active() ) {

		add_action( 'admin_notices', 'typology_buddy_compatibility_notice' );

		deactivate_plugins( TYPOLOGY_BUDDY_BASENAME );

		if ( isset( $_GET['activate'] ) ) {
			unset( $_GET['activate'] );
		}
	}
}

function typology_buddy_compatibility_notice() {
	echo '<div class="notice notice-warning"><p><strong>Note:</strong> Typology Buddy plugin has been deactivated as it requires Typology Theme to be active.</p></div>';
}

function typology_buddy_is_theme_active() {
	return defined( 'TYPOLOGY_THEME_VERSION' );
}

?>
