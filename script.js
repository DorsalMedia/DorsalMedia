const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

// Check if webcam access is supported.
function getUserMediaSupported() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}

// Placeholder function for next step. Paste over this in the next step.
function enableCam(event) {
}

// Enable the live webcam view and start classification.
function enableCam(event) {
  // Only continue if the COCO-SSD has finished loading.
  if (!model) {
    return;
  }
  
  // Hide the button once clicked.
  event.target.classList.add('removed');  
  
  // getUsermedia parameters to force video but not audio.
  const constraints = {
    video: true
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}

// Placeholder function for next step.
function predictWebcam() {
}

// Pretend model has loaded so we can try out the webcam code.
var model = true;
demosSection.classList.remove('invisible');

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.

cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
});

var children = [];


function predictWebcam() {
  // Now let's start classifying a frame in the stream.
  model.detect(video).then(function (predictions) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
    
    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
	
	
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we  have classified it right, draw it!
      if (predictions[n].score > 0.70) {
        const p = document.createElement('p');
		
			//here we are setting the prediction to the left pane
			var x = document.getElementById("aiLogic").innerText = predictions[n].class;
			
			//var m = document.getElementById("aiDemo").textContent;
			
			//add variable name for the logic
	
		  var person = "person";
			var car = "car";			
			var truck = "truck";
			var bus = "bus";
			var motorbike = "motorcycle";
		
			
			//the actual logic goes here
			
			if ( x == person){	
			
		
			
						
			document.getElementById("vidColor").innerHTML = "Black";
			//document.getElementById("vidMake").innerHTML = "Not applicable";
			document.getElementById("vidModel").innerHTML = "Coat";
			
			
			
			} else if (x == truck){
				
			
				
			
				
				document.getElementById("vidColor").innerHTML = "White";
				//document.getElementById("vidMake").innerHTML = "Mitsubishi";
				document.getElementById("vidModel").innerHTML = "Isuzu";
				
				
		
			
			} else if (x == car){
				
			
			
				
				
				document.getElementById("vidColor").innerHTML = "White";
				//document.getElementById("vidMake").innerHTML = "Toyota";
				document.getElementById("vidModel").innerHTML = "Toyota";
				
			} else if (x == bus){
				
				
			
				
			
				
				document.getElementById("vidColor").innerHTML = "White";
				//document.getElementById("vidMake").innerHTML = "Mitsubishi";
				document.getElementById("vidModel").innerHTML = "Isuzu";
				
			} else if (x == motorbike){
				
				document.getElementById("vidColor").innerHTML = "White";
				//document.getElementById("vidMake").innerHTML = "Mitsubishi";
				document.getElementById("vidModel").innerHTML = "Ndudhi";
				
			} else{
				
				
			document.getElementById("vidColor").innerHTML = "Across";
			//document.getElementById("vidMake").innerHTML = "Not applicable";
			document.getElementById("vidModel").innerHTML = "The Road";
			}
			
		
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% Accuracy.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }
	
	
    
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
	
	
  });

  
}







	
