////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */

function initPreload(){
	let userLang = "en";
	if (navigator.language[0] + navigator.language[1] === "en" || navigator.language[0] + navigator.language[1] === "ru" || navigator.language[0] + navigator.language[1] === "tr") {
		userLang = navigator.language[0] + navigator.language[1]
	}
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkMobileOrientation, 1000);
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/' + userLang + '/background.png', id:'background'},
			{src:'assets/' + userLang + '/background_p.png', id:'backgroundP'},
			{src:'assets/' + userLang + '/logo.png', id:'logo'},
			{src:'assets/' + userLang + '/logo_p.png', id:'logoP'},
			{src:'assets/' + userLang + '/button_start.png', id:'buttonStart'},
			{src:'assets/' + userLang + '/button_levels.png', id:'buttonLevels'},
			{src:'assets/' + userLang + '/button_back.png', id:'buttonBack'},

			{src:'assets/' + userLang + '/button_select_level.png', id:'itemLevel'},
			{src:'assets/' + userLang + '/button_select_level_unlock.png', id:'itemLevelUnlocked'},
			{src:'assets/' + userLang + '/button_select.png', id:'buttonSelect'},
			{src:'assets/' + userLang + '/button_arrow_left.png', id:'buttonArrowL'},
			{src:'assets/' + userLang + '/button_arrow_right.png', id:'buttonArrowR'},
		
			{src:'assets/' + userLang + '/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/' + userLang + '/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/' + userLang + '/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/' + userLang + '/button_continue.png', id:'buttonContinue'},
			{src:'assets/' + userLang + '/item_pop.png', id:'itemPop'},
			{src:'assets/' + userLang + '/item_pop_p.png', id:'itemPopP'},
			{src:'assets/' + userLang + '/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/' + userLang + '/button_cancel.png', id:'buttonCancel'},
			{src:'assets/' + userLang + '/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/' + userLang + '/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/' + userLang + '/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/' + userLang + '/button_music_on.png', id:'buttonMusicOn'},
			{src:'assets/' + userLang + '/button_music_off.png', id:'buttonMusicOff'},
			{src:'assets/' + userLang + '/button_exit.png', id:'buttonExit'},
			{src:'assets/' + userLang + '/button_settings.png', id:'buttonSettings'}
	];

	for(var n=0; n<tubes_arr.length; n++){
		manifest.push({src:tubes_arr[n].imageBack, id:'tubeBack' + n});
		manifest.push({src:tubes_arr[n].imageFront, id:'tubeFront' + n});
	}

	for(var n=0; n<bubbles_arr.length; n++){
		manifest.push({src:bubbles_arr[n], id:'bubble' + n});
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}else{
		if(!enableDesktopSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/' + userLang + '/sounds/sound_click.ogg', id:'soundButton'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_score.ogg', id:'soundScore'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_timer.ogg', id:'soundTimer'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_timer_end.ogg', id:'soundTimerEnd'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_result.ogg', id:'soundResult'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_error.ogg', id:'soundError'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_clear.ogg', id:'soundClear'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_start.ogg', id:'soundStart'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_select.ogg', id:'soundSelect'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_pour1.ogg', id:'soundPour1'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_pour2.ogg', id:'soundPour2'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_pour3.ogg', id:'soundPour3'});
		manifest.push({src:'assets/' + userLang + '/sounds/sound_match.ogg', id:'soundMatch'});
		manifest.push({src:'assets/' + userLang + '/sounds/music_main.ogg', id:'musicMain'});
		manifest.push({src:'assets/' + userLang + '/sounds/music_game.ogg', id:'musicGame'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}