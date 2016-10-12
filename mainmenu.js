
	var mouseX;
	var mouseY;

    var pageX;
    var pageY;
	
	var bgImage = new Image();
	var logoImage = new Image();
	var playImage = new Image();
	var aboutImage = new Image ();
	var controlsImage = new Image ();

	var backgroundY = 0;
	var speed = 1;
	
	var buttonX = [360,485,235];
	var buttonY = [385,385,385];
	var buttonWidth = [50,50,50];
	var buttonHeight = [50,50,50];

	var frames = 30;
    var timerId = 0;
	var fadeId = 0;
	var time = 0.0;

	bgImage.src = "background.png";
	logoImage.src = "Menu Images/mainTitle.png";
	playImage.src = "Menu Images/playButton.png";
	aboutImage.src = "Menu Images/aboutButton.png";
	controlsImage.src = "Menu Images/controlsButton.png";
	
	
	function updateMainMenu() {
		clearMainMenu();
		drawMainMenu();
	}
	function clearMainMenu() {
		context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	}
	function drawMainMenu(){
		context.drawImage(bgImage, 0, backgroundY);
		context.drawImage(logoImage, 250, 210);
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
					fadeId = setInterval("fadeOut()", 1000/frames);
					clearInterval(timerId);
					document.removeEventListener("mousemove", checkPos);
					document.removeEventListener("mouseup", checkClick);
				}
			}
		}
	}
	function fadeOut(){
		context.fillStyle = "rgba(0,0,0, 0.2)";
		context.fillRect (0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		time += 0.1;
		if(time >= 2){
			clearInterval(fadeId);
			time = 0;
			timerId = setInterval("updateMainMenu()", 1000/frames);
			document.addEventListener("mousemove", checkPos);
			document.addEventListener("mouseup", checkClick);
		}
    }