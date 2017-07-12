/*!
 * This file was written by Marian Sauter, marian.sauter@psy.lmu.de
 * Copyright 2014
 * Licensed under CC-BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
 */


var	settings = {
	// are stimuli drawn live or retrieved from image folder?
	draw_stimuli: true,
	
	// STIMULI DRAWN
	colorred: '#D73138', 	// color for red stimulus
	colorblue: '#0084BA', 	// color for blue stimulus
	colorgreen: '#70B54B', 	// color for green stimulus
	stimulus_large: 10/10,		// size for large stimuli, should be kept at 1
	stimulus_small: 6/10,	// size for small stimli relative to large stimuli
	feature_search: true,	// true = feature search, false = conjunction search
							// is overwritten in Methods startExperiment()
	searchtype_prob: [0.5, 0.5], // Feature search probability, Conjunction search probability
	jitter: true,			// jitter locations?
	
	// target properties
	target_presence: [0.5, 0.5], // probabilities of PRESENT, ABSENT
	target_features: [[1, '#D73138', 90], [1, '#0084BA', 0]], // size, color, orientation
	target_weights: [0.5, 0.5],
	
	
	// misc
	trials: 100,
	block_size: 25,			// number of trials before a break
	randomize_trials: true,	// shuffle trials
	post_url: 'process.php',// the relative url to post the form data to
	sr_mapping: ["left", "right"], // key_present, key_absent
	
	// timing
	start_delay: 3000,		// delay before starting trials
	intertrial_interval: 1000,// interval between trials
	fixation_duration: 500,	// duration to show fixation cross
	display_duration: 0,	// show display for X miliseconds, choose 0 to wait until response
	block_delay: 2000,		// delay to wait before resuming a block
	change_detect_delay: 500, // time to wait before change detection is 
	
	// Expliciteness question at the end of the experiment
	ex_questions: ["Was the last target object red (press 'R') or blue (press 'B')?", "Was the last target object vertical (press 'V') or horizontal (press 'H')?"],
	ex_answers: [82, 66, 86, 72] // 82 = R, 66 = B
	}
	
//////////// INTRA COLOR DESIGN - dimension certainty

// TARGET: 		[[1, '#D73138', 0], [1, '#0084BA', 0]]
// DISTRACTORS: [settings.stimulus_small, settings.colorblue, 0],
//				[settings.stimulus_small, settings.colorgreen, 0],
//				[settings.stimulus_small, settings.colorred, 0],
//				[settings.stimulus_large, settings.colorgreen, 0]
////////////

//////////// CROSS DIMENSION DESIGN - dimension uncertainty

// TARGET: [1, '#D73138', 45], [1, '#0084BA', 90], [1, '#70B54B', 0]
// DISTRACTORS:	[settings.stimulus_large, settings.colorblue, 0],
// 				[settings.stimulus_large, settings.colorblue, 45],
// 				[settings.stimulus_large, settings.colorred, 0],
// 				[settings.stimulus_large, settings.colorred, 90],
// 				[settings.stimulus_large, settings.colorgreen, 45],
// 				[settings.stimulus_large, settings.colorgreen, 90]

// Das Problem hierbei ist, dass der Conjunction Search zu schwierig wird. 
// Da besteht dann die Gefahr, dass sie im letzten Trial einen Fehler machen.