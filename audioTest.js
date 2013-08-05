//make fullscreen
window.onload = maxWindow;
    function maxWindow() {
        window.moveTo(0, 0);
	window.resizeTo(screen.availWidth, screen.availHeight);
    }

// WEB AUDIO SETUP
var myAudioContext;
var mySource;
var buffers = new Array();
var instrument = "drums";

window.addEventListener("load", setup);

function setup() {
		if('webkitAudioContext' in window) {
		myAudioContext = new webkitAudioContext();
		setUpAudio();
		}

}

function setUpAudio() {
	var drumSound = new Array("drums_bell.wav", "drums_hihat.wav", "drums_clap.wav", "drums_kick.wav", "drums_crash.wav", "drums_triangle.wav");
	var pianoSound = new Array("piano-C3.wav","piano-D3.wav","piano-E3.wav","piano-G3.wav","piano-A3.wav","piano-C4.wav");
	var soundNames;
	if(instrument=="drums"){
		soundNames = drumSound;}
	else { soundNames = pianoSound;}	

	for (var i=0; i<soundNames.length; i++) {
		request = new XMLHttpRequest();
		request.open('GET', "data/" + soundNames[i], true);
		request.responseType = 'arraybuffer';
		request.addEventListener('load', bufferSound, false);
		request.num = i;
		request.send();
	}
}

function bufferSound(event) {
    var request = event.target;
    buffers[request.num] = myAudioContext.createBuffer(request.response, false);
}

// UI SETUP

var keyStrings = new Object();
keyStrings[37] = "Left";
keyStrings[38] = "Up";
keyStrings[39] = "Right";
keyStrings[40] = "Down";
keyStrings[32] = "Space";
//var keyStrings = new Array('h', 'i', 'j', 'k', ' '); // h, i, j, k, space
//var keyStrings = new Array('w', 'a', 's', 'd', 'f');

var keyStates = new Array();
var x =0;
for (var i in keyStrings) {
	x++;
}
for (var i=0;i<x;i++){
keyStates[i]=false;
}

function mouseDown()
{
try{
	var source = myAudioContext.createBufferSource();
	source.buffer = buffers[5];
	source.connect(myAudioContext.destination);
	source.noteOn(0);
	document.getElementById("click").src="data/SpaceArrowPressed.png";
}
catch(err){
	alert("Sorry! Your current browser does not support web audio. We recommend downloading the latest version of Google Chrome.");
}
}
function mouseUp()
{
	var state = document.getElementById("click");
	state.src="data/SpaceArrow.png";
}

	

function drumInstr()
{
	instrument="drums";
	document.getElementById("right_tab").src="data/RightTab.png";
	document.getElementById("left_tab").src="data/LeftTabPressed.png";
	setUpAudio();
	changeImgs();
}
function pianoInstr()
{
	instrument="piano";
	document.getElementById("right_tab").src="data/RightTabPressed.png";
	document.getElementById("left_tab").src="data/LeftTab.png";
	setUpAudio();
	changeImgs();
}

function changeImgs()
{
	var arrows= new Array("up","down","right","left","space","click");
	var drumImgs = new Array("hi_hat","kick_drum","snare_drum","cowbell","crash","triangle");
	var pianoImgs = new Array("D3","G3","E3","C3","A3","C4");
	
if(instrument=="drums")
	{
		for(var i=0;i<drumImgs.length;i++)
		{
			document.getElementById(arrows[i] + "_instr").src="data/" + drumImgs[i] + ".png";
		}
	}
	else
	{
		for(var x=0;x<pianoImgs.length;x++)
		{
			document.getElementById(arrows[x] + "_instr").src="data/piano" + pianoImgs[x] + ".png";	
		}
	}

}

window.onkeydown=play;
window.onkeyup=up;

function play(e) {

	for (var i in keyStrings) {
		if (e.keyCode == i) {
			if (!keyStates[i]) {
				var x=0;
				try
				{
					var source = myAudioContext.createBufferSource();
				}
				catch(err)
				{
					alert("Sorry! Your current browser does not support web audio. We recommend downloading the latest version of Google Chrome.");
				}

				switch(i){
				case "37" : x=0; break;
				case "38" : x=1; break;				
				case "39" : x=2; break;				
				case "40" : x=3; break;				
				case "32" : x=4; break;
				default: x=5;
				}				
				source.buffer = buffers[x];
				source.connect(myAudioContext.destination);
				source.noteOn(0);
				var keyString = keyStrings[e.keyCode];	
				var id = keyString.toLowerCase() + "_arrow";
				var source = "data/" + keyString + "ArrowPressed.png";
				document.getElementById(id).src = source;
				keyStates[i] = true;     
			}
		}
	}
}

function up(e) {

	for (var i in keyStrings) {
		if (e.keyCode == i) {
			keyStates[i] = false;
			var keyString = keyStrings[e.keyCode];	
			var id = keyString.toLowerCase() + "_arrow";
			var source = "data/" + keyString + "Arrow.png";
			document.getElementById(id).src = source;
		}
	}
}
