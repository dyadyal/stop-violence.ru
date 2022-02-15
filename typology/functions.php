<?php

/* Define Theme Vars */
define( 'TYPOLOGY_THEME_VERSION', '1.7' );

/* Define content width */
if ( !isset( $content_width ) ) {
	$content_width = 720;
}


/* Localization */
load_theme_textdomain( 'typology', get_parent_theme_file_path( '/languages' ) );


/* After theme setup main hook */
add_action( 'after_setup_theme', 'typology_theme_setup' );

/**
 * After Theme Setup
 *
 * Callback for after_theme_setup hook
 *
 * @since  1.0
 */

function typology_theme_setup() {

	/* Add thumbnails support */
	add_theme_support( 'post-thumbnails' );

	/* Add theme support for title tag */
	add_theme_support( 'title-tag' );

	/* Add image sizes */
	$image_sizes = typology_get_image_sizes();
	if ( !empty( $image_sizes ) ) {
		foreach ( $image_sizes as $id => $size ) {
			add_image_size( $id, $size['w'], $size['h'], $size['crop'] );
		}
	}

	/* Support for HTML5 */
	add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

	add_theme_support( 'customize-selective-refresh-widgets' );

	/* Automatic Feed Links */
	add_theme_support( 'automatic-feed-links' );

	/* WooCommerce support */
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	/* Load editor styles */
	add_theme_support( 'editor-styles' );

	/* Load editor styles */
	if ( is_admin() ) {
		typology_load_editor_styles();
	}

	/* Support for alignwide elements */
	add_theme_support( 'align-wide' );

	/* Support for responsive embeds */
	add_theme_support( 'responsive-embeds' );

	/* Support for predefined colors in editor */
	add_theme_support( 'editor-color-palette', typology_get_editor_colors() );

	/* Support for predefined font-sizes in editor */
	add_theme_support( 'editor-font-sizes', typology_get_editor_font_sizes() );

}


/* Helpers and utility functions */
include_once get_parent_theme_file_path( '/core/helpers.php' );

/* Default options */
include_once get_parent_theme_file_path( '/core/default-options.php' );

/* Load frontend scripts */
include_once get_parent_theme_file_path( '/core/enqueue.php' );

/* Template functions */
include_once get_parent_theme_file_path( '/core/template-functions.php' );

/* Menus */
include_once get_parent_theme_file_path( '/core/menus.php' );

/* Sidebars */
include_once get_parent_theme_file_path( '/core/sidebars.php' );

/* Extensions (hooks and filters to add/modify specific features ) */
include_once get_parent_theme_file_path( '/core/extensions.php' );


if ( is_admin() ) {

	/* Admin helpers and utility functions  */
	include_once get_parent_theme_file_path( '/core/admin/helpers.php' );

	/* Load admin scripts */
	include_once get_parent_theme_file_path( '/core/admin/enqueue.php' );

	/* Theme Options */
	include_once get_parent_theme_file_path( '/core/admin/options.php' );

	/* Include plugins - TGM */
	include_once get_parent_theme_file_path( '/core/admin/plugins.php' );

	/* Include AJAX action handlers */
	include_once get_parent_theme_file_path( '/core/admin/ajax.php' );

	/* Extensions ( hooks and filters to add/modify specific features ) */
	include_once get_parent_theme_file_path( '/core/admin/extensions.php' );

	/* Demo importer panel */
	include_once get_parent_theme_file_path( '/core/admin/demo-importer.php' );

	/* Metaboxes */
	include_once get_parent_theme_file_path( '/core/admin/metaboxes.php' );

}


add_action('init', 'dl_register_post_types');
function dl_register_post_types() {
	$labels = array(
        'name' => 'Заявления',
        'singular_name' => 'Заявления', // админ панель Добавить->Функцию
        'add_new' => 'Добавить',
        'add_new_item' => 'Добавить', // заголовок тега <title>
        'edit_item' => 'Редактировать',
        'new_item' => 'Новый',
        'all_items' => 'Все',
        'view_item' => 'Просмотр на сайте',
        'search_items' => 'Искать',
        'not_found' => 'Пусто.',
        'not_found_in_trash' => 'В корзине пусто.',
        'menu_name' => 'Заявления' // ссылка в меню в админке
    );
    $args = array(
        'labels' => $labels,
        'public' => true, // благодаря этому некоторые параметры можно пропустить
        'menu_icon' => 'dashicons-category', // иконка корзины
        'menu_position' => 4,
        'has_archive' => true,
        'capability_type' => 'post',
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_in_admin_bar' => true,
        'hierarchical' => true,
		'show_in_rest' => true,
        'taxonomies'   => array(),
        'supports' => array('title','custom-fields'),
    );
    register_post_type('statements', $args);
}

add_action('add_meta_boxes', 'custom_add_meta_boxes_page', 10, 2);
function custom_add_meta_boxes_page($post_type, $post) {
   
	add_meta_box(
    	'wp_statements_attachment',
    	'Сохранённые данные',
    	'wp_statements_attachment',
    	'statements',
        'normal', 
        null
    );
}

function translate_key($str) {

	$ru_keys = array(
		'statement_lastname' => 'Фамилия',
		'statement_firstname' => 'Имя',
		'statement_sex' => 'Пол',
		'statement_birthdate' => 'Дата рождения',
		'statement_birthplace' => 'Место рождения',
		'statement_citizenship' => 'Гражданство',
		'statement_address' => 'Адрес',
		'statement_phone' => 'Номер телефона',
		'statement_email' => 'Email',
		'statement_have_abused' => 'Подвергались ли одному из следующих видов физического насилия?(душил, бил по лицу, ногам, щипал, выкручивание рук, толчки, хватание за волосы, прижигание сигаретами, иное)',
		'statement_date_of_incident' => 'Дата инцидента',
		'statement_visited_medical' => 'Обращались ли в медицинское учреждение',
		'statement_date_hospital_visit' => 'Дата обращения в медицинское учреждение',
		'statement_explanation_yes' => 'Объяснение почему обратились спустя несколько дней',
		'statement_hospital_name' => 'Наименование медицинской организации, куда обратились в связи с побоями',
		'statement_doc_title_date' => 'Заголовок и дата документа',
		'statement_doc_file' => 'Прикреплённый файл',
		'statement_diagnosis' => 'Диагноз из медицинского документа',
		'statement_further_treatment' => 'Дальнейшее лечение',
		'statement_explanation_no' => 'Объяснение почему не обратились',
		'statement_visited_police' => 'Обращались ли в полицию',
		'statement_date_police_visit' => 'Дата обращения в полицию',
		'statement_visited_police_file' => 'Документ, подтверждающий обращение в полицию',
		'statement_explanation_police_yes' => 'Объяснение почему обратились спустя несколько дней',
		'statement_police_name' => 'Наименование отдела полиции',
		'statement_incorrectly' => 'На опросе или в беседе вели ли себя сотрудники полиции некорректно?',
		'statement_incorrectly_desc' => 'Описания некорректного поведения',
		'statement_was_medical_expertise' => 'Назначила ли полиция Судебно_Медицинскую Экспертизу/обследование по вашим телесным повреждениям?',
		'statement_appointment_date_medical_expertise' => 'Дата назначения СМЭ',
		'statement_date_medical_expertise' => 'Дата проведения СМЭ',
		'statement_diagnosis_medical_expertise' => 'Диагноз СМЭ',
		'statement_police_decision_on_application' => 'Решение которое было принято полицией по вашему заявлению',
		'statement_police_decision_on_application_date' => 'Дата решения',
		'statement_police_decision_on_application_file' => 'Прикрепленный файл',
		'statement_was_an_administrative_or_criminal_penalty_imposed' => 'Было ли назначено административное или уголовное наказание агрессору?',
		'statement_decision_in_a_case_on_an_administrative_offense' => 'Решение по делу об административном правонарушении',
		'statement_decision_in_a_case_on_an_administrative_offense_additional_amount' => 'Размер',
		'statement_decision_in_a_case_on_an_administrative_offense_additional_date' => 'Дата решения',
		'statement_decision_in_a_case_on_an_administrative_offense_additional_file' => 'Прикрепленный файл',
		'statement_decision_in_a_criminal_case' => 'Решение по уголовному делу',
		'statement_decision_in_a_criminal_case_additional_amount' => 'Размер',
		'statement_decision_in_a_criminal_case_additional_date' => 'Дата решения',
		'statement_decision_in_a_criminal_case_additional_file' => 'Прикрепленный файл',
		'statement_visited_police_explanation_no' => 'Объяснение почему не обратились',
		'statement_who_beat_you' => 'Кто нанес побои',
		'statement_who_is_the_aggressor_to_you' => 'Кем приходится агрессор',
		'statement_relationship_start_date' => 'Дата начала отношений',
		'statement_date_of_marriage' => 'Дата заключения брака',
		'statement_aggressor_work_in_law_enforcement' => 'Работает ли агрессор в правоохранительных органах?',
		'statement_aggressor_work_in_law_enforcement_position' => 'Должность',
		'statement_place_of_the_beating' => 'Место (адрес) нанесения побоев',
		'statement_where_was_the_beatings' => 'Описание какие именно наносились побои, по каким частям тела, сколько раз',
		'statement_which_part_of_the_body_hit' => 'Какой частью тела агрессор наносил удары',
		'statement_how_long_did_the_beating' => 'Сколько времени продолжалось избиение',
		'statement_any_items_used_to_inflict_beatings' => 'Использовал ли агрессор какие либо предметы для нанесения побоев',
		'statement_aggressor_insult_you' => 'Цитаты оскорблений агрессора',
		'statement_aggressor_make_threats_you' => 'Цитаты угроз агрессора',
		'statement_were_you_pregnant' => 'Были ли вы беременны во время насилия?',
		'statement_gestational_age' => 'Срок беременности',
		'statement_sick_during_the_violence' => 'Болели ли вы во время насилия?',
		'statement_sick_during_the_violence_name' => 'Название болезни',
		'statement_were_on_maternity_during_the_violence' => 'Находились ли в декрете во время насилия и/или кормили ли грудью',
		'statement_have_a_disability' => 'Имеете ли вы инвалидность',
		'statement_have_a_disability_power' => 'Степень инвалидности',
		'statement_have_a_disability_disease' => 'Заболевание',
		'statement_were_there_any_witnesses' => 'Были ли свидетели избиения',
		'statement_what_the_witnesses_see' => 'Где они находились? Что видели, слышали?',
		'statement_children_was_in_house_last_episode' => 'Были ли дети в доме во время избиения?',
		'statement_chilren_get_a_damage_last_episode' => 'Есть ли физические последствия?',
		'statement_chilren_get_a_damage_yes_last_episode' => 'Физические последствия из медицинского документа',
		'statement_children_message_to_a_police_last_episode' => 'Сообщили ли о насилии в полицию или медицинскую организацию',
		'statement_children_message_to_a_police_yes_last_episode' => 'Блок 00',
		'statement_chilren_get_a_psychological_damage_last_episode' => 'Есть ли психологические последствия',
		'statement_chilren_get_a_psychological_damage_opinion_last_episode' => 'Выписка из медицинского документа/медицинской карты ребенка/заключения психолога',
		'statement_chilren_get_a_psychological_damage_aftermath_last_episode' => 'Описание, что ребенок видел, что чувствовал и какие последствия для здоровья получил',
		'statement_chilren_get_a_psychological_damage_file_last_episode' => 'Заключение психолога',
		'statement_children_lastname_last_episode' => 'Фамилия ребёнка (детей)',
		'statement_children_firstname_last_episode' => 'Имя (имена) и отчество ребёнка (детей)',
		'statement_children_sex_last_episode' => 'Пол ребёнка (детей)',
		'statement_children_birthdate_last_episode' => 'Дата рождения ребёнка (детей)',
		'statement_children_birthplace_last_episode' => 'Место рождения ребёнка (детей)',
		'statement_children_citizenship_last_episode' => 'Гражданство ребёнка (детей)',
		'statement_children_address_last_episode' => 'Адрес ребёнка (детей)',
		'statement_children_phone_last_episode' => 'Телефон ребёнка (детей)',
		'statement_children_email_last_episode' => 'Email ребёнка (детей)',
		'statement_date_of_incident' => 'Дата инцидента',
		'statement_message_to_a_police' => 'Сообщали ли в полицию либо в медицинское учреждение о данном эпизоде',
		'statement_message_to_a_police_no' => 'Описание почему не сообщали',
		'statement_children_was_in_house_penultimate_episode' => 'Были ли дети в доме во время избиения',
		'statement_chilren_get_a_damage_penultimate_episode' => 'Есть ли физические последствия',
		'statement_chilren_get_a_damage_yes_penultimate_episode' => 'Выписка из медицинского документа',
		'statement_children_message_to_a_police_penultimate_episode' => 'Сообщили ли вы о насилии в полицию или медицинскую организацию',
		'statement_children_message_to_a_police_yes_penultimate_episode' => 'Блок 00',
		'statement_children_message_to_a_police_no_penultimate_episode' => '', // НЕТ ЗАГОЛОВКА
		'statement_chilren_get_a_psychological_damage_penultimate_episode' => 'Есть ли психологические последствия',
		'statement_chilren_get_a_psychological_damage_opinion_penultimate_episode' => 'Выписка из медицинского документа/медицинской карты ребенка/заключения психолога',
		'statement_chilren_get_a_psychological_damage_aftermath_penultimate_episode' => 'Описание, что ребенок видел, что чувствовал и какие последствия для здоровья получил',
		'statement_chilren_get_a_psychological_damage_file_penultimate_episode' => 'Заключение психолога',
		'statement_children_lastname_penultimate_episode' => 'Фамилия ребёнка (детей)',
		'statement_children_firstname_penultimate_episode' => 'Имя (имена) ребёнка (детей)',
		'statement_children_sex_penultimate_episode' => 'Пол ребёнка (детей)',
		'statement_children_birthdate_penultimate_episode' => 'Дата рождения ребёнка (детей)',
		'statement_children_citizenship_penultimate_episode' => 'Место рождение ребёнка (детей)',
		'statement_children_address_penultimate_episode' => 'Адрес ребёнка (детей)',
		'statement_children_phone_penultimate_episode' => 'Телефон ребёнка (детей)',
		'statement_children_email_penultimate_episode' => 'Email ребёнка (детей)',
		'statement_abuser_has_previously_used_violence_against_you' => 'Применял ли агрессор ранее насилие по отношению к вам или другому лицу?',
		'statement_abuser_have_a_weapon' => 'Имеется ли у обидчика оружие',
		'statement_abuser_was_previously_brought_to_criminal' => 'Привлекался ли обидчик ранее к уголовной или административной ответственности',
		'statement_what_was_brought' => 'За что привлекался',
		'statement_when_was_brought' => 'Когда привлекался',
		'statement_what_was_brought_file' => 'Приложенное решение',
		'statement_abuser_choked_you' => 'Ранее обидчик душил или хватал за горло',
		'statement_abuser_threatened_you' => 'Угрожал вам и вашим близким убийством и применением насилия',
		'statement_abuser_prone_to_jealousy' => 'Обидчик склонен к ревности',
		'statement_controls_most_of_your_life' => 'Контролирует большую часть вашей жизни',
		'statement_abuser_limited_your_freedom' => 'Обидчик ограничивал вам свободу',
		'statement_abuser_harm_pets' => 'Обидчик наносил или угрожал нанести вред домашним животным',
		'statement_abuser_has_addictions' => 'Обидчик имеет алкогольную, наркотическую или игровую зависимости',
		'statement_abuser_has_addictions_another' => 'Описание иной зависимости',
	);

	if(isset($ru_keys[$str])) {
		return $ru_keys[$str];
	}

	return $str;
}

function wp_statements_attachment() {
	ob_start();
	$meta = get_post_meta(get_the_ID());
	?>
	<style>
		table {
			table-layout: fixed;
			width: 100%;
		}
		td {
			word-break: break-word;
    		padding: 0 10px;
		}
	</style>
	<table>
		<tbody>
			<?php
			foreach($meta as $row => $val){
				if(preg_match('/statement/',$row)) {
					if(empty($val[0])) continue;
					echo "<tr>";
 					echo "<td> ".translate_key($row)." </td>";
 					echo "<td> $val[0] </td>";
					echo "</tr>";
				}
			}
			?>
		</tbody>
	</table>

	<?php
	echo ob_get_clean();
}

function save_custom_meta_box($post_id, $post, $update)
{

	$keys = array_keys($_POST);
	$arrays = array();
	foreach ($keys as $value) {
		if(preg_match('/dl/',$value)) {
			array_push($arrays, $value);
		}
    }
	foreach($arrays as $value) {
		update_post_meta($post_id, $value, $_POST[$value]);
    }

}
add_action("save_post", "save_custom_meta_box", 10, 3);

function xx__update_custom_roles() {
	if ( get_option( 'custom_roles_version' ) < 1 ) {
        add_role( 'lawyer', 'Юрист', array( 
			'read' => true, 
			'read_private_pages' => true, 
			'edit_published_posts' => true, 
			'level_0' => true ,
		));
		update_option( 'custom_roles_version', 1 );
    }
}
add_action( 'init', 'xx__update_custom_roles' );

function js_variables()
{
	$variables = array(
		'ajax_url' => admin_url('admin-ajax.php'),
		'is_mobile' => wp_is_mobile(),
		'ajax_nonce' => wp_create_nonce('myajax-nonce'),
		'user_id'	=>	get_current_user_id(),
		// Тут обычно какие-то другие переменные
	);
	echo ('<script type="text/javascript">window.wp_data = ' .
		json_encode($variables) .
		';</script>');
}

add_action('wp_head', 'js_variables');

add_action('wp_ajax_order_link', 'order_link_callback');
add_action('wp_ajax_nopriv_order_link', 'order_link_callback');
function order_link_callback()
{

	$user_id = $_POST['user_id'];
	$post_id = $_POST['post_id'];

	if(empty($user_id)) $user_id = get_current_user_id();
	update_post_meta($post_id, 'order_link', $user_id );

	$arg = array(
    	'ID' => $post_id,
	    'post_author' => $user_id,
	);
	wp_update_post( $arg );

	echo '/order/'.$post_id;
	
	wp_die();
}

add_action( 'init',  function() {
	
	$user_id = get_current_user_id();

	add_rewrite_rule( '^orders\/(.*)\/?', 'index.php?post_type=statements&p=$matches[0]', 'top' );

	flush_rewrite_rules(); 
} );

add_action("parse_request", 'action_handler'); 
function action_handler($wp) {

  if (isset($wp->query_vars["post_type"]) && $wp->query_vars["post_type"]=="statements" && preg_match('/orders/',$wp->request)) {
      global $wp;
      $post_id = $wp->query_vars["p"]; 
	  $post_id = str_replace('orders/','',$wp->request);
      return query_posts('p='.$post_id.'&post_type=statements');
  }
}

function admin_default_page( $redirect_to, $request, $user) {

	
	if(user_can($user->ID,'administrator')) {
		return '/statistics';
 	}elseif(user_can($user->ID,'lawyer')) {
		return '/orders';
	}
  return '/';
}

add_filter('login_redirect', 'admin_default_page', 10, 3);