<?php get_header(); 


if(isset($_POST['send'])) {

	unset($_POST['send']);
	$meta_array = $_POST;
	$meta_array = array_combine(
    	array_map(function($k){ return 'statement_'.$k; }, array_keys($meta_array)),
		$meta_array
	);

	if(!empty($_POST['lastname'].' '.$_POST['firstname'])) {

		$post_array = array(
		    'post_content' => '',
		    'post_title' => $_POST['lastname'].' '.$_POST['firstname'],
		    'post_status' => 'draft',
		    'comment_status' => 'closed',
		    'post_parent' => 0,
		    'post_type' => 'statements',
		    'post_author' => 0,
		    'meta_input'   => $meta_array
		);
			
		$post_id = wp_insert_post( $post_array );
	}
    wp_redirect('/?done');
}?>

<?php $can_display_cover = typology_get_option('front_page_cover_on_first_page') && is_paged() ? false : true; ?>
<?php $cover_class = !typology_get_option( 'front_page_cover' ) || ( typology_get_option( 'front_page_cover' ) && !$can_display_cover ) ? 'typology-cover-empty' : ''; ?>

<div id="typology-cover" class="typology-cover <?php echo esc_attr($cover_class); ?>">
	<?php if( $can_display_cover && ( $front_page_cover = typology_get_option( 'front_page_cover' ) ) ) :  ?>
		<?php get_template_part('template-parts/cover/cover-'. $front_page_cover ); ?>
        <?php if(typology_get_option( 'scroll_down_arrow' )): ?>
            <a href="javascript:void(0)" class="typology-scroll-down-arrow"><i class="fa fa-angle-down"></i></a>
        <?php endif; ?>
	<?php endif; ?>
</div>

<div class="typology-fake-bg">
	<div class="typology-section">
		<?php get_template_part('template-parts/ads/top'); ?>
	
		<?php $can_display_intro = typology_get_option('front_page_intro_on_first_page') && is_paged() ? false : true; ?>
  
		<style>
			div.yes,
			div.no,
			div.another {
				display: none;
			}
		</style>
		<form action="/" method="POST" class="new-order" enctype="multipart/form-data">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="form-group">
						<input class="form-field" required placeholder="Фамилия" type="text" value="<?=$meta['lastname'][0]?>" name="lastname">
						<label for="" class="form-label">Фамилия*</label>
					</div>
					<div class="form-group">
						<input class="form-field" required type="text" name="firstname" placeholder="Имя (имена) и отчество">
						<label for="" class="form-label">Имя (имена) и отчество*</label>
					</div>
					<div class="form-group">
						<span>Пол*</span>
						<div><input type="radio" name="sex" value="male" id="male" required><label for="male">мужской</span></div>
						<div><input type="radio" name="sex" value="female" id="female" required><label for="female">женский</span></div>
					</div>
					<div class="form-group">
						<input class="form-field" max="<?=date('Y-m-d',strtotime('-18 year'))?>" required type="date" name="birthdate" placeholder="Дата рождения">
						<label for="" class="form-label">Дата рождения*</label>
					</div>
					<div class="form-group">
						<input class="form-field" required type="text" name="birthplace" placeholder="Место рождения">
						<label for="" class="form-label">Место рождения* (как указано в паспорте)</label>
					</div>
					<div class="form-group">
						<input class="form-field" required type="text" name="citizenship" placeholder="4. Гражданство">
						<label for="" class="form-label">Гражданство*</label>
					</div>
					<div class="form-group">
						<textarea class="form-field" required name="address" placeholder="Адрес" id="" col-lgs="30" rows="10"></textarea>
						<label for="" class="form-label">Адрес*</label>
						<pre>Укажите полный адрес с индексом. Например, ул. Рабочая, д. 8, к. 4, кв. 3, г. Мытищи, Московская область, 110000, Россия. <br>Это должен быть домашний адрес, по которому вы фактически сможете получать письма, причем желательно в ближайшие несколько лет</pre>
					</div>
					<div class="form-group">
						<input class="form-field" required type="text" name="phone" placeholder="Номер телефона (включая международный код страны)">
						<label for="" class="form-label">Номер телефона* (включая международный код страны)</label>
					</div>
					<div class="form-group">
						<input class="form-field" type="text" name="email" placeholder="Адрес электронной почты (если имеется)">
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
				<pre>ВАЖНО! Описывать с конца, от самого последнего к самому раннему</pre>
				<section class="section_episode">
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Подвергались ли вы одному из следующих видов физического насилия? (душил, бил по лицу, ногам, щипал, выкручивание рук, толчки, хватание за волосы, прижигание сигаретами, иное)</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="have_abused" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="have_abused" id="">
								<span>Нет</span>
							</div>
						</div>					
					</div>
					<div class="form-group">
						<input class="form-field" type="date" name="date_of_incident" placeholder="Дата инцидента">
						<label for="" class="form-label">Дата инцидента</label>
					</div>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Обращались ли вы в медицинское учреждение?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="visited_medical" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="visited_medical" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group">
								<input class="form-field" type="date" name="date_hospital_visit" placeholder="Дата обращения в медицинское учреждение">
								<label for="" class="form-label">Дата обращения в медицинское учреждение</label>
							</div>
							<p>Если вы обратились в медицинскую организацию спустя несколько дней с момента побоев, объясните почему  например, агрессор держал вас взаперти в квартире, вы не могли пойти в больницу в связи с уходом за маленькими детьми </p>
							<div class="form-group">
								<textarea class="form-field" name="explanation_yes" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
								<label class="form-label">Объяснение</label>
							</div>
							<div class="form-group">
								<textarea class="form-field" name="hospital_name" id="" col-lgs="30" placeholder="Наименование медицинской организации, куда вы обратились в связи с побоями" rows="4"></textarea>
								<label class="form-label">Наименование медицинской организации, куда вы обратились в связи с побоями (выпишите из медицинского документа)</label>
							</div>
							<div class="form-group">
								<textarea class="form-field" name="doc_title_date" id="" col-lgs="30" placeholder="Заголовок и дата документа" rows="4"></textarea>
								<label class="form-label">Заголовок и дата документа (Например, выписка из медицинской карты №123 от 01.01.2021 , справка травмпункта №123 от 01.01.2021)</label>
							</div>
							<div class="form-group">
								<input type="file" name="doc_file" id="doc_file" placeholder="Прикрепите файл" accept=".jpg, .png, .jpeg, .gif, .bmp, .pdf, application/pdf" class="d-none">
								<label for="doc_file" class="btn btn-outline-dark">Загрузите медицинские документы</label>
							</div>
							<div class="form-group">
								<textarea class="form-field" name="diagnosis" id="" col-lgs="30" placeholder="Выпишите диагноз из медицинского документа" rows="5"></textarea>
								<label class="form-label">Выпишите диагноз из медицинского документа (если вам не выдали письменный документ, пожалуйста, обратитесь за копией сейчас)</label>
							</div>
							<div class="form-group">
								<textarea class="form-field" name="further_treatment" id="" col-lgs="30" placeholder="Дальнейшее лечение, если было назначено" rows="10"></textarea>
								<label class="form-label">Дальнейшее лечение, если было назначено</label>
							</div>
						</div>
						<div class="no">
							<br>
							<p>Если вы не обратились в медицинскую организацию, объясните почему (например, агрессор держал вас взаперти в квартире, вы не могли пойти в больницу в связи с уходом за маленькими детьми) </p>
							<div class="form-group">
								<textarea class="form-field" name="explanation_no" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
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
								<input type="radio" value="Да" name="visited_police" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="visited_police" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group">
								<input class="form-field" type="date" name="date_police_visit" placeholder="Дата обращения в полицию">
								<label for="" class="form-label">Дата обращения в полицию (звонок 112 - время и дата звонка, обращение через интернет-приемную - копия письма с номером обращения, КУСП)</label>
							</div>
							<div class="form-group">
								<input class="form-field" type="text" data-desc="Документ, подтверждающий обращение в полицию" name="visited_police_title" placeholder="Наименование документа" id="visited_police_title">
								<label class="form-label">Наименование документа</label>
							</div>
							<div class="form-group">
								<textarea class="form-field" name="police_name" id="" col-lgs="30" placeholder="Наименование отдела полиции выпишите из документа" rows="2"></textarea>
								<label class="form-label">Наименование отдела полиции (выпишите из документа)</label>
							</div>
							<p>Если вы обратились спустя несколько дней с момента побоев, объясните почему (Прим.,  агрессор держал вас взаперти в квартире, вы опасались за свою жизнь и здоровье, вы не могли пойти в связи с уходом за маленькими детьми)</p>
							<div class="form-group">
								<textarea class="form-field" name="explanation_police_yes" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
								<label class="form-label">Объяснение</label>
							</div>
							<div class="form-group">
								<p>Прикрепите приложение Подтверждение обращения в полицию - КУСП, Заявление</p>
								<input type="file" data-desc="Документ, подтверждающий обращение в полицию" name="visited_police_file" id="visited_police_file" accept=".jpg, .png, .jpeg, .gif, .bmp, .pdf, application/pdf" class="d-none">
								<label for="visited_police_file" class="btn btn-outline-dark">Загрузить подтверждения обращения в полицию</label>
							</div>
							<div class="form-group row">
								<div class="col-lg-10">
									<p>На опросе или в беседе вели ли себя сотрудники полиции некорректно?</p>
									<pre>задавали ли вам вопросы, чем вы спровоцировали агрессора, обсуждали ваш внешний вид, убеждали забрать заявление, иное</pre>
								</div>
								<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
									<div>
										<input type="radio" value="Да" name="incorrectly" id="">
										<span>Да</span>
									</div>
									<div>
										<input type="radio" value="Нет" name="incorrectly" id="">
										<span>Нет</span>
									</div>
								</div>
								<div class="yes">
									<div class="form-group">
										<textarea class="form-field" name="incorrectly_desc" id="" col-lgs="30" placeholder="Опишите некорректное поведение" rows="10"></textarea>
										<label class="form-label">Опишите некорректное поведение</label>
									</div>
								</div>					
							</div>
							<div class="form-group row">
								<div class="col-lg-10">
									<p>Назначила ли полиция Судебно-Медицинскую экспертизу/обследование по вашим телесным повреждениям?</p>
								</div>
								<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
									<div>
										<input type="radio" value="Да" name="was_medical_expertise" id="">
										<span>Да</span>
									</div>
									<div>
										<input type="radio" value="Нет" name="was_medical_expertise" id="">
										<span>Нет</span>
									</div>
								</div>
								<div class="yes">
									<div class="form-group">
										<input class="form-field" type="date" name="appointment_date_medical_expertise" placeholder="Дата назначения СМЭ">
										<label for="" class="form-label">Дата назначения СМЭ</label>
									</div>
									<div class="form-group">
										<input class="form-field" type="date" name="date_medical_expertise" placeholder="Дата проведения СМЭ">
										<label for="" class="form-label">Дата проведения СМЭ</label>
									</div>
									<div class="form-group">
										<textarea class="form-field" name="diagnosis_medical_expertise" id="" col-lgs="30" placeholder="Диагноз СМЭ" rows="10"></textarea>
										<label class="form-label">Диагноз СМЭ</label>
									</div>
								</div>
							</div>
							<div class="form-group">
								<p>Какое решение было принято полицией по вашему заявлению</p>
								<select name="police_decision_on_application" id="police_decision_on_application">
									<option selected>полиция не ответила</option>
									<option>отказ в возбуждении уголовного дела</option>
									<option>отказ в возбуждении дела об административном правонарушении</option>
									<option>постановление о возбуждении уголовного дела</option>
									<option>постановление о возбуждении дела об административном правонарушении</option>
									<option>постановление о возбуждении административного расследования</option>
								</select>
								<div class="police_decision_on_application_additional d-none">
									<div class="form-group date">
										<input type="date" name="police_decision_on_application_date" id="" placeholder="Дата решения">
										<label class="form-label">Дата решения</label>
									</div>	
									<div class="form-group file">
										<div class="form-group file">
											<input type="file" data-desc="Документ, подтверждающий обращение в полицию" name="police_decision_on_application_file" id="police_decision_on_application_file" accept=".jpg, .png, .jpeg, .gif, .bmp, .pdf, application/pdf" class="d-none">
											<label for="police_decision_on_application_file" class="btn btn-outline-dark">Прикрепите файл</label>
										</div>
									</div>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-lg-10">
									<p>Было ли назначено административное или уголовное наказание агрессору?</p>
								</div>
								<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
									<div>
										<input type="radio" value="Да" name="was_an_administrative_or_criminal_penalty_imposed" id="">
										<span>Да</span>
									</div>
									<div>
										<input type="radio" value="Нет" name="was_an_administrative_or_criminal_penalty_imposed" id="">
										<span>Нет</span>
									</div>
								</div>
								<div class="yes">
									<div class="form-group">
										<select name="decision_in_a_case_on_an_administrative_offense" id="">
											<option selected>прекращение дела</option>
											<option>штраф</option>
											<option>административный арест</option>
											<option>обязательные работы</option>
											<option>замечание</option>
										</select>
										<label class="form-label">Решение по делу об административном правонарушении</label>
										<div class="decision_in_a_case_on_an_administrative_offense_additional">
											<div class="form-group amount">
												<input type="text" name="decision_in_a_case_on_an_administrative_offense_additional_amount" id="" placeholder="укажите размер">
												<label class="form-label">укажите размер</label>
											</div>	
											<div class="form-group date">
												<input type="date" name="decision_in_a_case_on_an_administrative_offense_additional_date" id="" placeholder="Дата решения">
												<label class="form-label">Дата решения</label>
											</div>	
											<div class="form-group file">
												<input type="file" name="decision_in_a_case_on_an_administrative_offense_additional_file" id="decision_in_a_case_on_an_administrative_offense_additional_file" placeholder="Прикрепите файл" style="display:none">
												<label for="decision_in_a_case_on_an_administrative_offense_additional_file" class="btn btn-outline-dark">Прикрепите файл</label>
											</div>
										</div>
									</div>
									<div class="form-group">
										<select name="decision_in_a_criminal_case" id="">
											<option selected>прекращение дела</option>
											<option>обязательные работы</option>
											<option>исправительные работы</option>
											<option>принудительные работы</option>
											<option>арест </option>
											<option>лишение свободы с отбыванием наказания в колонии </option>
											<option>лишение свободы условно </option>
										</select>
										<label class="form-label">Решение по уголовному делу</label>
										<div class="decision_in_a_criminal_case_additional">
											<div class="form-group amount">
												<input type="text" name="decision_in_a_criminal_case_additional_amount" id="" placeholder="укажите размер">
												<label class="form-label">укажите размер</label>
											</div>	
											<div class="form-group date">
												<input type="date" name="decision_in_a_criminal_case_additional_date" id="" placeholder="Дата решения">
												<label class="form-label">Дата решения</label>
											</div>	
											<div class="form-group file">
												<input type="file" name="decision_in_a_criminal_case_additional_file" id="decision_in_a_criminal_case_additional_file" placeholder="Прикрепите файл" style="display:none">
												<label for="decision_in_a_criminal_case_additional_file" class="btn btn-outline-dark">Прикрепите файл</label>
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
								<textarea class="form-field" name="visited_police_explanation_no" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
								<label class="form-label">Объяснение</label>
							</div>
						</div>			
					</div>
					
				<div class="after_checked">
					<h6>Подробные вопросы</h6>
					<div class="col-lg-12">
						<p>Кто нанес вам побои</p>
						<div class="form-group">
							<input class="form-field" type="text" name="who_beat_you" placeholder="ФИО">
							<label for="" class="form-label">ФИО</label>
						</div>
					</div>
					
					<div class="form-group">
						<input class="form-field" type="text" name="who_is_the_aggressor_to_you" placeholder="Кем приходится вам агрессор?">
						<label for="" class="form-label">Кем приходится вам агрессор?</label>
					</div>
					
					<div class="form-group">
						<input class="form-field" type="date" name="relationship_start_date" placeholder="Дата начала отношений">
						<label for="" class="form-label">Дата начала отношений</label>
					</div>
					
					<div class="form-group">
						<input class="form-field" type="date" name="date_of_marriage" placeholder="дата заключения брака">
						<label for="" class="form-label">Дата заключения брака</label>
					</div>

					<div class="form-group row">
						<div class="col-lg-10">
							<p>Работает ли агрессор в правоохранительных органах?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="aggressor_work_in_law_enforcement" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="aggressor_work_in_law_enforcement" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="col-lg-12">
								<div class="form-group">
									<input class="form-field" type="text" name="aggressor_work_in_law_enforcement_position" placeholder="укажите учреждение и должность">
									<label for="" class="form-label">укажите учреждение и должность</label>
								</div>
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<textarea class="form-field" name="place_of_the_beating" id="" col-lgs="30" placeholder="Место (адрес) нанесения побоев" rows="10"></textarea>
						<label class="form-label">Место (адрес) нанесения побоев</label>
					</div>
					
					<div class="form-group">
						<textarea class="form-field" name="where_was_the_beatings" id="" col-lgs="30" placeholder="Опишите какие именно наносились побои, по каким частям тела, сколько раз" rows="10"></textarea>
						<label class="form-label">Опишите какие именно наносились побои, по каким частям тела, сколько раз <small>(прим., душил, бил по лицу, ногам, щипал, выкручивание рук, толчки, хватание за волосы, прижигание сигаретами)</small></label>
					</div>
					
					<div class="form-group">
						<textarea class="form-field" name="which_part_of_the_body_hit" id="" col-lgs="30" placeholder="Какой частью тела агрессор наносил удары?" rows="10"></textarea>
						<label class="form-label">Чем агрессор наносил удары? (Руками, ногами, бита, палка, утюг, итд) </label>
					</div>
					
					<div class="form-group">
						<textarea class="form-field" name="how_long_did_the_beating" id="" col-lgs="30" placeholder="Сколько времени продолжалось избиение?" rows="10"></textarea>
						<label class="form-label">Сколько времени продолжалось избиение? Какое общее количество ударов было нанесено?</label>
					</div>
					<pre>Если ответы "нет", не пишите их, только если утвердительные</pre>
					
					<div class="form-group">
						<textarea class="form-field" name="aggressor_insult_you" id="" col-lgs="30" placeholder="Высказывал ли агрессор оскорбления в ваш адрес? Если да, то процитируйте" rows="10"></textarea>
						<label class="form-label">Высказывал ли агрессор оскорбления в ваш адрес? Если да, то процитируйте</label>
					</div>
					
					<div class="form-group">
						<textarea class="form-field" name="aggressor_make_threats_you" id="" col-lgs="30" placeholder="Высказывал ли агрессор угрозы убийством или здоровья в ваш адрес или адрес ваших детей, других близких людей? Если да, то процитируйте" rows="10"></textarea>
						<label class="form-label">Высказывал ли агрессор угрозы убийством или причинением вреда здоровью в ваш адрес, других близких людей? Если да, то процитируйте</label>
					</div>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Были ли вы беременны во время насилия?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="were_you_pregnant" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="were_you_pregnant" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group">
								<select name="gestational_age" id="">
									<option value="1 неделя">1 неделя</option>
									<option value="2 неделя">2 неделя</option>
									<option value="3 неделя">3 неделя</option>
									<option value="4 неделя">4 неделя</option>
									<option value="5 неделя">5 неделя</option>
									<option value="6 неделя">6 неделя</option>
									<option value="7 неделя">7 неделя</option>
									<option value="8 неделя">8 неделя</option>
									<option value="9 неделя">9 неделя</option>
									<option value="10 неделя">10 неделя</option>
									<option value="11 неделя">11 неделя</option>
									<option value="12 неделя">12 неделя</option>
									<option value="13 неделя">13 неделя</option>
									<option value="14 неделя">14 неделя</option>
									<option value="15 неделя">15 неделя</option>
									<option value="16 неделя">16 неделя</option>
									<option value="17 неделя">17 неделя</option>
									<option value="18 неделя">18 неделя</option>
									<option value="19 неделя">19 неделя</option>
									<option value="20 неделя">20 неделя</option>
									<option value="21 неделя">21 неделя</option>
									<option value="22 неделя">22 неделя</option>
									<option value="23 неделя">23 неделя</option>
									<option value="24 неделя">24 неделя</option>
									<option value="25 неделя">25 неделя</option>
									<option value="26 неделя">26 неделя</option>
									<option value="27 неделя">27 неделя</option>
									<option value="28 неделя">28 неделя</option>
									<option value="29 неделя">29 неделя</option>
									<option value="30 неделя">30 неделя</option>
									<option value="31 неделя">31 неделя</option>
									<option value="32 неделя">32 неделя</option>
									<option value="33 неделя">33 неделя</option>
									<option value="34 неделя">34 неделя</option>
									<option value="35 неделя">35 неделя</option>
									<option value="36 неделя">36 неделя</option>
									<option value="37 неделя">37 неделя</option>
									<option value="38 неделя">38 неделя</option>
									<option value="39 неделя">39 неделя</option>
									<option value="40 неделя">40 неделя</option>
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
								<input type="radio" value="Да" name="sick_during_the_violence" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="sick_during_the_violence" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">	
							<div class="form-group">
								<input class="form-field" type="text" name="sick_during_the_violence_name" placeholder="Укажите чем">
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
								<input type="radio" value="Да" name="were_on_maternity_during_the_violence" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="were_on_maternity_during_the_violence" id="">
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
								<input type="radio" value="Да" name="have_a_disability" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="have_a_disability" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group">
								<select name="have_a_disability_power" id="">
									<option value="1 степень">1 степень</option>
									<option value="2 степень">2 степень</option>
									<option value="3 степень">3 степень</option>
									<option value="4 степень">4 степень</option>
								</select>
								<label class="form-label">Укажите степень</label>
							</div>
							<div class="form-group">
								<input class="form-field" type="text" name="have_a_disability_disease" placeholder="Укажите заболевание">
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
								<input type="radio" value="Да" name="were_there_any_witnesses" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="were_there_any_witnesses" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group">
								<textarea class="form-field" name="what_the_witnesses_see" id="" col-lgs="30" placeholder="Где они находились? Что видели, слышали?" rows="10"></textarea>
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
								<input type="radio" value="Да" name="children_was_in_house_last_episode" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="children_was_in_house_last_episode" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group row">
								<div class="col-lg-10 only_after_ones_episode" style="display:none;">
									<p>Это тот же ребёнок?</p>
								</div>
								<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly only_after_ones_episode" style="display:none !important">
									<div>
										<input type="radio" value="Да" name="same_child" id="">
										<span>Да</span>
									</div>
									<div>
										<input type="radio" value="Нет" name="same_child" id="">
										<span>Нет</span>
									</div>
								</div>
								
								<div class="form-group">
									<input type="checkbox" name="consent_personal_data_child" style="margin-right: 10px;">
									<span for="">Я даю согласие об обработке персональных данных ребёнка</span>
								</div>
								<div class="none" style="display:block;">
									<div class="form-group row">
										<div class="col-lg-10">
											<p>Обращались ли вы в медицинское учреждение?</p>
										</div>
										<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
											<div>
												<input type="radio" value="Да" name="children_visited_medical" id="">
												<span>Да</span>
											</div>
											<div>
												<input type="radio" value="Нет" name="children_visited_medical" id="">
												<span>Нет</span>
											</div>
										</div>
										<div class="yes">
											<div class="form-group">
												<input class="form-field" type="date" name="children_date_hospital_visit" placeholder="Дата обращения в медицинское учреждение">
												<label for="" class="form-label">Дата обращения в медицинское учреждение</label>
											</div>
											<p>Если вы обратились в медицинскую организацию спустя несколько дней с момента побоев, объясните почему  например, агрессор держал вас взаперти в квартире, вы не могли пойти в больницу в связи с уходом за маленькими детьми </p>
											<div class="form-group">
												<textarea class="form-field" name="children_explanation_yes" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
												<label class="form-label">Объяснение</label>
											</div>
											<div class="form-group">
												<textarea class="form-field" name="children_hospital_name" id="" col-lgs="30" placeholder="Наименование медицинской организации, куда вы обратились в связи с побоями" rows="2"></textarea>
												<label class="form-label">Наименование медицинской организации, куда вы обратились в связи с побоями (выпишите из медицинского документа)</label>
											</div>
											<div class="form-group">
												<textarea class="form-field" name="children_doc_title_date" id="" col-lgs="30" placeholder="Заголовок и дата документа" rows="4"></textarea>
												<label class="form-label">Заголовок и дата документа (Например, выписка из медицинской карты №123 от 01.01.2021 , справка травмпункта №123 от 01.01.2021)</label>
											</div>
											<div class="form-group">
												<input type="file" name="children_doc_file" id="" placeholder="Прикрепите файл" accept=".jpg, .png, .jpeg, .gif, .bmp, .pdf, application/pdf">
											</div>
											<div class="form-group">
												<textarea class="form-field" name="children_diagnosis" id="" col-lgs="30" placeholder="Выпишите диагноз из медицинского документа" rows="10"></textarea>
												<label class="form-label">Выпишите диагноз из медицинского документа (если вам не выдали письменный документ, пожалуйста, обратитесь за копией сейчас)</label>
											</div>
											<div class="form-group">
												<textarea class="form-field" name="children_further_treatment" id="" col-lgs="30" placeholder="Дальнейшее лечение, если было назначено" rows="10"></textarea>
												<label class="form-label">Дальнейшее лечение, если было назначено</label>
											</div>
										</div>
										<div class="no">
											<br>
											<p>Если вы не обратились в медицинскую организацию, объясните почему (например, агрессор держал вас взаперти в квартире, вы не могли пойти в больницу в связи с уходом за маленькими детьми) </p>
											<div class="form-group">
												<textarea class="form-field" name="children_explanation_no" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
												<label class="form-label">Объяснение</label>
											</div>
										</div>		
									</div>
									<div class="form-group row">
										<div class="col-lg-10">
											<p>Есть ли физические последствия?</p>
										</div>
										<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
											<div>
												<input type="radio" value="Да" name="chilren_get_a_damage_last_episode" id="">
												<span>Да</span>
											</div>
											<div>
												<input type="radio" value="Нет" name="chilren_get_a_damage_last_episode" id="">
												<span>Нет</span>
											</div>
										</div>
										<div class="yes">
											<div class="form-group">
												<textarea class="form-field" name="chilren_get_a_damage_yes_last_episode" id="" col-lgs="30" placeholder="Выпишите из медицинского документа" rows="10"></textarea>
												<label for="" class="form-label">Выпишите из медицинского документа</label>
											</div>
										</div>
									</div>
									<div class="form-group row">
										<div class="col-lg-10">
											<p>Есть ли психологические последствия?</p>
											<pre>(Например, испугался, заплакал, стал плохо спать, стал замкнутым и т.п.)</pre>
										</div>
										<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
											<div>
												<input type="radio" value="Да" name="chilren_get_a_psychological_damage_last_episode" id="">
												<span>Да</span>
											</div>
											<div>
												<input type="radio" value="Нет" name="chilren_get_a_psychological_damage_last_episode" id="">
												<span>Нет</span>
											</div>
										</div>
										<div class="yes">
											<div class="form-group">
												<textarea class="form-field" name="chilren_get_a_psychological_damage_opinion_last_episode" id="" col-lgs="30" placeholder="Выпишите из медицинского документа/медицинской карты ребенка/заключения психолога" rows="10"></textarea>
												<label for="" class="form-label">Выпишите из медицинского документа/медицинской карты ребенка/заключения психолога</label>
											</div>
											<div class="form-group">
												<textarea class="form-field" name="chilren_get_a_psychological_damage_aftermath_last_episode" id="" col-lgs="30" placeholder="Опишите, что ребенок видел, что чувствовал." rows="10"></textarea>
												<label for="" class="form-label">Опишите, что ребенок видел, что чувствовал.</label>
											</div>
											<div class="form-group">
												<p>Если обращались к психологу, приложите заключение</p>
												<input type="file" name="chilren_get_a_psychological_damage_file_last_episode" id="">
											</div>
										</div>
										
										<h6>Если у вас нет возможности обратиться к психологу, напишите <a href="">нам</a></h6>
										<pre>Мы рассмотрим возможность предоставления Вам психолога, наши ресурсы ограничены, но мы постараемся предоставить бесплатную психологическую помощь, если дело приемлемо для ЕСПЧ, и связываем с дружественной организацией, если неприемлемо для ЕСПЧ</pre>
										<br>
									</div>
									<div class="form-group row">
										<div class="col-lg-10">
											<p>Обращались ли вы в полицию?</p>
										</div>
										<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
											<div>
												<input type="radio" value="Да" name="children_visited_police" id="">
												<span>Да</span>
											</div>
											<div>
												<input type="radio" value="Нет" name="children_visited_police" id="">
												<span>Нет</span>
											</div>
										</div>
										<div class="yes">
											<div class="form-group">
												<input class="form-field" type="date" name="children_date_police_visit" placeholder="Дата обращения в полицию">
												<label for="" class="form-label">Дата обращения в полицию (звонок 112 - время и дата звонка, обращение через интернет-приемную - копия письма с номером обращения, КУСП)</label>
											</div>
											<div class="form-group">
												<p>Наименование документа, дата, прикрепить приложение Подтверждение обращения в полицию - КУСП, Заявление</p>
												<input type="file" data-desc="Документ, подтверждающий обращение в полицию" name="children_visited_police_file" id="">
											</div>
											<p>Если вы обратились спустя несколько дней с момента побоев, объясните почему (Прим.,  агрессор держал вас взаперти в квартире, вы опасались за свою жизнь и здоровье, вы не могли пойти в связи с уходом за маленькими детьми)</p>
											<div class="form-group">
												<textarea class="form-field" name="children_explanation_police_yes" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
												<label class="form-label">Объяснение</label>
											</div>
											<div class="form-group">
												<textarea class="form-field" name="children_police_name" id="" col-lgs="30" placeholder="Наименование отдела полиции выпишите из документа" rows="10"></textarea>
												<label class="form-label">Наименование отдела полиции (выпишите из документа)</label>
											</div>
											<div class="form-group row">
												<div class="col-lg-10">
													<p>На опросе или в беседе вели ли себя сотрудники полиции некорректно?</p>
													<pre>задавали ли вам вопросы, чем вы спровоцировали агрессора, обсуждали ваш внешний вид, убеждали забрать заявление, иное</pre>
												</div>
												<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
													<div>
														<input type="radio" value="Да" name="children_incorrectly" id="">
														<span>Да</span>
													</div>
													<div>
														<input type="radio" value="Нет" name="children_incorrectly" id="">
														<span>Нет</span>
													</div>
												</div>
												<div class="yes">
													<div class="form-group">
														<textarea class="form-field" name="children_incorrectly_desc" id="" col-lgs="30" placeholder="Опишите некорректное поведение" rows="10"></textarea>
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
														<input type="radio" value="Да" name="children_was_medical_expertise" id="">
														<span>Да</span>
													</div>
													<div>
														<input type="radio" value="Нет" name="children_was_medical_expertise" id="">
														<span>Нет</span>
													</div>
												</div>
												<div class="yes">
													<div class="form-group">
														<input class="form-field" type="date" name="children_appointment_date_medical_expertise" placeholder="Дата назначения СМЭ">
														<label for="" class="form-label">Дата назначения СМЭ</label>
													</div>
													<div class="form-group">
														<input class="form-field" type="date" name="children_date_medical_expertise" placeholder="Дата проведения СМЭ">
														<label for="" class="form-label">Дата проведения СМЭ</label>
													</div>
													<div class="form-group">
														<textarea class="form-field" name="children_diagnosis_medical_expertise" id="" col-lgs="30" placeholder="Диагноз СМЭ" rows="10"></textarea>
														<label class="form-label">Диагноз СМЭ</label>
													</div>
												</div>
											</div>
											<div class="form-group">
												<select name="children_police_decision_on_application" id="police_decision_on_application">
													<option selected>полиция не ответила</option>
													<option>отказ в возбуждении уголовного дела</option>
													<option>отказ в возбуждении дела об административном правонарушении</option>
													<option>постановление о возбуждении уголовного дела</option>
													<option>постановление о возбуждении дела об административном правонарушении</option>
													<option>постановление о возбуждении административного расследования</option>
												</select>
												<div class="police_decision_on_application_additional d-none">
													<div class="form-group date">
														<input type="date" name="children_police_decision_on_application_date" id="" placeholder="Дата решения">
														<label class="form-label">Дата решения</label>
													</div>	
													<div class="form-group file">
														<input type="file" data-desc="Документ, подтверждающий обращение в полицию" name="children_police_decision_on_application_file" id="children_police_decision_on_application_file" accept=".jpg, .png, .jpeg, .gif, .bmp, .pdf, application/pdf" class="d-none">
														<label for="children_police_decision_on_application_file" class="btn btn-outline-dark">Прикрепите файл</label>
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
														<input type="radio" value="Да" name="children_was_an_administrative_or_criminal_penalty_imposed" id="">
														<span>Да</span>
													</div>
													<div>
														<input type="radio" value="Нет" name="children_was_an_administrative_or_criminal_penalty_imposed" id="">
														<span>Нет</span>
													</div>
												</div>
												<div class="yes">
													<div class="form-group">
														<select name="children_decision_in_a_case_on_an_administrative_offense" id="">
															<option selected>прекращение дела</option>
															<option>штраф</option>
															<option>административный арест</option>
															<option>обязательные работы</option>
															<option>замечание</option>
														</select>
														<label class="form-label">Решение по делу об административном правонарушении</label>
														<div class="decision_in_a_case_on_an_administrative_offense_additional">
															<div class="form-group amount">
																<input type="text" name="children_decision_in_a_case_on_an_administrative_offense_additional_amount" id="" placeholder="укажите размер">
																<label class="form-label">укажите размер</label>
															</div>	
															<div class="form-group date">
																<input type="date" name="children_decision_in_a_case_on_an_administrative_offense_additional_date" id="" placeholder="Дата решения">
																<label class="form-label">Дата решения</label>
															</div>	
															<div class="form-group file">
																<input type="file" name="children_decision_in_a_case_on_an_administrative_offense_additional_file" id="" placeholder="Прикрепите файл">
																<label class="form-label">Прикрепите файл</label>
															</div>
														</div>
													</div>
													<div class="form-group">
														<select name="children_decision_in_a_criminal_case" id="">
															<option selected>прекращение дела</option>
															<option>обязательные работы</option>
															<option>исправительные работы</option>
															<option>принудительные работы</option>
															<option>арест </option>
															<option>лишение свободы с отбыванием наказания в колонии </option>
															<option>лишение свободы условно </option>
														</select>
														<label class="form-label">Решение по уголовному делу</label>
														<div class="decision_in_a_criminal_case_additional">
															<div class="form-group amount">
																<input type="text" name="children_decision_in_a_criminal_case_additional_amount" id="" placeholder="укажите размер">
																<label class="form-label">укажите размер</label>
															</div>	
															<div class="form-group date">
																<input type="date" name="children_decision_in_a_criminal_case_additional_date" id="" placeholder="Дата решения">
																<label class="form-label">Дата решения</label>
															</div>	
															<div class="form-group file">
																<input type="file" name="children_decision_in_a_criminal_case_additional_file" id="" placeholder="Прикрепите файл">
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
												<textarea class="form-field" name="children_visited_police_explanation_no" id="" col-lgs="30" placeholder="Объяснение" rows="10"></textarea>
												<label class="form-label">Объяснение</label>
											</div>
										</div>			
									</div>
									<div class="col-lg-12">
										<p>Персональные данные ребенка</p>
										<div class="form-group">
											<input class="form-field" required placeholder="1. Фамилия" type="text" name="children_lastname_last_episode">
											<label for="" class="form-label">Фамилия</label>
										</div>
										<div class="form-group">
											<input class="form-field" required type="text" name="children_firstname_last_episode" placeholder="Имя (имена) и отчество">
											<label for="" class="form-label">Имя и отчество</label>
										</div>
										<div class="form-group">
											<span>Пол</span>
											<div><input type="radio" name="children_sex_last_episode" value="male" id="male" required><label for="male">мужской</span></div>
											<div><input type="radio" name="children_sex_last_episode" value="female" id="female" required><label for="female">женский</span></div>
										</div>
										<div class="form-group">
											<input class="form-field" required type="date" name="children_birthdate_last_episode" placeholder="Дата рождения">
											<label for="" class="form-label">Дата рождения</label>
										</div>
										<div class="form-group">
											<input class="form-field" required type="text" name="children_birthplace_last_episode" placeholder="Место рождения">
											<label for="" class="form-label">Место рождения (как указано в паспорте)</label>
										</div>
										<div class="form-group">
											<input class="form-field" required type="text" name="children_citizenship_last_episode" placeholder="4. Гражданство">
											<label for="" class="form-label">Гражданство</label>
										</div>
										<div class="form-group">
											<textarea class="form-field" required name="children_address_last_episode" placeholder="Адрес" id="" col-lgs="30" rows="10"></textarea>
											<label for="" class="form-label">Адрес</label>
											<pre>Укажите полный адрес с индексом. Например, ул. Рабочая, д. 8, к. 4, кв. 3, г. Мытищи, Московская область, 110000, Россия. <br>Это должен быть домашний адрес, по которому вы фактически сможете получать письма, причем желательно в ближайшие несколько лет</pre>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
					<br><br>
				</section>
					
					<a href="#" class="add_episode btn btn-outline-info">Добавить эпизод</a>
						
					<br><br>
					<h6>Факторы риска агрессора</h6>
					<br>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Применял ли агрессор ранее насилие по отношению к вам или другому лицу?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_has_previously_used_violence_against_you" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_has_previously_used_violence_against_you" id="">
								<span>Нет</span>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Имеется ли у агрессора оружие?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_have_a_weapon" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_have_a_weapon" id="">
								<span>Нет</span>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Привлекался ли агрессор ранее к уголовной или административной ответственности?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_was_previously_brought_to_criminal" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_was_previously_brought_to_criminal" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group">
								<textarea class="form-field" name="what_was_brought" id="" col-lgs="30" placeholder="За что привлекался?" rows="10"></textarea>
								<label for="" class="form-label">За что привлекался?</label>
							</div>
							<div class="form-group">
								<input class="form-field" type="date" name="when_was_brought" placeholder="Когда привлекался">
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
							<p>Ранее агрессор вас душил или хватал за горло?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_choked_you" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_choked_you" id="">
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
								<input type="radio" value="Да" name="abuser_threatened_you" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_threatened_you" id="">
								<span>Нет</span>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Агрессор склонен к ревности?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_prone_to_jealousy" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_prone_to_jealousy" id="">
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
								<input type="radio" value="Да" name="controls_most_of_your_life" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="controls_most_of_your_life" id="">
								<span>Нет</span>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Агрессор ограничивал вам свободу?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_limited_your_freedom" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_limited_your_freedom" id="">
								<span>Нет</span>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-lg-10">
							<p>Агрессор наносил или угрожал нанести вред домашним животным?</p>
						</div>
						<div class="align-items-baseline col-lg-2 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_harm_pets" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_harm_pets" id="">
								<span>Нет</span>
							</div>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-lg-9">
							<p>Агрессор имеет алкогольную, наркотическую или игровую зависимости?</p>
						</div>
						<div class="align-items-baseline col-lg-3 d-flex justify-content-evenly">
							<div>
								<input type="radio" value="Да" name="abuser_has_addictions" id="">
								<span>Да</span>
							</div>
							<div>
								<input type="radio" value="Нет" name="abuser_has_addictions" id="">
								<span>Нет</span>
							</div>
						</div>
						<div class="yes">
							<div class="form-group">
								<textarea class="form-field" name="abuser_has_addictions_yes" id="" col-lgs="30" placeholder="Опишите?" rows="10"></textarea>
								<label for="" class="form-label">Опишите?</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<input class="form-field" type="submit" name="send" value="Отправить">
		</div>
		</form>
		
		<?php get_template_part('template-parts/ads/bottom'); ?>
	</div>
	<script>
		jQuery(document).ready(function() {
			
		});
	</script>

<?php get_footer(); ?>
