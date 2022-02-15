<?php 

if(!(is_user_logged_in() && (current_user_can('administrator') || current_user_can('lawyer')))) {
	wp_redirect('/auth');
}

$post_id = get_the_ID();
$can_edit = true;
$order_id = get_post_meta($post_id,'order_link',true);
if(empty($order_id) || $order_id != get_current_user_id()) {
	$can_edit = false;
}

if($can_edit) {
	if(isset($_POST['save'])) {
		unset($_POST['save']);

		$meta_array = $_POST;
		$meta_array = array_combine(
	    	array_map(function($k){ return 'statement_'.$k; }, array_keys($meta_array)),
			$meta_array
		);

		if(!empty($_POST['lastname'].' '.$_POST['firstname'])) {


			$meta_array['order_link'] = get_current_user_id();
			$post_array = array(
			    'ID' => get_the_ID(),
			    'post_status' => 'draft',
			    'post_author' => get_current_user_id(),
			    'meta_input'   => $meta_array
			);



			$meta = get_post_meta(get_the_ID());
			foreach($meta as $key => $value) {
				delete_post_meta(get_the_ID(), $key);
			}

			$post_id = wp_update_post( $post_array );
		}
	}

	if(isset($_POST['finish'])) {

		unset($_POST['save']);

		$meta_array = $_POST;
		$meta_array = array_combine(
	    	array_map(function($k){ return 'statement_'.$k; }, array_keys($meta_array)),
			$meta_array
		);

		if(!empty($_POST['lastname'].' '.$_POST['firstname'])) {


			$meta_array['order_link'] = get_current_user_id();
			$post_array = array(
			    'ID' => get_the_ID(),
			    'post_status' => 'publish',
			    'post_author' => get_current_user_id(),
			    'meta_input'   => $meta_array
			);



			$meta = get_post_meta(get_the_ID());
			foreach($meta as $key => $value) {
				delete_post_meta(get_the_ID(), $key);
			}

			$post_id = wp_update_post( $post_array );

			if(is_user_logged_in()) {
		 		if(user_can(get_current_user_id(),'administrator')) {
					wp_redirect('/statistics');
		 		}elseif(user_can(get_current_user_id(),'lawyer')) {
					wp_redirect('/orders');
				}
			}
		}

	}

}

if(isset($_REQUEST['download_doc'])) {
	require_once dirname(__FILE__).'/vendor/autoload.php';
    
    $PHPWord = new \PhpOffice\PhpWord\PhpWord();
	$post_id = get_the_ID();
	$meta = get_post_meta($post_id);
    $document = $PHPWord->loadTemplate(get_template_directory().'/template.docx'); 
    
// Фамилия
	$document->setValue('last_name', $meta['statement_lastname'][0].'  '); 
    
// Имя (имена) и отчество
	$document->setValue('first_name', $meta['statement_firstname'][0].'  ');
    
// Пол
	$sex = '';
    if(!empty($meta['statement_sex'][0])) {
        switch($meta['statement_sex'][0]) {
            case 'male':
                $sex = 'Мужчина';
                break;
            case 'female':
                $sex = 'Женщина';
                break;
        }
    }
    $document->setValue('sex', $sex);// имя

// Дата рождения
    $document->setValue('birthdate', (!empty($meta['statement_birthdate'][0])?date('d.m.Y',strtotime($meta['statement_birthdate'][0])):''));

// Место рождения
    if(!empty($meta['statement_birthplace'][0])) {
        $birthplace = $meta['statement_birthplace'][0];
    } 
    $document->setValue('birthplace', $birthplace);

// Гражданство 
    $citizenship = '';
    if(!empty($meta['statement_citizenship'][0])) {
        $citizenship = $meta['statement_citizenship'][0]; 
    }
    $document->setValue('citizenship', $citizenship);
    
// Адрес
    $address = '';
    if(!empty($meta['statement_address'][0])) {
        $address = $meta['statement_address'][0]; 
    }
    $document->setValue('address', $address);
    
// Номер телефона
    $phone = '';
    if(!empty($meta['statement_phone'][0])) {
        $phone = $meta['statement_phone'][0]; 
    }
    $document->setValue('phone', $phone);
    
// Адрес электронной почты
    $email = '';
    if(!empty($meta['statement_email'][0])) {
        $email = $meta['statement_email'][0]; 
    }
    $document->setValue('email', $email);


// Подвергались ли вы одному из следующих видов физического насилия?
	$have_abused = '';
    if(!empty($meta['statement_have_abused'][0])) {
        switch($meta['statement_have_abused'][0]) {
            case 'Да':
                $have_abused = 'Да';
                break;
            case 'Нет':
                $have_abused = 'Нет';
                break;
        }
    }
    $document->setValue('have_abused', $have_abused);// имя





    header("Content-Disposition: attachment; filename=".get_the_title().".docx");
    $document->saveAs('php://output'); //имя заполненного шаблона для сохранения
    exit();
}

get_header();

if( have_posts() ): ?>
	
	<?php while( have_posts() ) : the_post();
    ?>
		
        <?php $meta = typology_get_post_meta(); ?>
		<?php $cover_class = !absint($meta['cover']) ? 'typology-cover-empty' : ''; ?>
		<div id="typology-cover" class="typology-cover <?php echo esc_attr($cover_class); ?>">
            <?php if(absint($meta['cover'])): ?>
	            <?php get_template_part('template-parts/cover/cover-single'); ?>
                <?php if(typology_get_option( 'scroll_down_arrow' )): ?>
                    <a href="javascript:void(0)" class="typology-scroll-down-arrow"><i class="fa fa-angle-down"></i></a>
                <?php endif; ?>
            <?php endif; ?>
		</div>
		<div class="typology-fake-bg">
			<div class="typology-section">
				<?php get_template_part('template-parts/ads/top'); ?>
				<div class="typology-single-post">

                	    <?php $meta = typology_get_post_meta(); ?>
                        <?php if(!absint($meta['cover']) ) : ?>
                        
                            <header class="entry-header text-center">
                                <?php the_title( '<h1 class="entry-title entry-title-cover-empty">', '</h1>' ); ?>

                            </header>

                        <?php endif; ?>

                        <div class="entry-content clearfix">
                            <?php $share_option = typology_get_option('single_share_options'); ?>
                            <?php if (  strpos($share_option, 'above') !== false ): ?>
                                <?php get_template_part( 'template-parts/single/social' ); ?>
                            <?php endif ?>

                            <?php if( $meta['fimg'] == 'content' && has_post_thumbnail() ) : ?>
                                <div class="typology-featured-image">
                                    <?php the_post_thumbnail('typology-a'); ?>
                                    <?php if(typology_get_option( 'single_fimg_cap' ) && $caption = get_post( get_post_thumbnail_id())->post_excerpt ): ?>
                                        <figure class="wp-caption-text"><?php echo wp_kses_post( $caption );  ?></figure>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>

                            <?php the_content(); ?>

                            <?php wp_link_pages( array('before' => '<div class="typology-link-pages">', 'after' => '</div>', 'link_before' => '<span>', 'link_after' => '</span>')); ?>

                            <?php if( typology_get_option( 'single_tags' ) && has_tag() ) : ?>
                                <div class="entry-tags"><?php the_tags( false, ' ', false ); ?></div>
                            <?php endif; ?>

                        </div>

                         <?php if (  strpos($share_option, 'below') !== false ): ?>
                            <?php get_template_part( 'template-parts/single/social' ); ?>
                        <?php endif ?>


                <style>
                	div.yes,
                	div.no,
                	div.another {
                		display: none;
                	}
                </style>
                <?php
                $meta = get_post_meta(get_the_ID()); 
                ?>
                <form action="" method="POST" class="form-order">
                <div class="container">
                	<div class="row">
                		<div class="col-lg-12">
                			<div class="form-group">
                				<input class="form-field" required placeholder="Фамилия" value="<?=$meta['statement_lastname'][0]?>" type="text" name="lastname">
                				<label for="" class="form-label">Фамилия</label>
                			</div>
                			<div class="form-group">
                				<input class="form-field" value="<?=$meta['statement_firstname'][0]?>" required type="text" name="firstname" placeholder="Имя (имена) и отчество">
                				<label for="" class="form-label">Имя (имена) и отчество</label>
                			</div>
                			<div class="form-group">
                				<span>Пол</span>
                				<div><input type="radio" <?checked($meta['statement_sex'][0],'male',true);?> name="sex" value="male" id="male" required><label for="male">мужской</span></div>
                				<div><input type="radio" <?checked($meta['statement_sex'][0],'female',true);?> name="sex" value="female" id="female" required><label for="female">женский</span></div>
                			</div>
                			<div class="form-group">
                				<input class="form-field" required type="date" name="birthdate" value="<?=$meta['statement_birthdate'][0]?>" placeholder="Дата рождения">
                				<label for="" class="form-label">Дата рождения</label>
                			</div>
                			<div class="form-group">
                				<input class="form-field" required type="text" name="birthplace" value="<?=$meta['statement_birthplace'][0]?>" placeholder="Место рождения">
                				<label for="" class="form-label">Место рождения (как указано в паспорте)</label>
                			</div>
                			<div class="form-group">
                				<input class="form-field" required type="text" name="citizenship" value="<?=$meta['statement_citizenship'][0]?>" placeholder="Гражданство">
                				<label for="" class="form-label">Гражданство</label>
                			</div>
                			<div class="form-group">
                				<textarea class="form-field" required name="address" placeholder="Адрес" id="" col-lgs="30" rows="10"><?=$meta['statement_address'][0]?></textarea>
                				<label for="" class="form-label">Адрес</label>
                				<pre>Укажите полный адрес с индексом. Например, ул. Рабочая, д. 8, к. 4, кв. 3, г. Мытищи, Московская область, 110000, Россия. <br>Это должен быть домашний адрес, по которому вы фактически сможете получать письма, причем желательно в ближайшие несколько лет</pre>
                			</div>
                			<div class="form-group">
                				<input class="form-field" required type="text" name="phone" value="<?=$meta['statement_phone'][0]?>" placeholder="Номер телефона (включая международный код страны)">
                				<label for="" class="form-label">Номер телефона (включая международный код страны)</label>
                			</div>
                			<div class="form-group">
                				<input class="form-field" value="<?=$meta['statement_email'][0]?>" type="text" name="email" placeholder="Адрес электронной почты (если имеется)">
                				<label for="" class="form-label">Адрес электронной почты (если имеется)</label>
                			</div>
                		</div>
                	</div>

                	
                	<br>
                	<div class="row">
                		<div class="col-lg-12">
                			<h5>Факты</h5>
                			<br>
                			<h6>Побои</h6>
                			<pre>ВАЖНО! Описывать с конца, от самого свежего к самому первому</pre>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Подвергались ли вы одному из следующих видов физического насилия?</p>
                					<pre>душил, бил по лицу, ногам, щипал, выкручивание рук, толчки, хватание за волосы, прижигание сигаретами, иное</pre>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" value="Да" <? checked('Да',$meta['statement_have_abused'][0],true)?> name="have_abused" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_have_abused'][0],true)?> value="Нет" name="have_abused" id="">
                						<span>Нет</span>
                					</div>
                				</div>					
                			</div>
                			<div class="form-group">
                				<input class="form-field" type="date" name="date_of_incident" value="<?=$meta['statement_date_of_incident'][0]?>" placeholder="Дата инцидента">
                				<label for="" class="form-label">Дата инцидента</label>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Обращались ли вы в медицинское учреждение?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_have_abused'][0],true)?> value="Да" name="visited_medical" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_have_abused'][0],true)?> value="Нет" name="visited_medical" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="form-group">
                						<input class="form-field" value="<?=$meta['statement_date_hospital_visit'][0]?>" type="date" name="date_hospital_visit" placeholder="Дата обращения в медицинское учреждение">
                						<label for="" class="form-label">Дата обращения в медицинское учреждение</label>
                					</div>
                					<p>Если вы обратились в медицинскую организацию спустя несколько дней с момента побоев, объясните почему  например, агрессор держал вас взаперти в квартире, вы не могли пойти в больницу в связи с уходом за маленькими детьми </p>
                					<div class="form-group">
                						<textarea class="form-field" name="explanation_yes" id="" col-lgs="30" placeholder="Объяснение" rows="10"><?=$meta['statement_explanation_yes'][0]?></textarea>
                						<label class="form-label">Объяснение</label>
                					</div>
                					<div class="form-group">
                						<textarea class="form-field" name="hospital_name" id="" col-lgs="30" placeholder="Наименование медицинской организации, куда вы обратились в связи с побоями" rows="10"><?=$meta['statement_hospital_name'][0]?></textarea>
                						<label class="form-label">Наименование медицинской организации, куда вы обратились в связи с побоями</label>
                						<pre>выпишите из медицинского документа</pre>
                					</div>
                					<div class="form-group">
                						<textarea class="form-field" name="doc_title_date" id="" col-lgs="30" placeholder="Заголовок и дата документа" rows="10"><?=$meta['statement_doc_title_date'][0]?></textarea>
                						<label class="form-label">Заголовок и дата документа</label>
                						<pre>Например, выписка из медицинской карты №123 от 01.01.2021 , справка травмпункта №123 от 01.01.2021</pre>
                					</div>
                					<div class="form-group">
                						<input type="file" name="doc_file" id="" placeholder="Прикрепите файл">
                					</div>
                					<div class="form-group">
                						<textarea class="form-field" name="diagnosis" id="" col-lgs="30" placeholder="Выпишите диагноз из медицинского документа" rows="10"><?=$meta['statement_diagnosis'][0]?></textarea>
                						<label class="form-label">Выпишите диагноз из медицинского документа</label>
                						<pre>если вам не выдали письменный документ, пожалуйста, обратитесь за копией сейчас</pre>
                					</div>
                					<div class="form-group">
                						<textarea class="form-field" name="further_treatment" id="" col-lgs="30" placeholder="Дальнейшее лечение, если было назначено" rows="10"><?=$meta['statement_further_treatment'][0]?></textarea>
                						<label class="form-label">Дальнейшее лечение, если было назначено</label>
                					</div>
                				</div>
                				<div class="no">
                					<br>
                					<p>Если вы не обратились в медицинскую организацию, объясните почему </p>
                					<pre>например, агрессор держал вас взаперти в квартире, вы не могли пойти в больницу в связи с уходом за маленькими детьми</pre>
                					<div class="form-group">
                						<textarea class="form-field" name="explanation_no" id="" col-lgs="30" placeholder="Объяснение" rows="10"><?=$meta['statement_explanation_no'][0]?></textarea>
                						<label class="form-label">Объяснение</label>
                					</div>
                				</div>		
                			</div>
                
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Обращались ли вы в полицию?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_visited_police'][0],true)?> value="Да" name="visited_police" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_visited_police'][0],true)?> value="Нет" name="visited_police" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="form-group">
                						<input class="form-field" type="date" name="date_police_visit" value="<?=$meta['statement_date_police_visit'][0]?>" placeholder="Дата обращения в полицию">
                						<label for="" class="form-label">Дата обращения в полицию</label>
                						<pre>звонок 112 - время и дата звонка, обращение через интернет-приемную - копия письма с номером обращения, КУСП</pre>
                					</div>
                					<div class="form-group">
                						<p>Наименование документа, дата, прикрепить приложение Подтверждение обращения в полицию - КУСП, Заявление</p>
                						<input type="file" data-desc="Документ, подтверждающий обращение в полицию" name="visited_police_file" id="">
                					</div>
                					<p>Если вы обратились спустя несколько дней с момента побоев, объясните почему</p>
                					<pre>Прим.,  агрессор держал вас взаперти в квартире, вы опасались за свою жизнь и здоровье, вы не могли пойти в связи с уходом за маленькими детьми</pre>
                					<div class="form-group">
                						<textarea class="form-field" name="explanation_police_yes" id="" col-lgs="30" placeholder="Объяснение" rows="10"><?=$meta['statement_explanation_police_yes'][0]?></textarea>
                						<label class="form-label">Объяснение</label>
                					</div>
                					<div class="form-group">
                						<textarea class="form-field" name="police_name" id="" col-lgs="30" placeholder="Наименование отдела полиции выпишите из документа" rows="10"><?=$meta['statement_police_name'][0]?></textarea>
                						<label class="form-label">Наименование отдела полиции</label>
                					</div>
                					<pre>выпишите из документа</pre>
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>На опросе или в беседе вели ли себя сотрудники полиции некорректно?</p>
                							<pre>задавали ли вам вопросы, чем вы спровоцировали агрессора, обсуждали ваш внешний вид, убеждали забрать заявление, иное</pre>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_incorrectly'][0],true)?> value="Да" name="incorrectly" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_incorrectly'][0],true)?> value="Нет" name="incorrectly" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<textarea class="form-field" name="incorrectly_desc" id="" col-lgs="30" placeholder="Опишите некорректное поведение" rows="10"><?=$meta['statement_incorrectly_desc'][0]?></textarea>
                								<label class="form-label">Опишите некорректное поведение</label>
                							</div>
                						</div>					
                					</div>
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Назначила ли полиция Судебно-Медицинскую Экспертизу/обследование по вашим телесным повреждениям?</p>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_was_medical_expertise'][0],true)?> value="Да" name="was_medical_expertise" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_was_medical_expertise'][0],true)?> value="Нет" name="was_medical_expertise" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<input class="form-field" type="date" name="appointment_date_medical_expertise" value="<?=$meta['statement_appointment_date_medical_expertise'][0]?>" placeholder="Дата назначения СМЭ">
                								<label for="" class="form-label">Дата назначения СМЭ</label>
                							</div>
                							<div class="form-group">
                								<input class="form-field" type="date" name="date_medical_expertise" value="<?=$meta['statement_date_medical_expertise'][0]?>" placeholder="Дата проведения СМЭ">
                								<label for="" class="form-label">Дата проведения СМЭ</label>
                							</div>
                							<div class="form-group">
                								<textarea class="form-field" name="diagnosis_medical_expertise" id="" col-lgs="30" placeholder="Диагноз СМЭ" rows="10"><?=$meta['statement_diagnosis_medical_expertise'][0]?></textarea>
                								<label class="form-label">Диагноз СМЭ</label>
                							</div>
                						</div>
                					</div>
                					<div class="form-group">
                						<select name="police_decision_on_application" id="police_decision_on_application">
                							<option selected <? selected('полиция не ответила',$meta['statement_police_decision_on_application'][0],true)?>>полиция не ответила</option>
                							<option <? selected('отказ в возбуждении уголовного дела',$meta['statement_police_decision_on_application'][0],true)?>>отказ в возбуждении уголовного дела</option>
                							<option <? selected('отказ в возбуждении дела об административном правонарушении',$meta['statement_police_decision_on_application'][0],true)?>>отказ в возбуждении дела об административном правонарушении</option>
                							<option <? selected('постановление о возбуждении уголовного дела',$meta['statement_police_decision_on_application'][0],true)?>>постановление о возбуждении уголовного дела</option>
                							<option <? selected('постановление о возбуждении дела об административном правонарушении',$meta['statement_police_decision_on_application'][0],true)?>>постановление о возбуждении дела об административном правонарушении</option>
                							<option <? selected('постановление о возбуждении административного расследования',$meta['statement_police_decision_on_application'][0],true)?>>постановление о возбуждении административного расследования</option>
                						</select>
                						<div class="police_decision_on_application_additional d-none">
                							<div class="form-group date">
                								<input type="date" name="police_decision_on_application_date" id="" value="<?=$meta['statement_police_decision_on_application_date'][0]?>" placeholder="Дата решения">
                								<label class="form-label">Дата решения</label>
                							</div>	
                							<div class="form-group file">
                								<input type="file" name="police_decision_on_application_file" id="" placeholder="Прикрепите файл">
                								<label class="form-label">Прикрепите файл</label>
                							</div>
                						</div>
                						<label class="form-label">Какое решение было принято полицией по вашему заявлению</label>
                					</div>
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Было ли назначено административное или уголовное наказание агрессору?</p>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_was_medical_expertise'][0],true)?> value="Да" name="was_an_administrative_or_criminal_penalty_imposed" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_was_medical_expertise'][0],true)?> value="Нет" name="was_an_administrative_or_criminal_penalty_imposed" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<select name="decision_in_a_case_on_an_administrative_offense" id="">
                									<option <? selected('прекращение дела',$meta['statement_decision_in_a_case_on_an_administrative_offense'][0],true)?> selected>прекращение дела</option>
                									<option <? selected('штраф',$meta['statement_decision_in_a_case_on_an_administrative_offense'][0],true)?>>штраф</option>
                									<option <? selected('административный арест',$meta['statement_decision_in_a_case_on_an_administrative_offense'][0],true)?>>административный арест</option>
                									<option <? selected('обязательные работы',$meta['statement_decision_in_a_case_on_an_administrative_offense'][0],true)?>>обязательные работы</option>
                									<option <? selected('замечание',$meta['statement_decision_in_a_case_on_an_administrative_offense'][0],true)?>>замечание</option>
                								</select>
                								<label class="form-label">Решение по делу об административном правонарушении</label>
                								<div class="decision_in_a_case_on_an_administrative_offense_additional">
                									<div class="form-group amount">
                										<input type="text" name="decision_in_a_case_on_an_administrative_offense_additional_amount" value="<?=$meta['statement_decision_in_a_case_on_an_administrative_offense_additional_amount'][0]?>" id="" placeholder="укажите размер">
                										<label class="form-label">укажите размер</label>
                									</div>	
                									<div class="form-group date">
                										<input type="date" name="decision_in_a_case_on_an_administrative_offense_additional_date" value="<?=$meta['statement_decision_in_a_case_on_an_administrative_offense_additional_date'][0]?>" id="" placeholder="Дата решения">
                										<label class="form-label">Дата решения</label>
                									</div>	
                									<div class="form-group file">
                										<input type="file" name="decision_in_a_case_on_an_administrative_offense_additional_file" id="" placeholder="Прикрепите файл">
                										<label class="form-label">Прикрепите файл</label>
                									</div>
                								</div>
                							</div>
                							<div class="form-group">
                								<select name="decision_in_a_criminal_case" id="">
                									<option <? selected('прекращение дела',$meta['statement_was_medical_expertise'][0],true)?> selected>прекращение дела</option>
                									<option <? selected('обязательные работы',$meta['statement_was_medical_expertise'][0],true)?>>обязательные работы</option>
                									<option <? selected('исправительные работы',$meta['statement_was_medical_expertise'][0],true)?>>исправительные работы</option>
                									<option <? selected('принудительные работы',$meta['statement_was_medical_expertise'][0],true)?>>принудительные работы</option>
                									<option <? selected('арест',$meta['statement_was_medical_expertise'][0],true)?>>арест </option>
                									<option <? selected('лишение свободы с отбыванием наказания в колонии',$meta['statement_was_medical_expertise'][0],true)?>>лишение свободы с отбыванием наказания в колонии </option>
                									<option <? selected('лишение свободы условно',$meta['statement_was_medical_expertise'][0],true)?>>лишение свободы условно </option>
                								</select>
                								<label class="form-label">Решение по уголовному делу</label>
                								<div class="decision_in_a_criminal_case_additional">
                									<div class="form-group amount">
                										<input type="text" name="decision_in_a_criminal_case_additional_amount" value="<?=$meta['statement_decision_in_a_criminal_case_additional_amount'][0]?>" id="" placeholder="укажите размер">
                										<label class="form-label">укажите размер</label>
                									</div>	
                									<div class="form-group date">
                										<input type="date" name="decision_in_a_criminal_case_additional_date" value="<?=$meta['statement_decision_in_a_criminal_case_additional_date'][0]?>" id="" placeholder="Дата решения">
                										<label class="form-label">Дата решения</label>
                									</div>	
                									<div class="form-group file">
                										<input type="file" name="decision_in_a_criminal_case_additional_file" id="" placeholder="Прикрепите файл">
                										<label class="form-label">Прикрепите файл</label>
                									</div>
                								</div>
                							</div>

                						</div>
                					</div>	
                				</div>
                				<div class="no">
                					<p>Если вы не сообщили в полицию, укажите причину </p>
                					<pre>Например, риск жизни и здоровью, не было возможности позвонить в связи с тем, что агрессор находился рядом, опасалась, что это еще больше разозлит агрессора</pre>
                					<div class="form-group">
                						<textarea class="form-field" name="visited_police_explanation_no" id="" col-lgs="30" placeholder="Объяснение" rows="10"><?=$meta['statement_visited_police_explanation_no'][0]?></textarea>
                						<label class="form-label">Объяснение</label>
                					</div>
                				</div>			
                			</div>
                
                
                			<code>Проверка системы</code>
                
                
                			<h6>Описательные вопросы</h6>
                			<div class="col-lg-12">
                				<p>Кто нанес вам побои</p>
                				<div class="form-group">
                					<input class="form-field" type="text" name="who_beat_you" value="<?=$meta['statement_who_beat_you'][0]?>" placeholder="ФИО">
                					<label for="" class="form-label">ФИО</label>
                				</div>
                			</div>
                
                			<div class="form-group">
                				<input class="form-field" type="text" name="who_is_the_aggressor_to_you" value="<?=$meta['statement_who_is_the_aggressor_to_you'][0]?>" placeholder="Кем приходится вам агрессор?">
                				<label for="" class="form-label">Кем приходится вам агрессор?</label>
                			</div>
                
                			<div class="form-group">
                				<input class="form-field" type="date" name="relationship_start_date" value="<?=$meta['statement_relationship_start_date'][0]?>"  placeholder="Дата начала отношений">
                				<label for="" class="form-label">Дата начала отношений</label>
                			</div>
                
                			<div class="form-group">
                				<input class="form-field" value="<?=$meta['statement_date_of_marriage'][0]?>" type="date" name="date_of_marriage" placeholder="дата заключения брака">
                				<label for="" class="form-label">Дата заключения брака</label>
                			</div>

                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Работает ли агрессор в правоохранительных органах?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_aggressor_work_in_law_enforcement'][0],true)?> value="Да" name="aggressor_work_in_law_enforcement" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_aggressor_work_in_law_enforcement'][0],true)?> value="Нет" name="aggressor_work_in_law_enforcement" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="col-lg-12">
                						<div class="form-group">
                							<input class="form-field" type="text" name="aggressor_work_in_law_enforcement_position" value="<?=$meta['statement_aggressor_work_in_law_enforcement_position'][0]?>" placeholder="укажите должность">
                							<label for="" class="form-label">укажите должность</label>
                						</div>
                					</div>
                				</div>
                			</div>
                
                			<div class="form-group">
                				<textarea class="form-field" name="place_of_the_beating" id="" col-lgs="30" placeholder="Место (адрес) нанесения побоев" rows="10"><?=$meta['statement_place_of_the_beating'][0]?></textarea>
                				<label class="form-label">Место (адрес) нанесения побоев</label>
                			</div>
                
                			<div class="form-group">
                				<textarea class="form-field" name="where_was_the_beatings" id="" col-lgs="30" placeholder="Опишите какие именно наносились побои, по каким частям тела, сколько раз" rows="10"><?=$meta['statement_where_was_the_beatings'][0]?></textarea>
                				<label class="form-label">Опишите какие именно наносились побои, по каким частям тела, сколько раз</label>
                				<pre>(прим., душил, бил по лицу, ногам, щипал, выкручивание рук, толчки, хватание за волосы, прижигание сигаретами)</pre>
                			</div>
                
                			<div class="form-group">
                				<textarea class="form-field" name="which_part_of_the_body_hit" id="" col-lgs="30" placeholder="Какой частью тела агрессор наносил удары?" rows="10"><?=$meta['statement_which_part_of_the_body_hit'][0]?></textarea>
                				<label class="form-label">Какой частью тела агрессор наносил удары?</label>
                				<pre>(Руками, ногами)</pre>
                			</div>
                
                			<div class="form-group">
                				<textarea class="form-field" name="how_long_did_the_beating" id="" col-lgs="30" placeholder="Сколько времени продолжалось избиение?" rows="10"><?=$meta['statement_how_long_did_the_beating'][0]?></textarea>
                				<label class="form-label">Сколько времени продолжалось избиение?</label>
                			</div>

                			<h6>Окошко для самостоятельного заполнения с наводящими вопросами.</h6>
                			<pre>Если ответы "нет", не пишите их, только если утвердительные</pre>
                
							<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Использовал ли агрессор какие-либо предметы для нанесения побоев? (напр., бита, палка, утюг, итд)</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_any_items_used_to_inflict_beatings'][0],true)?> value="Да" name="statement_any_items_used_to_inflict_beatings" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_any_items_used_to_inflict_beatings'][0],true)?> value="Нет" name="statement_any_items_used_to_inflict_beatings" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="col-lg-12">
                						<div class="form-group">
                							<textarea class="form-field" name="any_items_used_to_inflict_beatings_yes" id="" col-lgs="30" placeholder="Использовал ли агрессор какие-либо предметы для нанесения побоев" rows="10"><?=$meta['statement_any_items_used_to_inflict_beatings_yes'][0]?></textarea>
                							<label class="form-label">Использовал ли агрессор какие-либо предметы для нанесения побоев (напр., бита, палка, утюг, итд)</label>
                						</div>
                					</div>
                				</div>
                			</div>
                
                			<div class="form-group">
                				<textarea class="form-field" name="aggressor_insult_you" id="" col-lgs="30" placeholder="Высказывал ли агрессор оскорбления в ваш адрес? Если да, то процитируйте" rows="10"><?=$meta['statement_aggressor_insult_you'][0]?></textarea>
                				<label class="form-label">Высказывал ли агрессор оскорбления в ваш адрес? Если да, то процитируйте</label>
                			</div>
                
                			<div class="form-group">
                				<textarea class="form-field" name="aggressor_make_threats_you" id="" col-lgs="30" placeholder="Высказывал ли агрессор угрозы убийством или здоровья в ваш адрес или адрес ваших детей, других близких людей? Если да, то процитируйте" rows="10"><?=$meta['statement_aggressor_make_threats_you'][0]?></textarea>
                				<label class="form-label">Высказывал ли агрессор угрозы убийством или здоровья в ваш адрес или адрес ваших детей, других близких людей? Если да, то процитируйте</label>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Были ли вы беременны во время насилия?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_were_you_pregnant'][0],true)?> value="Да" name="were_you_pregnant" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_were_you_pregnant'][0],true)?> value="Нет" name="were_you_pregnant" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="form-group">
                						<select name="gestational_age" id="">
                							<option value="1 неделя" <? selected('1 неделя',$meta['statement_gestational_age'][0],true)?>>1 неделя</option>
                							<option value="2 неделя" <? selected('2 неделя',$meta['statement_gestational_age'][0],true)?>>2 неделя</option>
                							<option value="3 неделя" <? selected('3 неделя',$meta['statement_gestational_age'][0],true)?>>3 неделя</option>
                							<option value="4 неделя" <? selected('4 неделя',$meta['statement_gestational_age'][0],true)?>>4 неделя</option>
                							<option value="5 неделя" <? selected('5 неделя',$meta['statement_gestational_age'][0],true)?>>5 неделя</option>
                							<option value="6 неделя" <? selected('6 неделя',$meta['statement_gestational_age'][0],true)?>>6 неделя</option>
                							<option value="7 неделя" <? selected('7 неделя',$meta['statement_gestational_age'][0],true)?>>7 неделя</option>
                							<option value="8 неделя" <? selected('8 неделя',$meta['statement_gestational_age'][0],true)?>>8 неделя</option>
                							<option value="9 неделя" <? selected('9 неделя',$meta['statement_gestational_age'][0],true)?>>9 неделя</option>
                							<option value="10 неделя" <? selected('10 неделя',$meta['statement_gestational_age'][0],true)?>>10 неделя</option>
                							<option value="11 неделя" <? selected('11 неделя',$meta['statement_gestational_age'][0],true)?>>11 неделя</option>
                							<option value="12 неделя" <? selected('12 неделя',$meta['statement_gestational_age'][0],true)?>>12 неделя</option>
                							<option value="13 неделя" <? selected('13 неделя',$meta['statement_gestational_age'][0],true)?>>13 неделя</option>
                							<option value="14 неделя" <? selected('14 неделя',$meta['statement_gestational_age'][0],true)?>>14 неделя</option>
                							<option value="15 неделя" <? selected('15 неделя',$meta['statement_gestational_age'][0],true)?>>15 неделя</option>
                							<option value="16 неделя" <? selected('16 неделя',$meta['statement_gestational_age'][0],true)?>>16 неделя</option>
                							<option value="17 неделя" <? selected('17 неделя',$meta['statement_gestational_age'][0],true)?>>17 неделя</option>
                							<option value="18 неделя" <? selected('18 неделя',$meta['statement_gestational_age'][0],true)?>>18 неделя</option>
                							<option value="19 неделя" <? selected('19 неделя',$meta['statement_gestational_age'][0],true)?>>19 неделя</option>
                							<option value="20 неделя" <? selected('20 неделя',$meta['statement_gestational_age'][0],true)?>>20 неделя</option>
                							<option value="21 неделя" <? selected('21 неделя',$meta['statement_gestational_age'][0],true)?>>21 неделя</option>
                							<option value="22 неделя" <? selected('22 неделя',$meta['statement_gestational_age'][0],true)?>>22 неделя</option>
                							<option value="23 неделя" <? selected('23 неделя',$meta['statement_gestational_age'][0],true)?>>23 неделя</option>
                							<option value="24 неделя" <? selected('24 неделя',$meta['statement_gestational_age'][0],true)?>>24 неделя</option>
                							<option value="25 неделя" <? selected('25 неделя',$meta['statement_gestational_age'][0],true)?>>25 неделя</option>
                							<option value="26 неделя" <? selected('26 неделя',$meta['statement_gestational_age'][0],true)?>>26 неделя</option>
                							<option value="27 неделя" <? selected('27 неделя',$meta['statement_gestational_age'][0],true)?>>27 неделя</option>
                							<option value="28 неделя" <? selected('28 неделя',$meta['statement_gestational_age'][0],true)?>>28 неделя</option>
                							<option value="29 неделя" <? selected('29 неделя',$meta['statement_gestational_age'][0],true)?>>29 неделя</option>
                							<option value="30 неделя" <? selected('30 неделя',$meta['statement_gestational_age'][0],true)?>>30 неделя</option>
                							<option value="31 неделя" <? selected('31 неделя',$meta['statement_gestational_age'][0],true)?>>31 неделя</option>
                							<option value="32 неделя" <? selected('32 неделя',$meta['statement_gestational_age'][0],true)?>>32 неделя</option>
                							<option value="33 неделя" <? selected('33 неделя',$meta['statement_gestational_age'][0],true)?>>33 неделя</option>
                							<option value="34 неделя" <? selected('34 неделя',$meta['statement_gestational_age'][0],true)?>>34 неделя</option>
                							<option value="35 неделя" <? selected('35 неделя',$meta['statement_gestational_age'][0],true)?>>35 неделя</option>
                							<option value="36 неделя" <? selected('36 неделя',$meta['statement_gestational_age'][0],true)?>>36 неделя</option>
                							<option value="37 неделя" <? selected('37 неделя',$meta['statement_gestational_age'][0],true)?>>37 неделя</option>
                							<option value="38 неделя" <? selected('38 неделя',$meta['statement_gestational_age'][0],true)?>>38 неделя</option>
                							<option value="39 неделя" <? selected('39 неделя',$meta['statement_gestational_age'][0],true)?>>39 неделя</option>
                							<option value="40 неделя" <? selected('40 неделя',$meta['statement_gestational_age'][0],true)?>>40 неделя</option>
                						</select>
                						<label class="form-label">Укажите срок</label>
                					</div>

                				</div>
                			</div>	
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Болели ли вы во время насилия?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_sick_during_the_violence'][0],true)?>  value="Да" name="sick_during_the_violence" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_sick_during_the_violence'][0],true)?> value="Нет" name="sick_during_the_violence" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">	
                					<div class="form-group">
                						<input class="form-field" value="<?=$meta['statement_sick_during_the_violence_name'][0]?>" type="text" name="sick_during_the_violence_name" placeholder="Укажите чем">
                						<label class="form-label">Укажите чем</label>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Находились ли в декрете во время насилия и/или кормили ли грудью?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_were_on_maternity_during_the_violence'][0],true)?> value="Да" name="were_on_maternity_during_the_violence" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_were_on_maternity_during_the_violence'][0],true)?> value="Нет" name="were_on_maternity_during_the_violence" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Имеете ли вы инвалидность?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_have_a_disability'][0],true)?> value="Да" name="have_a_disability" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_have_a_disability'][0],true)?> value="Нет" name="have_a_disability" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="form-group">
                						<select name="have_a_disability_power" id="">
                							<option <? selected('1 степень',$meta['statement_have_a_disability_power'][0],true)?> value="1 степень">1 степень</option>
                							<option <? selected('2 степень',$meta['statement_have_a_disability_power'][0],true)?> value="2 степень">2 степень</option>
                							<option <? selected('3 степень',$meta['statement_have_a_disability_power'][0],true)?> value="3 степень">3 степень</option>
                							<option <? selected('4 степень',$meta['statement_have_a_disability_power'][0],true)?> value="4 степень">4 степень</option>
                						</select>
                						<label class="form-label">Укажите степень</label>
                					</div>
                					<div class="form-group">
                						<input class="form-field" value="<?=$meta['statement_have_a_disability_disease'][0]?>" type="text" name="have_a_disability_disease" placeholder="Укажите заболевание">
                						<label class="form-label">Укажите заболевание</label>
                					</div>
                				</div>
                			</div>
                
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Были ли свидетели избиения?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" value="Да" name="were_there_any_witnesses" <? checked('Да',$meta['statement_were_there_any_witnesses'][0],true)?> id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" value="Нет" <? checked('Нет',$meta['statement_were_there_any_witnesses'][0],true)?> name="were_there_any_witnesses" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="form-group">
                						<textarea class="form-field" name="what_the_witnesses_see" id="" col-lgs="30" placeholder="Где они находились? Что видели, слышали?" rows="10"><?=$meta['statement_what_the_witnesses_see'][0]?></textarea>
                						<label class="form-label">Где они находились? Что видели, слышали?</label>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Были ли дети в доме во время избиения?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_children_was_in_house_last_episode'][0],true)?> value="Да" name="children_was_in_house_last_episode" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_children_was_in_house_last_episode'][0],true)?> value="Нет" name="children_was_in_house_last_episode" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					Согласие на обработку персональных данных ребенка
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Есть ли физические последствия?</p>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_chilren_get_a_damage_last_episode'][0],true)?> value="Да" name="chilren_get_a_damage_last_episode" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_chilren_get_a_damage_last_episode'][0],true)?> value="Нет" name="chilren_get_a_damage_last_episode" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<textarea class="form-field" name="chilren_get_a_damage_yes_last_episode" id="" col-lgs="30" placeholder="Выпишите из медицинского документа" rows="10"><?=$meta['statement_chilren_get_a_damage_yes_last_episode'][0]?></textarea>
                								<label for="" class="form-label">Выпишите из медицинского документа</label>
                							</div>
                						</div>
                					</div>
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Сообщили ли вы о насилии в полицию или медицинскую организацию?</p>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_children_message_to_a_police_last_episode'][0],true)?> value="Да" name="children_message_to_a_police_last_episode" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_children_message_to_a_police_last_episode'][0],true)?> value="Нет" name="children_message_to_a_police_last_episode" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<textarea class="form-field" name="children_message_to_a_police_yes_last_episode" id="" col-lgs="30" placeholder="Заполните блок 00" rows="10"><?=$meta['statement_children_message_to_a_police_yes_last_episode'][0]?></textarea>
                								<label for="" class="form-label">Заполните блок 00</label>
                							</div>
                						</div>
                						<div class="no">
                							<div class="form-group">
                								<textarea class="form-field" name="children_message_to_a_police_no_last_episode" id="" col-lgs="30" placeholder="Обратитесь в полицию, вот вам образец" rows="10"><?=$meta['statement_children_message_to_a_police_no_last_episode'][0]?></textarea>
                								<label for="" class="form-label">Обратитесь в полицию, вот вам образец</label>
                							</div>
                						</div>
                					</div>
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Есть ли психологические последствия?</p>
                							<pre>(Например, испугался, заплакал, стал плохо спать, стал замкнутым и т.п.)</pre>
                							<h6>Если у вас нет возможности обратиться к психологу, напишите <a href="">нам</a></h6>
                							<pre>С нашей стороны мы даем психолога, если дело приемлемо для ЕСПЧ, и связываем с дружественной организацией, если неприемлемо для ЕСПЧ</pre>
                							<br>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_chilren_get_a_psychological_damage_last_episode'][0],true)?> value="Да" name="chilren_get_a_psychological_damage_last_episode" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_chilren_get_a_psychological_damage_last_episode'][0],true)?> value="Нет" name="chilren_get_a_psychological_damage_last_episode" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<textarea class="form-field" name="chilren_get_a_psychological_damage_opinion_last_episode" id="" col-lgs="30" placeholder="Выпишите из медицинского документа/медицинской карты ребенка/заключения психолога" rows="10"><?=$meta['statement_chilren_get_a_psychological_damage_opinion_last_episode'][0]?></textarea>
                								<label for="" class="form-label">Выпишите из медицинского документа/медицинской карты ребенка/заключения психолога</label>
                							</div>
                							<div class="form-group">
                								<textarea class="form-field" name="chilren_get_a_psychological_damage_aftermath_last_episode" id="" col-lgs="30" placeholder="Опишите, что ребенок видел, что чувствовал и какие последствия для здоровья получил." rows="10"><?=$meta['statement_chilren_get_a_psychological_damage_aftermath_last_episode'][0]?></textarea>
                								<label for="" class="form-label">Опишите, что ребенок видел, что чувствовал и какие последствия для здоровья получил.</label>
                							</div>
                							<div class="form-group">
                								<p>Если обращались к психологу, приложите заключение</p>
                								<input type="file" name="chilren_get_a_psychological_damage_file_last_episode" id="">
                							</div>
                						</div>
                					</div>
                					<div class="col-lg-12">
                						<p>Персональные данные ребенка</p>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_lastname_last_episode'][0]?>" required placeholder="Фамилия" type="text" name="children_lastname_last_episode">
                							<label for="" class="form-label">Фамилия</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_firstname_last_episode'][0]?>" required type="text" name="children_firstname_last_episode" placeholder="Имя (имена) и отчество">
                							<label for="" class="form-label">Имя (имена) и отчество</label>
                						</div>
                						<div class="form-group">
                							<span>Пол</span>
                							<div><input type="radio" name="children_sex_last_episode" <? checked('male',$meta['statement_children_sex_last_episode'][0],true)?> value="male" id="male" required><label for="male">мужской</span></div>
                							<div><input type="radio" name="children_sex_last_episode" <? checked('female',$meta['statement_children_sex_last_episode'][0],true)?> value="female" id="female" required><label for="female">женский</span></div>
                						</div>
                						<div class="form-group">
                							<input class="form-field" required type="date" name="children_birthdate_last_episode" placeholder="Дата рождения" value="<?=$meta['statement_children_birthdate_last_episode'][0]?>">
                							<label for="" class="form-label">Дата рождения</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" required type="text" name="children_birthplace_last_episode" placeholder="Место рождения" value="<?=$meta['statement_children_birthplace_last_episode'][0]?>">
                							<label for="" class="form-label">Место рождения (как указано в паспорте)</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" required type="text" name="children_citizenship_last_episode" placeholder="Гражданство" value="<?=$meta['statement_children_citizenship_last_episode'][0]?>">
                							<label for="" class="form-label">Гражданство</label>
                						</div>
                						<div class="form-group">
                							<textarea class="form-field" required name="children_address_last_episode" placeholder="Адрес" id="" col-lgs="30" rows="10"><?=$meta['statement_children_address_last_episode'][0]?></textarea>
                							<label for="" class="form-label">Адрес</label>
                							<pre>Укажите полный адрес с индексом. Например, ул. Рабочая, д. 8, к. 4, кв. 3, г. Мытищи, Московская область, 110000, Россия. <br>Это должен быть домашний адрес, по которому вы фактически сможете получать письма, причем желательно в ближайшие несколько лет</pre>
                						</div>
                						<div class="form-group">
                							<input class="form-field" required type="text" name="children_phone_last_episode" value="<?=$meta['statement_children_phone_last_episode'][0]?>" placeholder="Номер телефона (включая международный код страны)">
                							<label for="" class="form-label">Номер телефона (включая международный код страны)</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" type="text" name="children_email_last_episode" value="<?=$meta['statement_children_email_last_episode'][0]?>" placeholder="Адрес электронной почты (если имеется)">
                							<label for="" class="form-label">Адрес электронной почты (если имеется)</label>
                						</div>
                					</div>
                				</div>
                			</div>
                			<br><br>
                			<h6>Эпизод предпоследний доказанный</h6>
                			<div class="form-group">
                				<input class="form-field" value="<?=$meta['statement_date_of_incident'][0]?>" type="date" name="date_of_incident" placeholder="Дата инцидента">
                				<label for="" class="form-label">Дата инцидента</label>
                			</div>
                			<br><br>
                			<h6>Самый ранний по хронологии эпизод</h6>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Сообщали ли вы в полицию либо в медицинское учреждение о данном эпизоде?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_message_to_a_police'][0],true)?> value="Да" name="message_to_a_police" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_message_to_a_police'][0],true)?>  value="Нет" name="message_to_a_police" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<pre>Если да (112 или номер КУСП или была в медучреждении), либо дата медицинского документа, то в отношении нападавшего должно быть возбуждено уголовное дело по ст. 117 УК РФ Истязание, свяжитесь с нами для получения юридической помощи в России </pre>
                				</div>
                				<div class="no">
                					<div class="form-group">
                						<textarea class="form-field" name="message_to_a_police_no" id="" col-lgs="30" placeholder="Описание в свободной форме" rows="10"><?=$meta['statement_message_to_a_police_no'][0]?></textarea>
                						<label for="" class="form-label">Описание в свободной форме</label>
                						<pre>Пример текста краткое описание “С 2015 г. агрессор начал мне угрожать, применять физическое насилие, стал злоупотреблять спиртными напитками. В полицию и больницу я не обращалась, так как надеялась что это прекратиться”</pre>
                					</div>
                				</div>
                			</div>
                

                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Были ли дети в доме во время избиения?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_children_was_in_house_penultimate_episode'][0],true)?>  value="Да" name="children_was_in_house_penultimate_episode" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_children_was_in_house_penultimate_episode'][0],true)?> value="Нет" name="children_was_in_house_penultimate_episode" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					Согласие на обработку персональных данных ребенка
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Есть ли физические последствия?</p>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_chilren_get_a_damage_penultimate_episode'][0],true)?>  value="Да" name="chilren_get_a_damage_penultimate_episode" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_chilren_get_a_damage_penultimate_episode'][0],true)?> value="Нет" name="chilren_get_a_damage_penultimate_episode" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<textarea class="form-field" name="chilren_get_a_damage_yes_penultimate_episode" id="" col-lgs="30" placeholder="Выпишите из медицинского документа" rows="10"><?=$meta['statement_chilren_get_a_damage_yes_penultimate_episode'][0]?></textarea>
                								<label for="" class="form-label">Выпишите из медицинского документа</label>
                							</div>
                						</div>
                					</div>
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Сообщили ли вы о насилии в полицию или медицинскую организацию?</p>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_children_message_to_a_police_penultimate_episode'][0],true)?> value="Да" name="children_message_to_a_police_penultimate_episode" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_children_message_to_a_police_penultimate_episode'][0],true)?> value="Нет" name="children_message_to_a_police_penultimate_episode" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<textarea class="form-field" name="children_message_to_a_police_yes_penultimate_episode" id="" col-lgs="30" placeholder="Заполните блок 00" rows="10"><?=$meta['statement_children_message_to_a_police_yes_penultimate_episode'][0]?></textarea>
                								<label for="" class="form-label">Заполните блок 00</label>
                							</div>
                						</div>
                						<div class="no">
                							<div class="form-group">
                								<textarea class="form-field" name="children_message_to_a_police_no_penultimate_episode" id="" col-lgs="30" placeholder="Обратитесь в полицию, вот вам образец" rows="10"><?=$meta['statement_children_message_to_a_police_no_penultimate_episode'][0]?></textarea>
                								<label for="" class="form-label">Обратитесь в полицию, вот вам образец</label>
                							</div>
                						</div>
                					</div>
                					<div class="form-group row">
                						<div class="col-lg-10">
                							<p>Есть ли психологические последствия?</p>
                							<pre>(Например, испугался, заплакал, стал плохо спать, стал замкнутым и т.п.)</pre>
                							<h6>Если у вас нет возможности обратиться к психологу, напишите <a href="">нам</a></h6>
                							<pre>С нашей стороны мы даем психолога, если дело приемлемо для ЕСПЧ, и связываем с дружественной организацией, если неприемлемо для ЕСПЧ</pre>
                							<br>
                						</div>
                						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                							<div>
                								<input type="radio" <? checked('Да',$meta['statement_chilren_get_a_psychological_damage_penultimate_episode'][0],true)?> value="Да" name="chilren_get_a_psychological_damage_penultimate_episode" id="">
                								<span>Да</span>
                							</div>
                							<div>
                								<input type="radio" <? checked('Нет',$meta['statement_chilren_get_a_psychological_damage_penultimate_episode'][0],true)?> value="Нет" name="chilren_get_a_psychological_damage_penultimate_episode" id="">
                								<span>Нет</span>
                							</div>
                						</div>
                						<div class="yes">
                							<div class="form-group">
                								<textarea class="form-field" name="chilren_get_a_psychological_damage_opinion_penultimate_episode" id="" col-lgs="30" placeholder="Выпишите из медицинского документа/медицинской карты ребенка/заключения психолога" rows="10"><?=$meta['statement_chilren_get_a_psychological_damage_opinion_penultimate_episode'][0]?></textarea>
                								<label for="" class="form-label">Выпишите из медицинского документа/медицинской карты ребенка/заключения психолога</label>
                							</div>
                							<div class="form-group">
                								<textarea class="form-field" name="chilren_get_a_psychological_damage_aftermath_penultimate_episode" id="" col-lgs="30" placeholder="Опишите, что ребенок видел, что чувствовал и какие последствия для здоровья получил." rows="10"><?=$meta['statement_chilren_get_a_psychological_damage_aftermath_penultimate_episode'][0]?></textarea>
                								<label for="" class="form-label">Опишите, что ребенок видел, что чувствовал и какие последствия для здоровья получил.</label>
                							</div>
                							<div class="form-group">
                								<p>Если обращались к психологу, приложите заключение</p>
                								<input type="file" name="chilren_get_a_psychological_damage_file_penultimate_episode" id="">
                							</div>
                						</div>
                					</div>
                					<div class="col-lg-12">
                						<p>Персональные данные ребенка</p>
                						<div class="form-group">
                							<input class="form-field" required placeholder="Фамилия" value="<?=$meta['statement_children_lastname_penultimate_episode'][0]?>" type="text" name="children_lastname_penultimate_episode">
                							<label for="" class="form-label">Фамилия</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_firstname_penultimate_episode'][0]?>" required type="text" name="children_firstname_penultimate_episode" placeholder="Имя (имена) и отчество">
                							<label for="" class="form-label">Имя (имена) и отчество</label>
                						</div>
                						<div class="form-group">
                							<span>Пол</span>
                							<div><input type="radio" name="children_sex_penultimate_episode" <? selected('male',$meta['statement_children_sex_penultimate_episode'][0],true)?> value="male" id="male" required><label for="male">мужской</span></div>
                							<div><input type="radio" name="children_sex_penultimate_episode" value="female" <? selected('female',$meta['statement_children_sex_penultimate_episode'][0],true)?> id="female" required><label for="female">женский</span></div>
                						</div>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_birthdate_penultimate_episode'][0]?>" required type="date" name="children_birthdate_penultimate_episode" placeholder="Дата рождения">
                							<label for="" class="form-label">Дата рождения</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_birthplace_penultimate_episode'][0]?>" required type="text" name="children_birthplace_penultimate_episode" placeholder="Место рождения">
                							<label for="" class="form-label">Место рождения (как указано в паспорте)</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_citizenship_penultimate_episode'][0]?>" required type="text" name="children_citizenship_penultimate_episode" placeholder="Гражданство">
                							<label for="" class="form-label">Гражданство</label>
                						</div>
                						<div class="form-group">
                							<textarea class="form-field" value="<?=$meta['statement_children_address_penultimate_episode'][0]?>" required name="children_address_penultimate_episode" placeholder="Адрес" id="" col-lgs="30" rows="10"></textarea>
                							<label for="" class="form-label">Адрес</label>
                							<pre>Укажите полный адрес с индексом. Например, ул. Рабочая, д. 8, к. 4, кв. 3, г. Мытищи, Московская область, 110000, Россия. <br>Это должен быть домашний адрес, по которому вы фактически сможете получать письма, причем желательно в ближайшие несколько лет</pre>
                						</div>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_phone_penultimate_episode'][0]?>" required type="text" name="children_phone_penultimate_episode" placeholder="Номер телефона (включая международный код страны)">
                							<label for="" class="form-label">Номер телефона (включая международный код страны)</label>
                						</div>
                						<div class="form-group">
                							<input class="form-field" value="<?=$meta['statement_children_email_penultimate_episode'][0]?>" type="text" name="children_email_penultimate_episode" placeholder="Адрес электронной почты (если имеется)">
                							<label for="" class="form-label">Адрес электронной почты (если имеется)</label>
                						</div>
                					</div>
                					</div>
                			</div>
                			<br><br>
                			<h6>Факторы риска агрессора(выберете, если не указывали ранее в п. 5)</h6>
                			<br>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Применял ли агрессор ранее насилие по отношению к вам или другому лицу?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_abuser_has_previously_used_violence_against_you'][0],true)?> value="Да" name="abuser_has_previously_used_violence_against_you" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_abuser_has_previously_used_violence_against_you'][0],true)?> value="Нет" name="abuser_has_previously_used_violence_against_you" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Имеется ли у обидчика оружие?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_abuser_have_a_weapon'][0],true)?> value="Да" name="abuser_have_a_weapon" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_abuser_have_a_weapon'][0],true)?> value="Нет" name="abuser_have_a_weapon" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Привлекался ли обидчик ранее к уголовной или административной ответственности? ( в т.ч. за насильственные преступления или хранение оружия )</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_abuser_have_a_weapon'][0],true)?> value="Да" name="abuser_was_previously_brought_to_criminal" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_abuser_have_a_weapon'][0],true)?> value="Нет" name="abuser_was_previously_brought_to_criminal" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="yes">
                					<div class="form-group">
                						<textarea class="form-field" name="what_was_brought" id="" col-lgs="30" placeholder="За что привлекался?" rows="10"><?=$meta['statement_what_was_brought'][0]?></textarea>
                						<label for="" class="form-label">За что привлекался?</label>
                					</div>
                					<div class="form-group">
                						<input class="form-field" type="date" name="when_was_brought" placeholder="Когда привлекался" value="<?=$meta['statement_when_was_brought'][0]?>">
                						<label for="" class="form-label">Когда привлекался?</label>
                					</div>
                					<div class="form-group">
                						<input type="file" name="what_was_brought_file" id="">
                						<label for="" class="form-label">По возможности приложите решение</label>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Ранее обидчик вас душил или хватал за горло?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" value="Да" <? checked('Да',$meta['statement_abuser_choked_you'][0],true)?> name="abuser_choked_you" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" value="Нет" <? checked('Нет',$meta['statement_abuser_choked_you'][0],true)?> name="abuser_choked_you" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Угрожал вам и вашим близким убийством и применением насилия?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" value="Да" <? checked('Да',$meta['statement_abuser_threatened_you'][0],true)?> name="abuser_threatened_you" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" value="Нет" <? checked('Нет',$meta['statement_abuser_threatened_you'][0],true)?> name="abuser_threatened_you" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Обидчик склонен к ревности?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_abuser_prone_to_jealousy'][0],true)?> value="Да" name="abuser_prone_to_jealousy" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" value="Нет" <? checked('Нет',$meta['statement_abuser_prone_to_jealousy'][0],true)?>  name="abuser_prone_to_jealousy" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Контролирует большую часть вашей жизни?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_controls_most_of_your_life'][0],true)?>  value="Да" name="controls_most_of_your_life" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_controls_most_of_your_life'][0],true)?> value="Нет" name="controls_most_of_your_life" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Обидчик ограничивал вам свободу?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_abuser_limited_your_freedom'][0],true)?> value="Да" name="abuser_limited_your_freedom" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_abuser_limited_your_freedom'][0],true)?> value="Нет" name="abuser_limited_your_freedom" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Обидчик наносил или угрожал нанести вред домашним животным?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_abuser_harm_pets'][0],true)?> value="Да" name="abuser_harm_pets" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_abuser_harm_pets'][0],true)?> value="Нет" name="abuser_harm_pets" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                			</div>
                			<div class="form-group row">
                				<div class="col-lg-10">
                					<p>Обидчик имеет алкогольную, наркотическую или игровую зависимости?</p>
                				</div>
                				<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
                					<div>
                						<input type="radio" <? checked('Да',$meta['statement_abuser_has_addictions'][0],true)?> value="Да" name="abuser_has_addictions" id="">
                						<span>Да</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Иное',$meta['statement_abuser_has_addictions'][0],true)?> value="Иное" name="abuser_has_addictions" id="">
                						<span>Иное</span>
                					</div>
                					<div>
                						<input type="radio" <? checked('Нет',$meta['statement_abuser_has_addictions'][0],true)?> value="Нет" name="abuser_has_addictions" id="">
                						<span>Нет</span>
                					</div>
                				</div>
                				<div class="another">
                					<div class="form-group">
                						<textarea class="form-field" name="abuser_has_addictions_another" id="" col-lgs="30" placeholder="Опишите?" rows="10"><?=$meta['statement_abuser_has_addictions_another'][0]?></textarea>
                						<label for="" class="form-label">Опишите?</label>
                					</div>
                				</div>
                			</div>
                		</div>
                	</div>
					<? if($can_edit) :?>
					<div class="col-12">
						<div class="row">
							<div class="col-6">
                				<input class="form-field bg-warning border-warning" name="save" type="submit" value="Сохранить">
							</div>
							<div class="col-6">
								<input class="form-field bg-success" name="finish" type="submit" value="Завершить обработку">
							</div>
						</div>
					</div>
					<? else: ?>
					<script>
						jQuery(document).ready(function() {
							jQuery('[name]').attr('disabled','true');
						})
					</script>
					<? endif; ?>
                </div>
                </form>
				<script>
					jQuery(document).ready(function() {
						jQuery('input[name]:checked').trigger('change');
					})
				</script>
                </div>
				<?php get_template_part('template-parts/ads/bottom'); ?>
			</div>
		<div class="download_doc"><a href="?download_doc"><img src="<?=get_template_directory_uri()?>/assets/img/download_doc.png" alt="" srcset=""></a></div>
		<div class="download_pdf"><a href="?download_pdf"><img src="<?=get_template_directory_uri()?>/assets/img/download_pdf.png" alt="" srcset=""></a></div>

		<?php get_template_part('template-parts/single/related'); ?>

	<?php endwhile; ?>

<?php endif; ?>

<?php //get_template_part('template-parts/single/sticky'); ?>

<?php get_footer(); ?>