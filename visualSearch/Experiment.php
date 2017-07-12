<!DOCTYPE html>
<!--
 * This file was written by Marian Sauter, marian.sauter@psy.lmu.de
 * Copyright 2014
 * Licensed under CC-BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
 *-->

<html>
<head>
	<title>Visual Search Experiment</title>

	<link rel="stylesheet" type="text/css" href="assets/bootstrap/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/app/Experiment.css">
	
	<script type="text/javascript">
	var user_ip =<?php echo json_encode(utf8_encode($_SERVER['REMOTE_ADDR']));?>;	
	</script>
	
	<script type="text/javascript" src="assets/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="assets/app/Procedure.js"></script>
	<script type="text/javascript" src="assets/app/Settings.js"></script>
	<script type="text/javascript" src="assets/app/Methods.js"></script>


</head>
<body>
<div class="container">

	<div class="thankyou">
		<strong>Thank You</strong>
		<p>Thank you for participating. The window will automatically close in 5 seconds.</p>
	</div>
	
	<div class="cookieThankyou">
		<strong>Thank You</strong>
		<p>You have already participated, please only participate once.</p>
	</div>
	
	<div class="consent">
	<p>Please read the consent form below that explains your rights as a human participant in research.</p>
	<div class="consent-form well">
			<p><strong>Title:</strong> Online Visual Search 2</p>
		<p><strong>Researcher:</strong> Marian Sauter, M.Sc.</p>
		
		<p>
			<strong>Requirements for participation:</strong>
			<br>
			Although we cannot verify it, 
			please only participate in this study if you have normal or corrected-to-normal vision, 
			especially no impairements in the ability to discriminate colors. You also must be at least 18 years of age 
			(or the respective age of majority of your country, <a href="http://en.wikipedia.org/wiki/Age_of_majority" target="_blank">Wikipedia: Age of Majority</a>).
		</p>
		
		<p>
			<strong>Purpose of the Research Study:</strong>
			<br>
			The study is being conducted to gain more knowledge about the 
			cognitive processes involved in visual attention.
		</p>
		<p>
			<strong>Procedures:</strong>
			<br>
			The experiment will involve one session lasting approximately 10 minutes.
			The sesseion is divided into 8 blocks. After each block, you can make a short break. 
			Please do not rearrange the window! Note that some keys might not work during the task.
		</p>
		<p>
			<strong>Risks/Discomforts/Benefits:</strong>
			<br>
			There are no risks for participating in this study beyond those associated with normal computer use. 
			Although it will not directly benefit you, this study will advance basic science on the cognitive processes involved in visual attention.
		</p>
		<p>
			<strong>Voluntary participation:</strong>
			<br>
			Participation in this study is voluntary, and you can abort at any time without penalty. 
			To abort the experiment, just close your browser window and no data will be transferred.
		</p>
		<p>
			<strong>Confidentiality:</strong>
			<br>
			No personally identifying information will be asked and/or stored for this study.
			However, we will ask for general demographic information and your IP address will be saved (see <a href="http://en.wikipedia.org/wiki/IP_address" target="_blank">Wikipedia: IP address</a>).
		</p>
		<p>
			<strong>Questions or Concerns:</strong>
			<br>
			You can ask questions about this research study at any time during the study by e-mailing Marian Sauter at marian.sauter@psy.lmu.de
		</p>	
	</div>
	<div class="row">
			<p>
			<strong>Clicking Accept: </strong>
			By clicking on the Accept button, you indicate that you agree to participate in the study and that you understand the information in this consent form. You agree that you are at least 18 years of age. You have not waived any legal rights you otherwise would have as a participant in a research study.
		</p>
		<p><button id="accept" type="button" class="btn btn-primary">Accept</button></p>	
	</div>


	</div>

<!--/////////////////////////////
//// INSTRUCTIONS
/////////////////////////////-->

	<div class="instructions">
		<h2>Visual Search Task</h2>
		<p><strong>Please read these instructions carefully and make sure you fully understand them before starting the experiment.</strong></p><br>
		<p><strong>Time: </strong>The whole task takes about 5 minutes</p>
		
		<p><strong>Task: </strong> 
			One after another, an image like the ones below will be presented on the screen. Between these images, you will see a central fixation cross.
			There are always 25 objects arranged in a 5 x 5 grid. 
			Half of the time, there will be a target object that differs from the other objects. </p>
		
		<div id="inst_feature">
			This will be the only object that is either RED or BLUE. For an example, see here: <br><br>
			<p><img src="pics/ex_feature_present.png" width="40%" alt="" style="margin:0px 50px" /><img src="pics/ex_feature_absent.png" width="40%" alt=""/></p>
		</div>
		
		<div id="inst_conjunction">
			This will be the only LARGE object that is either RED or BLUE. For an example, see here: <br><br>
			<p><img src="pics/ex_conj_present.png" width="40%" alt="" style="margin:0px 50px"/><img src="pics/ex_conj_absent.png" width="40%" alt=""/></p>
		</div>	
		<p> Your task is figure out whether there is such a unique object on the screen.
			If such a unique target object is present, please press the LEFT arrow key.
			If such a unique target object is absent, please press the RIGHT arrow key.
			If your answer is correct, the fixation cross will briefly turn green. If not, it will turn red. 
			Between the images, please fixate your eyes on the cross. </p>

		<p><strong>Notes: </strong>
			Make your responses as QUICKLY and ACCURATELY as possible.<br>
			Do not listen to music, watch TV or do other distracting activities while the experiment is running. <br>
			Please do not rearrange the window.<br>
			After clicking Start, please immediately place your left hand index finger on the left arrow key and your right hand index finger on the right arrow key.
		</p>
		<p><button id="acceptInstructions" class="btn btn-primary">Start Experiment</button></p>
	</div>

<!--/////////////////////////////
//// DEMOGRAPHICS
/////////////////////////////-->

	<div class="demographics">
		<p>As a part of the research we are collecting general demographic information. </p>
			<div class="inst form-group col-xs-4">
			   <strong>1. Country</strong>
			   <input id="Country" class="form-control col-sm-4">
		    </div>
		<div class="inst form-group col-xs-4">
		<strong>2. Sex</strong>
			<label class="radio-inline"><input type="radio" name="SexGroup" value="Male"> Male</label>
			<label class="radio-inline"><input type="radio" name="SexGroup" value="Female"> Female</label>
		</div>
			<div class="inst form-group col-xs-4">
			<strong>3. Age</strong>
			<input id="AgeGroup" class="form-control col-sm-4">
		</div>

		<div class="inst form-group col-xs-4">
		<strong>4. Handedness</strong>
			<label class="radio-inline"><input type="radio" name="HandGroup" value="Right"> Right</label>
			<label class="radio-inline"><input type="radio" name="HandGroup" value="Left"> Left</label>
			<label class="radio-inline"><input type="radio" name="HandGroup" value="Both"> Both</label>
		</div>
		
		<div class="inst form-group col-xs-4">
			<strong>5. Vision</strong>
			<div class="radio">
				<label><input type="radio" name="VisionGroup" value="Normal"> Normal eyesight without needing glasses.</label>
			</div>
			<div class="radio">
				<label><input type="radio" name="VisionGroup" value="Corrected"> Corrected Vision (glasses/contact lenses).</label>
			</div>
			<div class="radio">
				<label><input type="radio" name="VisionGroup" value="problems"> Poor eyesight and do not wear glasses.</label>
			</div>
		</div>

		<div class="inst form-group col-xs-4">
		<strong>6. English Ability</strong>
			<div class="radio">
				<label><input type="radio" name="EnglishGroup" value="First"> First-language speaker</label>
			</div>
			<div class="radio">
				<label><input type="radio" name="EnglishGroup" value="Second"> Second-language speaker</label>
			</div>
			<div class="radio">
				<label><input type="radio" name="EnglishGroup" value="None"> No English ability</label>
			</div>
		</div>

		<p><button id="continue" class="btn btn-primary">Continue</button></p>
	</div>

<!--/////////////////////////////
//// EXPERIMENT BLOCKS
/////////////////////////////-->

	<div class="experiment">
		
		<div id="trialPanel" class="panel">
			<div id="block-wait" class="panel-body text-center">
				The next block is <div id="block-num"></div>
				<p><button id="nextBlock" class="btn btn-primary">Continue</button></p>
			</div>
			<div class="row relef" id="questions"></div>
				<div id="trial">
						<div class="row relef">
							<div class="box relef" id="testbox"><canvas id="s1"></canvas></div>
							<div class="box relef"><canvas id="s2"></canvas></div>
							<div class="box relef"><canvas id="s3"></canvas></div>
							<div class="box relef"><canvas id="s4"></canvas></div>
							<div class="box relef"><canvas id="s5"></canvas></div>
						</div>
						<div class="row relef">
							<div class="box relef"><canvas id="s6"></canvas></div>
							<div class="box relef"><canvas id="s7"></canvas></div> 
							<div class="box relef"><canvas id="s8"></canvas></div>
							<div class="box relef"><canvas id="s9"></canvas></div>
							<div class="box relef"><canvas id="s10"></canvas></div>
						</div>
						<div class="row relef">
							<div class="box relef"><canvas id="s11"></canvas></div>
							<div class="box relef"><canvas id="s12"></canvas></div>
							<div class="box relef" id="fixbox"><canvas id="s13"></canvas></div>
							<div class="box relef"><canvas id="s14"></canvas></div>
							<div class="box relef"><canvas id="s15"></canvas></div>
						</div>
						<div class="row relef">
							<div class="box relef"><canvas id="s16"></canvas></div>
							<div class="box relef"><canvas id="s17"></canvas></div>
							<div class="box relef"><canvas id="s18"></canvas></div>
							<div class="box relef"><canvas id="s19"></canvas></div>
							<div class="box relef"><canvas id="s20"></canvas></div>
						</div>
						<div class="row relef">
							<div class="box relef"><canvas id="s21"></canvas></div>
							<div class="box relef"><canvas id="s22"></canvas></div>
							<div class="box relef"><canvas id="s23"></canvas></div>
							<div class="box relef"><canvas id="s24"></canvas></div>
							<div class="box relef"><canvas id="s25"></canvas></div>
						</div>
							<div class="row relef" id="timer"></div>
				</div>
		</div>
	</div>

	<div class="finished">

		<p>You have completed the experiment, thank you for your participation. Please submit your data.</p>
		<p>If you would like to leave a comment, or report a problem use the form below before submitting</p>

		<form id="finishedForm" method="POST" action="process.php">
			<input type="hidden" id="assignmentId" name="assignmentId" value="">
			<input type="hidden" id="RTs" name="RTs">
			<div class="form-group">
				<label for="Comments">Comments:</label>
				<textarea id="Comments" name="Comments" class="form-control" placeholder="(optional)"></textarea>
			</div>
			<div class="form-group">
				<button id="submitButton" type="submit" class="btn btn-primary">Submit</button>
			</div>

		</form>
	</div>

</div>

</body>
</html>