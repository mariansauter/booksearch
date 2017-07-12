/*!
 * This file was written by Marian Sauter, marian.sauter@psy.lmu.de
 * Copyright 2014
 * Licensed under CC-BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
 */


$(document).ready(function() {
	displaycounter = 0;
	var keylock = false;	// locks keys on keydown to avoid multiple keypresses
	var counter = -1;		// keeps track of trial
	var response_allowed = false; // allow a response to be recorded
	var blocked = false;		// waiting for user to continue next block
	var trial_start = null;	// holds the time the individual trial started
	var demoData = [];
	var data = [];
	var pause_timer = 0;
	var block_counter = 1;
	var instructions_timer = 0;
	var clearblocked = false;
	question_trial = false;
	change_trial = false;
	target_drawn = false;
	trial_target_present = false;
	trial_correct_response = 0; // 1 = present, 0 = absent
	trial_response = 0; // 1 = present, 0 = absent
	trial_target_size = 0;
	trial_target_orientation = 0;
	trial_target_color = "";
	trial_target_location = "";
	question_number = -1;
	questions = [];
	answers = [];
	pSize = 0;
	pColor = '';
	pOrientation = 0;
	
	// show the consent form if no cookie was set
	// the cookie prevents multiple submissions

	if(document.cookie)
		showCookieThankyou();
	else
		showConsent()
	
	// for this experiment we only need feature search
	//settings.feature_search = setRandomSearchtype();

	
	// on accepting consent form show demographic form
	$("#accept").click(function(e){
		e.preventDefault();
		showDemographics();
	});

	// on accepting demographic data save to data
	// and show instructions
	$("#continue").click(function(e){
		e.preventDefault();
		
		demoData.push(user_ip);
		demoData.push($("#Country").val());
		demoData.push($("input[name='SexGroup']:checked").val());
		demoData.push($("#AgeGroup").val());
		demoData.push($("input[name='HandGroup']:checked").val());
		demoData.push($("input[name='VisionGroup']:checked").val());
		demoData.push($("input[name='EnglishGroup']:checked").val());
		demoData.push(screen.availWidth);
		demoData.push(screen.availHeight);
		demoData.push(window.innerWidth);
		demoData.push(window.innerHeight);
		demoData.push(screen.colorDepth);
		demoData.push(screen.pixelDepth);
		//data.push(demoData.join(','));

		showInstruction();
	
		startInstructionsCounter();
	});

	// on accept instructions start the experiment
	$("#acceptInstructions").click(function(e){
		e.preventDefault();
		stopInstructionsCounter();
		startExperiment();
	});

	$("#nextBlock").click(function(e){
		e.preventDefault();
		clearTrial();
		setDisplay();
		showTrial();
		stopPauseCounter();
		setTimeout(runTrial, settings.block_delay);
	});

	// starts the experiment by loading the images and starting the trials
	// when they are all loaded
	function startExperiment(){
			
			// Explicitness questions at the end?
			// questions = general.randomizeArray(settings.ex_questions);
						
			showExperiment();
			showTrial();
			setTimeout(runTrial, settings.start_delay);
	}

	// == TRIAL FUNCTIONS == 

	function runTrial() {
		clearblocked = false;
		//if no more trials show complete
		if(++counter >= settings.trials){
			clearTrial();
			setEmptyDisplay();
			showTrial();
			
			// Expliciteness questions at the end?
			// question_trial = true;
			// $("#questions").html(questions[++question_number]);
			
			return;
		} else {
			// not waiting to continue and have executed the number of
			// trials per block then show button
			if(counter > 0 && !blocked && (settings.block_size 
				&& settings.block_size > 0 && counter % settings.block_size === 0)){
				counter--;	// reset counter index and show continue button
				blocked = true;
				++block_counter;
				showBlockWait();
				startPauseCounter();
				return;
			} else {
				blocked = false;
				setDisplay();
				drawCross(1, '#FFFFFF', 90, 's13');
			}
		}
		
		setTimeout(function(){
			response_allowed = true;	// allow keyboard input
			clearTrial();
			construct();
			showTrial();
			trial_start = new Date().getTime();			//record the onset time of the  stimulus
			if(settings.display_duration != 0) setTimeout(clearTrial,settings.display_duration);
		}, settings.fixation_duration);

	}

	function runChangeDetection(){
		change_trial = true;
		clearblocked = false;
		clearTrial();
		setDisplay();
		$("#questions").html("Did the target look like this?");
		$("#questions").show();
		
		var probe_features = getProbeFeatures();
		 pSize = parseFloat(probe_features[0]);
		 pColor = probe_features[1];
		 pOrientation = probe_features[2];
		
		drawStimulus(pSize, pColor, probe_features[2], 's13');
		
	}
	
	// listen for keydown event
	$(document).keydown(function(event){

		// keydown is required to catch arrow keys due to browser
		// compatability; lock keys until keyup is fired
		if(keylock) return;
		keylock = true;
		
		if(change_trial){
			
			change_trial = false;
			$("#questions").hide();
			clearTrial();
			
			
			if(trial_target_size == pSize && 
			trial_target_orientation == pOrientation &&
			trial_target_color == pColor) {
			
				if (event.which == 37){
					var was_correct = true;
					console.log("No change, answer correct");
				}
				
				if (event.which != 37){
					var was_correct = false;
					console.log("No change, answer incorrect");
				}
				
			}
			
			if(trial_target_size != pSize || 
			trial_target_orientation != pOrientation ||
			trial_target_color != pColor) {
			
				if (event.which == 39){
					var was_correct = true;
					console.log("Change, answer correct");
				}
				
				if (event.which != 39){
					var was_correct = false;
					console.log("Change, answer incorrect");
				}
			}
			
			var tmp_array = [];
			
			tmp_array.push(pSize);
			tmp_array.push(pColor);
			tmp_array.push(pOrientation);
			tmp_array.push(was_correct);
			
	
			setTimeout(runTrial,settings.intertrial_interval);
		}
		
		
		// if this is the explicitness question
		// push the (valid) response to data array
		if(question_trial && settings.ex_answers.indexOf(event.which) != -1){
			
			answers.push(evaluateInput(event.which));
			clearTrial();
			
			if(question_number < 0) 
				setTimeout(runTrial, 500);
			else{
				$("#RTs").val(data.join("," + answers.join(",") + "\r\n"));
				showFinished();
			}
		}

		// make sure that a response is actually allowed at this time point
		// and that the pressed key is a valid response key
		if(response_allowed && (event.which == 37 || event.which == 39)){
			response_allowed = false;
			// get the key the user pressed
			var responseKey = evaluateInput(event.which);
			// create new array to hold resposne data
			var trialResponse = new Array();
			var was_correct = false;
			
			trialResponse.push(block_counter);			// add block id
			trialResponse.push(pause_timer);			// add accumulated pause in seconds
			trialResponse.push(counter);			// add trial id
			trialResponse.push(new Date().getTime() - trial_start); // add response time
			trialResponse.push(responseKey);		// add user response
			
			console.log(responseKey);
			
			if(trial_target_present) {
				if(responseKey == settings.sr_mapping[0]) was_correct = true;
			}
			else {
				if(responseKey == settings.sr_mapping[1]) was_correct = true;
			} 

			trialResponse.push(was_correct); // add whether user was correct
			
			clearTrial();
			setDisplay();

			if (was_correct) {
				drawCross(1, '#00FF00', 90, 's13');
				//$("#fixbox").html("<img src = 'pics/fix_correct.png' width='100%'/>");
				//$("#trial").css("background-image", "url('pics/fix_correct.png')");
			} else {
				drawCross(1, '#FF0000', 90, 's13');
				//beep(200,1);
				//$("#fixbox").html("<img src = 'pics/fix_wrong.png' width='100%' />");
				//$("#trial").css("background-image", "url('pics/fix_wrong.png')");
			}
			clearblocked = true;
			trialResponse.push(trial_target_present); // add if target was present
			trialResponse.push(trial_target_size); // add target size
			trialResponse.push(trial_target_color); // add target color
			trialResponse.push(trial_target_orientation); // add target orientation
			trialResponse.push(trial_target_location); // add target location
			
			var tmp_array = [];
			tmp_array.push(demoData.join(','));
			tmp_array.push(instructions_timer);
			tmp_array.push(trialResponse);
			data.push(tmp_array);
			//console.log(tmp_array);
			
			// IF WITH HIDDEN TEMPLATE
			if(trial_target_present && trial_correct_response)
				setTimeout(runChangeDetection,settings.change_detect_delay);
			else 
				setTimeout(runTrial,settings.intertrial_interval);
			
			// IF WITHOUT HIDDEN TEMPLATE
			//setTimeout(runTrial,settings.intertrial_interval);  //calls runtrial() to begin a trial in 500ms
		}
		
		
		
	});

	// unlocks keys
	$(document).keyup(function(event){ keylock = false;	});
	
	// evaluates user input based on the key direction
	function evaluateInput(userInput){
		switch(userInput){
			//UP
			case 38: return 'up';
			//DOWN
			case 40: return 'down';
			//LEFT
			case 37: return 'left';
			//RIGHT
			case 39: return 'right';
			default:
				return String.fromCharCode(userInput);
		}
	}

	// == DISPLAY FUNCTIONS ==
	function hideCursor(){	// not used and I dont know if it works
		$("trial").css({cursor: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),url(images/blank.cur),none !important"})
	}
	
	function showCursor(){ // not used and I dont know if it works
		$("trial").css({cursor: auto})
	}

	function showInstruction() {
		hideAll();
		$(".instructions").show();
		if(settings.feature_search) $("#inst_conjunction").hide();
		if(!settings.feature_search) $("#inst_feature").hide();
	}

	function showConsent() {
		hideAll();
		$(".consent").show();
	}

	function showDemographics() {
		hideAll();
		$(".demographics").show();
	}

	function showExperiment(){
		hideAll();
		$(".experiment").show();
	}

	function showFinished(){
		hideAll();
		$(".finished").show();
		console.log(data);
	}
	function hideAll(){
		$(".consent").hide();
		$(".instructions").hide();
		$(".demographics").hide();
		$(".experiment").hide();
		$(".finished").hide();
		$(".thankyou").hide();
		$(".cookieThankyou").hide();
	}
	function showBlockWait () {
		$("#block-wait").show();
		$("#block-num").html(block_counter + " of " + settings.trials/settings.block_size);
		$("#trial").hide();
		clearTrial();
	}
	function showTrial () {
		$("#block-wait").hide();
		$("#trial").show();
	}
	function clearTrial(){
		if(!clearblocked){
			$("#trial").html("");
			$("#trial").css("background-image", "");
			$("#trial").css("color", "white");
		}
	}
	function showThankyou(){
		hideAll();
		$(".thankyou").show();
	}
	
	function showCookieThankyou(){
		hideAll();
		$(".cookieThankyou").show();
	}
	
	// start counting the seconds the "next block" button is shown
	function startPauseCounter(){
		pauseInterval = setInterval(function () {
			++pause_timer;
		}, 1000);
	}
	
	// stop counting the seconds the "next block" button is shown
	function stopPauseCounter(){
		clearInterval(pauseInterval);
	}
	
	function startInstructionsCounter(){
		instInterval = setInterval(function () {
			++instructions_timer;
		}, 1000);
	}
	
	// stop counting the seconds the "next block" button is shown
	function stopInstructionsCounter(){
		clearInterval(instInterval);
	}
	
	// avoid backspace back
	$(document).on("keydown", function (e) {
	    if (e.which === 8 && !$(e.target).is("input, textarea")) {
	        e.preventDefault();
	    }
	});
	
	$("#finishedForm").submit(function(e){
		e.preventDefault();
		//set a cookie to avoid multiple submissions
    	document.cookie = "strope=complete";
		
		$.ajax({
			type: "POST",
			url: settings.post_url,
			data: $("#finishedForm").serialize(), // serializes the form's elements.
			success: function(data)
			{
				//console.log(data);
				showThankyou();
				setTimeout(window.close,5000);
			},
			error: function(err){
				console.log(err);
			}
		});

	});
});