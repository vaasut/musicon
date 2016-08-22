var metronome = [-1,0]
var note = [-1]
var interval= ''
var count = 0;

var jam = -1;
var jam_interval = '';
var jam_count = 0;
var jam_alpha = 0;

var single_interval = '';
var single_count = 0;

color = ["200,80,80,","100,200,200,","100,80,200,","100,200,100,","250,200,150,","200,130,200,","150,200,250,"] 

// create web audio api context
var context = new window.webkitAudioContext();

var osc = context.createOscillator();
osc.frequency.value = 440;
osc.connect(context.destination);



var resize = function(){
	console.log(window.innerWidth)
	document.getElementById("block1").style.marginLeft =  (window.innerWidth-440)/2 + "px"
	}

window.onresize = resize
window.onload = resize

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
		$("#play").text("play");
		}

	else{
		note[0] = 1;
		$("#play").text("stop");
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

$("#jam").on("click", function(event){
	if (jam === -1){
		document.getElementById("song").volume = .3
		document.getElementById("song").play()
		lets_jam()
		jam = 1;
		}
	else{
		jam = -1;
		document.getElementById("song").pause()
		clearInterval(jam_interval)
	}
})
var run = function(tap){
	interval = setInterval(
		function() {
			count += 1;
			count %= 100
			var alpha = count/100
			document.getElementById("metronome").style.backgroundColor = "rgba(1,1,1," + alpha + ")"
			//console.log(alpha);
		}, 
		60*10/tap)
}

// window.addEventListener('keydown', function(evt) {
// 	if (evt.which === 65 || evt.keyCode === 65) {
// 		single_note(0)
// 		}
	// else if (evt.which === 83 || evt.keyCode === 83) {
	// 	single_note(1)
	// 	}
	// else if (evt.which === 68 || evt.keyCode === 68) {
	// 	single_note(2)
	// 	}
	// else if (evt.which === 70 || evt.keyCode === 70) {
	// 	single_note(3)
	// 	}
	// else if (evt.which === 71 || evt.keyCode === 71) {
	// 	single_note(4)
	// 	}
	// else if (evt.which === 72 || evt.keyCode === 72) {
	// 	single_note(5)
	// 	}
	// else if (evt.which === 74 || evt.keyCode === 74) {
	// 	single_note(6)
	// 	}

// });

var single_note = function(blocknum){
	var um = "block" + (blocknum +1)
	single_interval = setInterval(
	 	function(){
	 	if (single_count >= 100){
	 		clearInterval(single_interval)
	 		console.log(single_count)
	 		single_count=0;
	 		return
	 	}
	 	console.log(single_count)
	 	single_count += 1;
	 	var single_alpha = single_count / 100
	 	document.getElementById(um).style.backgroundColor = "rgba(" + color[blocknum] + single_alpha + ")";
		},
		10)
}

var lets_jam = function(blocknum){
	jam_interval = setInterval(
	 	function(){
	 	jam_count += 1;
	 	jam_alpha = jam_count % 100;
	 	jam_alpha = jam_alpha/100;

	 	if (jam_count < 1700){
	 		document.getElementById("block1").style.backgroundColor = "rgba(200,80,80," + jam_alpha + ")";
		 	document.getElementById("block2").style.backgroundColor = "rgba(" + color[1] + jam_alpha + ")";
		 	document.getElementById("block3").style.backgroundColor = "rgba(" + color[2] + jam_alpha + ")";
		 	document.getElementById("block4").style.backgroundColor = "rgba(" + color[3] + jam_alpha + ")";
		 	document.getElementById("block5").style.backgroundColor = "rgba(" + color[4] + jam_alpha + ")";
		 	document.getElementById("block6").style.backgroundColor = "rgba(" + color[5] + jam_alpha + ")";
		 	document.getElementById("block7").style.backgroundColor = "rgba(" + color[6] + jam_alpha + ")";
		 	}

		else if(1700 < jam_count && jam_count < 3200){
			document.getElementById("block1").style.backgroundColor = "rgba(200,80,80," + jam_alpha + ")";
			// document.getElementById("block2").style.backgroundColor = "rgba(" + color[1] + jam_alpha + ")";
			document.getElementById("block2").style.width = (50 +jam_alpha*10)
		 	document.getElementById("block3").style.backgroundColor = "rgba(" + color[2] + jam_alpha + ")";
		 	document.getElementById("block4").style.backgroundColor = "rgba(" + color[3] + jam_alpha + ")";
		 	document.getElementById("block5").style.backgroundColor = "rgba(" + color[4] + jam_alpha + ")";
		 	document.getElementById("block6").style.backgroundColor = "rgba(" + color[5] + jam_alpha + ")";
		 	// document.getElementById("block7").style.backgroundColor = "rgba(" + color[6] + jam_alpha + ")";
			}

		else if(3200 < jam_count && jam_count < 4700){
			document.getElementById("block1").style.backgroundColor = "rgba(200,80,80," + jam_alpha + ")";
			//document.getElementById("block2").style.width = 50
			document.getElementById("block2").style.backgroundColor = "rgba(" + color[1] + jam_alpha + ")";
			document.getElementById("block6").style.width = (50 -jam_alpha*10)
			document.getElementById("block4").style.height = (100 +jam_alpha*20)
		 	// document.getElementById("block3").style.backgroundColor = "rgba(" + color[2] + jam_alpha + ")";
		 	// document.getElementById("block4").style.backgroundColor = "rgba(" + color[3] + jam_alpha + ")";
		 	document.getElementById("block5").style.backgroundColor = "rgba(" + color[4] + jam_alpha + ")";
		 	document.getElementById("block6").style.backgroundColor = "rgba(" + color[5] + jam_alpha + ")";
		 	// document.getElementById("block7").style.backgroundColor = "rgba(" + color[6] + jam_alpha + ")";
			}

		else if(4700 < jam_count && jam_count < 6500){
			document.getElementById("block1").style.backgroundColor = "rgba(200,80,80," + jam_alpha + ")";
			// document.getElementById("block2").style.backgroundColor = "rgba(" + color[1] + jam_alpha + ")";
			document.getElementById("block1").style.width = (30 + jam_alpha*30)
		 	document.getElementById("block3").style.backgroundColor = "rgba(" + color[2] + jam_alpha + ")";
		 	// document.getElementById("block4").style.backgroundColor = "rgba(" + color[3] + jam_alpha + ")";
		 	document.getElementById("block5").style.backgroundColor = "rgba(" + color[4] + jam_alpha + ")";
		 	document.getElementById("block2").style.width = (70 - jam_alpha*30)
		 	// document.getElementById("block6").style.backgroundColor = "rgba(" + color[5] + jam_alpha + ")";
		 	document.getElementById("block7").style.backgroundColor = "rgba(" + color[6] + jam_alpha + ")";
			}

		else if(6500 < jam_count && jam_count < 8100){
			document.getElementById("block1").style.backgroundColor = "rgba(200,80,80," + jam_alpha + ")";
			document.getElementById("block2").style.backgroundColor = "rgba(" + color[1] + jam_alpha + ")";
			//document.getElementById("block2").style.width = (30 + jam_alpha*30)
		 	document.getElementById("block3").style.backgroundColor = "rgba(" + color[2] + jam_alpha + ")";
		 	document.getElementById("block4").style.backgroundColor = "rgba(" + color[3] + jam_alpha + ")";
		 	document.getElementById("block5").style.backgroundColor = "rgba(" + color[4] + jam_alpha + ")";
		 	document.getElementById("block2").style.width = (70 - jam_alpha*30)
		 	document.getElementById("block6").style.backgroundColor = "rgba(" + color[5] + jam_alpha + ")";
		 	document.getElementById("block7").style.backgroundColor = "rgba(" + color[6] + jam_alpha + ")";
		}

		else if (jam_count > 8100){
	 		jam_alpha = 1;
	 		document.getElementById("block1").style.backgroundColor = "rgba(200,80,80," + jam_alpha + ")";
		 	document.getElementById("block2").style.backgroundColor = "rgba(" + color[1] + jam_alpha + ")";
		 	document.getElementById("block3").style.backgroundColor = "rgba(" + color[2] + jam_alpha + ")";
		 	document.getElementById("block4").style.backgroundColor = "rgba(" + color[3] + jam_alpha + ")";
		 	document.getElementById("block5").style.backgroundColor = "rgba(" + color[4] + jam_alpha + ")";
		 	document.getElementById("block6").style.backgroundColor = "rgba(" + color[5] + jam_alpha + ")";
		 	document.getElementById("block7").style.backgroundColor = "rgba(" + color[6] + jam_alpha + ")";

		 	document.getElementById("block1").style.width = 50
		 	document.getElementById("block2").style.width = 50
		 	document.getElementById("block3").style.width = 50
		 	document.getElementById("block4").style.width = 50
		 	document.getElementById("block5").style.width = 50
		 	document.getElementById("block6").style.width = 50
		 	document.getElementById("block7").style.width = 50

		 	document.getElementById("block1").style.height= 100
		 	document.getElementById("block2").style.height = 100
		 	document.getElementById("block3").style.height = 100
		 	document.getElementById("block4").style.height= 100
		 	document.getElementById("block5").style.height = 100
		 	document.getElementById("block6").style.height = 100
		 	document.getElementById("block7").style.height = 100
		 	jam_count = 0;
	 		clearInterval(jam_interval)
	 		return
	 		}

	 	console.log(jam_count)
		}, 4)
}

