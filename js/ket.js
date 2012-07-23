// Initiate Countdown

jQuery(document).ready(function() {
	
	
	tkTimer.updateCountDownConfig();
	$('#timer').countDown( tkTimer.countdownConfig );
	
	populateSettings();
	
	$('#start').toggle(function(){
			start();			
		},function(){
			pause();
		});
	
	$('#reset').click(function(){
		console.log('reset clicked');
		console.log('nowRunning: '+tkTimer.nowRunning);
		
		switch(tkTimer.nowRunning){
			case 1: // work
				console.log("--updateCountDownConfig work in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.workMins;
				break;
				
			case 2: // sbreak
				console.log("--updateCountDownConfig sbreak in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.sbreakMins;
				break;
				
			case 3: // lbreak
				console.log("--updateCountDownConfig lbreak in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.lbreakMins;
				break;
			
			default: 
				console.log("--updateCountDownConfig default in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.workMins;
				break;
		};
		
		$.setCountDown( tkTimer.countdownConfig );
		
	});
	
	/* Toggle the Settings panel */
	$('#settings').toggle(function(){
		$('#settings_pane').stop().animate({opacity: 0},300,function(){$(this).slideUp(500)});
	},function(){
		$('#settings_pane').stop().slideDown(500, function(){$(this).animate({opacity: 1},300)});
	});
	
	/* Hide Settings after 7.5 secs only on first load */
	setTimeout(function(){
		if( 'block' == $('#settings_pane').css('display') )
			$('#settings').click();
	},7500);
	
	/* Toggle the tasklists */
	$('.tasklist_header').toggle(function(){
		$(this).parent().find('ul.tasks').slideUp(500);
	},function(){
		$(this).parent().find('ul.tasks').slideDown(500);
	});
	
	$('#btnSubmit').click(function(){
		console.log('btnSubmit click');
		$('#settings').click();
		updateSettings();
	});
	
	$('input').click(function(){
		console.log(':-'+$(this).attr('id'));
	});
	
	$('a').click(function(){
		console.log(':-'+$(this).attr('id'));
	});
	
});


var tkTimer = {
	"workMins" : 25,
	"sbreakMins" : 5,
	"lbreakMins" : 30,
	"cycles" : 3,	
	"currentCycle" : 0,
	"nowRunning" : 1, /* 0: nothing, 1: work, 2: sbreak, 3: lbreak */
	"currentTimer" : 0, /* variable to hold 'pointer' to current timer */
	"timerState" : 0, /* 0: Pause, 1: Running */
	
	"countdownConfig" : {
		"targetOffset" : {
			"day": 0,
			"month": 0,
			"year" : 0,
			"hour" : 0,
			"min" : 0,
			"sec" : 0
		}
	},
	
	"setupTimer" : function(){
		console.log("setupTimer in");
		
		if ( document.timerSetup.workMins && tkTimer.workMins != parseInt(document.timerSetup.workMins.value)){
			tkTimer.workMins = Math.floor(parseInt(document.timerSetup.workMins.value));
		}
		
		if ( document.timerSetup.sbreakMins && tkTimer.sbreakMins != parseInt(document.timerSetup.sbreakMins.value)){
			tkTimer.sbreakMins = Math.floor(parseInt(document.timerSetup.sbreakMins.value));
		}
		
		if ( document.timerSetup.cycles && tkTimer.cycles != parseInt(document.timerSetup.cycles.value)){
			tkTimer.cycles = Math.floor(parseInt(document.timerSetup.cycles.value));
		}
		
		if ( document.timerSetup.lbreakMins && tkTimer.lbreakMins != parseInt(document.timerSetup.lbreakMins.value)){
			tkTimer.lbreakMins = Math.floor(parseInt(document.timerSetup.lbreakMins.value));
		}
		
		console.log('tkTimer.workMins '+tkTimer.workMins);
		
		tkTimer.updateCountDownConfig();
		
		console.log("setupTimer out");
	}/* setupTimer END */
	
	,"updateCountDownConfig" : function(){
		
		switch(tkTimer.nowRunning){
			case 1: // work
				console.log("--updateCountDownConfig work in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.workMins;
				break;
				
			case 2: // sbreak
				console.log("--updateCountDownConfig sbreak in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.sbreakMins;
				break;
				
			case 3: // lbreak
				console.log("--updateCountDownConfig lbreak in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.lbreakMins;
				break;
			
			default: 
				console.log("--updateCountDownConfig default in");
				tkTimer.countdownConfig.targetOffset.min = tkTimer.workMins;
				break;
		};
		
	}
	
	/* Not needed anymore */
	,"setTimer": function(){
		console.log("setTimer in");
		
		var mins = tkTimer.workMins;
		
		switch(tkTimer.nowRunning){
			case 1: // work
				console.log("--setTimer work in");
				mins = tkTimer.workMins;
				break;
				
			case 2: // sbreak
				console.log("--setTimer sbreak in");
				mins = tkTimer.sbreakMins;
				break;
				
			case 3: // lbreak
				console.log("--setTimer lbreak in");
				mins = tkTimer.lbreakMins;
				break;
			
			default: 
				console.log("--setTimer default in");
				mins = tkTimer.workMins;
				break;
		};

	}/* setTimer END */
	
	,"popAlert": function(){
		console.log("popAlert in");
		
		switch(tkTimer.nowRunning){
			case 1: //work
			
				tkTimer.currentCycle += 1;
			
				console.log("--popAlert work in");
				if(tkTimer.currentCycle < tkTimer.cycles){
					console.log("----popAlert work if in");
					
					alert("Time for a SHORT break");
					
					
					tkTimer.nowRunning = 2;
					tkTimer.updateCountDownConfig();
				}
				else{
					console.log("----popAlert work else in");
					alert("Time for a LONG break");
					
					tkTimer.nowRunning = 3;
					tkTimer.updateCountDownConfig();
				}
				break;
				
			case 2: //sbreak
				console.log("----popAlert sbreak in");
				alert("Back to WORK");
				
				tkTimer.nowRunning = 1;
				tkTimer.updateCountDownConfig();
				break;
				
			case 3: //lbreak
			
				tkTimer.currentCycle = 0;
				
				console.log("----popAlert lbreak in");
				alert("Back to WORK");
				
				tkTimer.nowRunning = 1;
				tkTimer.updateCountDownConfig();
				break;
				
			default:
				console.log("----popAlert default in");
				/* Remove */
				alert("default popalert");
				break;
			
				
			
		};
			
		/* To flip the Start button once the time is up */
		$('a#start').click();// instead of directly calling pause(), since we need to register the toggle
		
		/* Reset the count down to the next slot */
		$('#timer').countDown( tkTimer.countdownConfig );
		
		console.log("popAlert out");
		
	}/* popAlert END */	
		
	
};/* tkTimer END */


	/* Show/Hide Settings panel */

	function populateSettings(){
		$("#workMins").val(tkTimer.workMins);
		$("#sbreakMins").val(tkTimer.sbreakMins);
		$("#cycles").val(tkTimer.cycles);
		$("#lbreakMins").val(tkTimer.lbreakMins);
	};

	
	function updateSettings(){
		tkTimer.setupTimer();		
	};
	
	function pause() {
		console.log('pause');
		tkTimer.timerState = 0;
		$('a#start').text('Start');
		$('a#start').removeClass('red').addClass('green');
		$('#timer').pauseCountDown();
		return false;
	};
	
	function start() {
		console.log('start');
		tkTimer.timerState = 1;
		$('a#start').text('Pause');
		$('a#start').removeClass('green').addClass('red');
		$('#timer').startCountDown();
		return false;
	};


