 	var mouseX;
	var mouseY;
	

    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;
    
	var backButton = new Image();
	var controlsImage = new Image ();
	var speed = 1;
	
	var buttonX = [240];
	var buttonY = [385];
	var buttonWidth = [50,50,50];
	var buttonHeight = [50,50,50];

	controlsImage.src = "Controls Images/Controls Image.png";
	backButton.src = "Controls Images/Back button.png";
	backButton.onload = function(){
		context.drawImage(backButton, buttonX[0], buttonY[0]);

	
	
	canvas.addEventListener("mousemove", checkPos);
	canvas.addEventListener("mouseup", checkClick);
	
	function updateControls() {
		clearControls();
		drawControls();

		canvas.addEventListener("mousemove", checkPos);
		canvas.addEventListener("mouseup", checkClick);
	}
	function clearControls() {
		context.clearRect(0, 0, width, height);
	}
	function drawControls(){
		
		context.drawImage(controlsImage, 0);
		context.drawImage(backButton, buttonX[0], buttonY[0]);
	}
	function checkPos(mouseEvent){
		if(mouseEvent.pageX || mouseEvent.pageY == 0){
			mouseX = mouseEvent.pageX - this.offsetLeft;
			mouseY = mouseEvent.pageY - this.offsetTop;
		}else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
			mouseX = mouseEvent.offsetX;
			mouseY = mouseEvent.offsetY;
		}
	}
	function checkClick(mouseEvent){
		for(i = 0; i < buttonX.length; i++){
			if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
				if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
					fadeId = setInterval("fadeOut()", 1000/frames);
					clearInterval(timerId);
					canvas.removeEventListener("mousemove", checkPos);
					canvas.removeEventListener("mouseup", checkClick);
                    if (i == 0) { 
                        gameState = STATE_GAME;
                        musicMenu.stop();
                        musicInGame.play();
                    }
				}
			}
		}
	}

	function fadeOut(){
		context.fillStyle = "rgba(0,0,0, 0.2)";
		context.fillRect (0, 0, width, height);
		time += 0.1;
		if(time >= 2){
			clearInterval(fadeId);
			time = 0;
			timerId = setInterval("updateControls()", 1000/frames);
			canvas.addEventListener("mousemove", checkPos);
			canvas.addEventListener("mouseup", checkClick);
		}
	}
}