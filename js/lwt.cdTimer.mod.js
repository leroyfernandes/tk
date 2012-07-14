(function($){
	
	var diffSecs;/* Accessible everywhere */
	var timerPointer;
	var $thisTimer;
	var $thisTimerId;
	var $thisTimerMins;
	var $thisTimerSecs;
	
	$.fn.countDown = function (options) {
		config = {
			targetOffset : {},
			onComplete : "tkTimer.popAlert()"/* Change in place below. This is a placeholder*/
		};
		
		$.extend(config, options);
				
		$thisTimer = $(this);
		$thisTimerId = $thisTimer.attr('id');
		
		$thisTimer.html("<span><span class='gradfg'></span><span id='mins'></span></span><span id='sep'><span class='gradfg'></span><span id='separator'>:</span></span><span><span class='gradfg'></span><span id='secs'></span></span>");
		
		$thisTimerMins = $('#'+$thisTimerId+' span#mins');
		$thisTimerSecs = $('#'+$thisTimerId+' span#secs');
		
		
		diffSecs = this.setCountDown(config);
		
		//secs = diffSecs % 60;
		//mins = Math.floor(diffSecs/60)%60;
		//displayCountDown( mins, secs );
		
		/* For intial display of countdown, no need to calculate from diffsecs */
		displayCountDown( config.targetOffset.min, config.targetOffset.sec );
		
		return this;
	};
	
	$.fn.pauseCountDown = function () {
		clearTimeout(timerPointer);
	};
	
	$.fn.startCountDown = function () {
		this.doCountDown();
	};
	
	$.fn.setCountDown = function (options) {
		var targetTime = new Date();
	
		/* Only time offset */
		targetTime.setFullYear(options.targetOffset.year + targetTime.getFullYear());
		targetTime.setMonth(options.targetOffset.month + targetTime.getMonth());
		targetTime.setDate(options.targetOffset.day + targetTime.getDate());
		targetTime.setHours(options.targetOffset.hour + targetTime.getHours());
		targetTime.setMinutes(options.targetOffset.min + targetTime.getMinutes());
		targetTime.setSeconds(options.targetOffset.sec + targetTime.getSeconds());
		
		var nowTime = new Date();
		
		diffSecs = Math.floor((targetTime.valueOf()-nowTime.valueOf())/1000);
		
		return diffSecs;
	};
	
	$.fn.doCountDown = function (id) {
		$this = $('#' + id);
		
		secs = diffSecs % 60;
		mins = Math.floor(diffSecs/60)%60;		
		
		displayCountDown( mins, secs );
		
		if (diffSecs > 0){
			timerPointer = setTimeout(function() { $this.doCountDown(id) }, 1000);
		}
		else{
			diffSecs = 0;
			if ( timerPointer !== 'undefined' )
			{
				clearTimeout(timerPointer);
				
				/*	This shudn't be like this ... It is like hardcoding a value 
						Use the config object to get the value of the on COmplete funnction
				*/
				tkTimer.popAlert();			
			}
		}
		
		diffSecs -= 1;
	};
	
	var displayCountDown = function( mins, secs ){
			
		if( Math.floor(mins / 10) <= 0 ){
			mins = "0"+ mins;
			
		}		
		if( Math.floor(secs / 10) <= 0 ){
			secs = "0"+ secs;	
		}
	
		$thisTimerMins.text(mins);
		$thisTimerSecs.text(secs);
	};

	
})(jQuery);