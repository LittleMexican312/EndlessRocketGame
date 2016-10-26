    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;
	
	var controlsImage = new controlsImage();
	
	controlsImage.src = "Controls Image.png";
	
	function updateControls() {
		clearControls();
		drawControls();
	}
	function clearControls() {
		context.clearRect(0, 0, width, height);
	}
	function drawControls(){
		context.drawImage(controlsImage, 0, 0);
	}