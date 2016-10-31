    var mouseX;
	var mouseY;
	
	
	var controlsImage = document.createElement("img");
	controlsImage.src = "Controls Image.png";
	

    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;
    
	var bgImage = new Image();
	var logoImage = new Image();
	var playImage = new Image();
	var aboutImage = new Image ();
	var controlsImage = new Image ();
	var backgroundY = 0;
	var speed = 1;
	
	var buttonX = [240,345,135];
	var buttonY = [385,385,385];
	var buttonWidth = [50,50,50];
	var buttonHeight = [50,50,50];


	bgImage.src = "Menu Images/Background.png";
	logoImage.src = "Menu Images/mainTitle.png";
	playImage.onload = function(){
		context.drawImage(playImage, buttonX[0], buttonY[0]);
	}
	playImage.src = "Menu Images/playButton.png";
	aboutImage.onload = function(){
		context.drawImage(aboutImage, buttonX[1], buttonY[1]);
	}
	aboutImage.src = "Menu Images/aboutButton.png";
	controlsImage.onload = function(){
		context.drawImage(controlsImage, buttonX[2], buttonY[2]);
	}
	controlsImage.src = "Menu Images/controlsButton.png";
	
	
	canvas.addEventListener("mousemove", checkPos);
	canvas.addEventListener("mouseup", checkClick);
	
	function updateMainMenu() {
		clearMainMenu();
		drawMainMenu();
		
	canvas.addEventListener("mousemove", checkPos);
	canvas.addEventListener("mouseup", checkClick);
	
	}
	
	function clearMainMenu() {
		context.clearRect(0, 0, width, height);
	}
	function drawMainMenu(){
		context.drawImage(bgImage, 0, backgroundY);
		context.drawImage(logoImage, 120, 210);
		menuselecter.draw();
		context.drawImage(playImage, buttonX[0], buttonY[0]);
		context.drawImage(aboutImage, buttonX[1], buttonY[1]);
		context.drawImage(controlsImage, buttonX[2], buttonY[2]);
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
	
		for(i = 2; i < buttonX.length; i++){
			if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
				if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]){
					clearInterval(timerId);
					canvas.removeEventListener("mousemove", checkPos);
					canvas.removeEventListener("mouseup", checkClick);
                    if (i == 2) { 
                        gameState = STATE_CONTROLS;
						context.drawImage(controlsImage, 0, 0);
                    }
				}
			}
		}