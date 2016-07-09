var metronome = [-1,0]
var note = [-1]
var interval= ''
var count = 0;

// create web audio api context
var context = new window.webkitAudioContext();

var osc = context.createOscillator();
osc.frequency.value = 440;
osc.connect(context.destination);

$(".notes").on("click",function(event){
	event.preventDefault();
	$("#freq").val($(this).attr("freq"));

	if (note[0]===1){
		osc.stop();
		osc = context.createOscillator();
		osc.frequency.value = $("#freq").val();
		osc.connect(context.destination);
		osc.start()
		}
	console.log()
	})

$("#play").on("click",function(event){
	event.preventDefault();
	if (note[0]===1){
		note[0] = -1;
		osc.stop();

		osc = context.createOscillator();
		osc.frequency.value = 440;
		osc.connect(context.destination);
		$("#play").text("pläy");
		}

	else{
		note[0] = 1;
		$("#play").text("stöp");
		osc.frequency.value = $("#freq").val()
		osc.start();
		}
})


$("#metronome").on("click", function(event){
	event.preventDefault();
	metronome[0] *= -1;
	if ($("#bpm").val() === ''){
		metronome[1] = 60
	}
	else{
		metronome[1] = $("#bpm").val()
	}

	if (metronome[0]===1){
		run(metronome[1])
	}
	if (metronome[0]===-1){
		clearInterval(interval)
		count = 0;
		document.getElementById("metronome").style.backgroundColor = "rgba(1,1,1,1)"
	}
	console.log(metronome)
})


var run = function(tap){
	interval = setInterval(
		function() {
			count += 1;
			count %= 100
			alpha = count/100
			document.getElementById("metronome").style.backgroundColor = "rgba(1,1,1," + alpha + ")"
		
			//console.log(alpha);
		}, 
		60*10/tap)
}


