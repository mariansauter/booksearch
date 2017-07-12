/*!
 * This file was written by Marian Sauter, marian.sauter@psy.lmu.de
 * Copyright 2014
 * Licensed under CC-BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
 */

var general = {
	// == HELPER FUNCTIONS ==

	// loads images into array and returns the array
	loadImages: function(callback){
		var items = [];
		for(var i = 0; i < this.files.length; i++){
			//load image from filename and relative path
			var img = new Image();
			// generate image source from filename and path
			img.src = this.file_path + this.files[i];
			//get features from filename
			var features = this.files[i].split(/[_\.]/);
			//create array and push onto items
			var item = new Array();
			// ensure proper format of image based on splitting values
			if(features.length === 6){
				item.push(img);			// image object
				item.push(features[0]);	// target color
				item.push(features[1]);	// target shape
				item.push(features[2]);	// target direction
				item.push(features[3]);	// target location
				item.push(features[4]);	// singleton dimension
				items.push(item);		// add to list of items
			} else {
				console.log('Invalid Filename \'%s\'', this.files[i]);
			}
		}
		callback(items);
	},
	// creates trials from items
	createTrials: function(items, multiplier){
		var temp = [];

		// loop through items until desired number of trials are
		// loaded
		for(var i = 0; i < items.length * multiplier; i++){
			temp.push(items[i % items.length]);
		}

		// return randomized trials if configured to do so
		if(this.randomize_trials)
			return this.randomizeArray(temp);

		return temp;
	},
	
	// generates a weighed list from two lists one containing the elements and one the weights
	generateWeighedList: function(list, weight) {
		var weighed_list = [];
		
		// Loop over weights
		for (var i = 0; i < weight.length; i++) {
			var multiples = weight[i] * 1000;
			
			// Loop over the list of items
			for (var j = 0; j < multiples; j++) {
				weighed_list.push(list[i]);
			}
		}
		return weighed_list;
	},
	// randomizes an array
	// returns array
	randomizeArray: function(array){
		  var currentIndex = array.length; 
		  var temporaryValue;
		  var randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
	},
	
	//returns a random number within a specified min and max value
	rand: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

function isTargetPresent(){
			var list = [true, false];
			var weight = settings.target_presence;
			var weighed_list = general.generateWeighedList(list, weight);
			var random_num = general.rand(0, weighed_list.length-1);
			console.log(weighed_list[random_num]);
			return weighed_list[random_num];
		}

function construct(){
	
		setDisplay();
		var time1 = new Date().getTime();
		var locations = general.randomizeArray(["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","s12","s13","s14","s15","s16","s17","s18","s19","s20","s21","s22","s23","s24","s25"]);
		target_drawn = false;
		// Will the target be present in this display?
		var is_target_present = isTargetPresent();
		
		// GLOBAL: set variable of target presence
		trial_target_present = is_target_present;
		
		if(trial_target_present) trial_correct_response = 1;
		if(!trial_target_present) trial_correct_response = 0;
    
		for (var i = 0; i < locations.length; i++) {
			var stim_features = getStimulusFeatures(is_target_present, locations[i]);
			var tsize = parseFloat(stim_features[0]);
			var tcolor = stim_features[1];
			
			drawStimulus(tsize,stim_features[1],stim_features[2],locations[i]);
		}
		var time2 = new Date().getTime();
		//$("#timer").html("Generation time in ms:  " + parseInt(time2-time1));
	}
	
function getStimulusFeatures(is_target_present, location){

		if(is_target_present && target_drawn == false){
			var list = settings.target_features;
			var weight = settings.target_weights;
			var weighed_list = general.generateWeighedList(list, weight);  
			var random_num = general.rand(0, weighed_list.length-1);
			target_drawn = true;

			//GLOBAL: set target features
			trial_target_size = weighed_list[random_num][0];
			trial_target_color = weighed_list[random_num][1];
			trial_target_orientation = weighed_list[random_num][2];
			trial_target_location = location;
			
			//console.log("Target returned: " + weighed_list[random_num]);
			return weighed_list[random_num];   
		}else{
        
			if(settings.feature_search){
				return [settings.stimulus_large, settings.colorblue, 90];
			}
			var list = [[settings.stimulus_large, settings.colorred, 0],
						[settings.stimulus_large, settings.colorblue, 90]];
			var weight = [0.5, 0.5];
			var weighed_list = general.generateWeighedList(list, weight);
			var random_num = general.rand(0, weighed_list.length-1);
			return weighed_list[random_num];
		}
	}

// for the change detection task
function getProbeFeatures(){

			var list = [[settings.stimulus_large, settings.colorred, 0],
						[settings.stimulus_large, settings.colorred, 90],
						[settings.stimulus_large, settings.colorblue, 0],
						[settings.stimulus_large, settings.colorblue, 90]];
			var weight = [0.25, 0.3125, 0.1875, 0.25];
			var weighed_list = general.generateWeighedList(list, weight);
			var random_num = general.rand(0, weighed_list.length-1);
			return weighed_list[random_num];
	}
	
function drawStimulus(size, color, orientation, location){  
	
        // size for each box, refers to the first box in the first row
		// box size should be around 40 on a 22inch screen in this jsfiddle
        var box_size = $("#testbox").height();
        var c = document.getElementById(location);
		
		// DISPLAY DEBUGGING LOGS
		//console.log("DOM tree loaded? "+document.readyState);	
		//console.log("Display No: " + displaycounter++);
		//console.log("Size: "+ size);
		//console.log("Color: "+ color);
		//console.log("Or: "+ orientation);
		//console.log("Location: "+ location + typeof location);
		//console.log("getElementById: " + c + typeof c);
		//console.log("Testbox height: "+$("#testbox").height() + typeof $("#testbox").height());
		//console.log("Box size: " + box_size + typeof box_size);
		//console.log("Window height: "+$(window).height());
		
    c.width = box_size + $(window).height() * 0.06;
    c.height = box_size + $(window).height() * 0.06;
    
    var stimulus_size = box_size * size; // size is either 1 (large) or 2/3    
    var size_diff = box_size-stimulus_size;
    var ctx = c.getContext("2d");

    // if a perfect grid is not wanted, jitter bars randomly
    // by a maximum of 1/3 of the box size in any direction
    if(settings.jitter){
      var hjitter = general.rand(-$(window).height() * 0.03, $(window).height() * 0.03);
      var vjitter = general.rand(-$(window).height() * 0.03, $(window).height() * 0.03);
      ctx.translate(hjitter,vjitter);  
    }
   
    // rotate around center
    ctx.translate(c.height/2, c.height/2);
    ctx.rotate(orientation*Math.PI / 180);
    ctx.translate(-c.height/2, -c.height/2);
    
    // draw bars
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(c.offsetLeft+size_diff/2,c.offsetTop+c.height/2);
    ctx.lineTo(c.offsetLeft+stimulus_size+size_diff/2,c.offsetTop+c.height/2);
    ctx.lineWidth = size * 10;
    ctx.closePath();
    ctx.stroke();
	}
	
function drawCross(size, color, orientation, location){  
	
        // size for each box, refers to the first box in the first row
		// box size should be around 40 on a 22inch screen in this jsfiddle
	var box_size = $("#fixbox").height();
	
	var stimulus_size = box_size * size; // size is either 1 (large) or 2/3    
    var size_diff = box_size-stimulus_size;
    var c = document.getElementById(location);
		
    c.width = box_size + $(window).height() * 0.06;
    c.height = box_size + $(window).height() * 0.06;
	var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = color;

    ctx.moveTo(c.offsetLeft,c.offsetTop+box_size/2+box_size/2);
    ctx.lineTo(c.offsetLeft+box_size,c.offsetTop+box_size/2+box_size/2);
    ctx.moveTo(c.offsetLeft+box_size/2,c.offsetTop+box_size/2);
    ctx.lineTo(c.offsetLeft+box_size/2,c.offsetTop+box_size+box_size/2);
    
    ctx.lineWidth = size * 2;
    ctx.closePath();
    ctx.stroke();
	}
	
function setDisplay(){
	$("#trial").html("<div class='row relef'><div class='box relef' id='testbox'><canvas id='s1'></canvas></div><div class='box relef'><canvas id='s2'></canvas></div><div class='box relef'><canvas id='s3'></canvas></div><div class='box relef'><canvas id='s4'></canvas></div><div class='box relef'><canvas id='s5'></canvas></div></div><div class='row relef'><div class='box relef'><canvas id='s6'></canvas></div><div class='box relef'><canvas id='s7'></canvas></div><div class='box relef'><canvas id='s8'></canvas></div><div class='box relef'><canvas id='s9'></canvas></div><div class='box relef'><canvas id='s10'></canvas></div></div><div class='row relef'><div class='box relef'><canvas id='s11'></canvas></div><div class='box relef'><canvas id='s12'></canvas></div><div class='box relef' id='fixbox'><canvas id='s13'></canvas></div><div class='box relef'><canvas id='s14'></canvas></div><div class='box relef'><canvas id='s15'></canvas></div></div><div class='row relef'><div class='box relef'><canvas id='s16'></canvas></div><div class='box relef'><canvas id='s17'></canvas></div><div class='box relef'><canvas id='s18'></canvas></div><div class='box relef'><canvas id='s19'></canvas></div><div class='box relef'><canvas id='s20'></canvas></div></div><div class='row relef'><div class='box relef'><canvas id='s21'></canvas></div><div class='box relef'><canvas id='s22'></canvas></div><div class='box relef'><canvas id='s23'></canvas></div><div class='box relef'><canvas id='s24'></canvas></div><div class='box relef'><canvas id='s25'></canvas></div></div><div class='row relef' id='timer'></div>")
}

function setEmptyDisplay(){
	$("#trial").html("<div class='row relef'><div class='box relef' id='testbox'></div><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div></div><div class='row relef'><div class='box relef'></div><div class='box relef'></div> <div class='box relef'></div><div class='box relef'></div><div class='box relef'></div></div><div class='row relef'><div class='box relef'></div><div class='box relef'></div><div class='box relef' id='fixbox'></div><div class='box relef'></div><div class='box relef'></div></div><div class='row relef'><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div></div><div class='row relef'><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div><div class='box relef'></div></div><div class='row relef' id='timer'></div>")
}

function setRandomSearchtype(){
	var weighed_list = general.generateWeighedList([true,false], settings.searchtype_prob);  
	var random_num = general.rand(0, weighed_list.length-1);
	console.log("test: "+weighed_list[random_num]);
	return weighed_list[random_num];   
}

function askExplicitenessQuestion(){
	var rnd_question = general.rand(0,settings.ex_questions.length-1);
	question_trial = true;
	$("#timer").html("<div id='timer'>" + settings.ex_questions[rnd_question] + "</div>");
}

// produces a short beep
function beep(duration, type) {
    var ctx = new(window.audioContext || window.webkitAudioContext);

    // Only 0-4 are valid types.
        type = (type % 5) || 0;

        var osc = ctx.createOscillator();

        osc.type = type;

        osc.connect(ctx.destination);
        osc.noteOn(0);

        setTimeout(function () {
            osc.noteOff(0);
        }, duration);
    }