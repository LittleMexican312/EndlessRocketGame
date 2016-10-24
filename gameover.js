    var mouseX;
	var mouseY;
	
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;
    
	var gameOverBG = new Image();
    var gameOverTitle = new Image();
    var gameOverPlay = new Image();
    var gameOverMain = new Image();
	var backgroundY = 0;
	var speed = 1;
	
	var gameOverButtonX = [283,198];
	var gameOverButtonY = [349,349];
	var gameOverButtonWidth = [50,50];
	var gameOverButtonHeight = [50,50];

	gameOverBG.src = "Menu Images/Background.png";
	gameOverTitle.src = "Menu Images/gameOverTitle.png";

	gameOverPlay.onload = function(){
		context.drawImage(gameOverPlay, gameOverButtonX[0], gameOverButtonY[0]);
	}
	gameOverPlay.src = "Menu Images/playButton.png";

    gameOverMain.onload = function(){
		context.drawImage(gameOverMain, gameOverButtonX[1], gameOverButtonY[1]);
	}
	gameOverMain.src = "Menu Images/mainMenuButton.png";
	
	function updateGameOver() {
		clearGameOver();
		drawGameOver();

        canvas.addEventListener("mousemove", checkPosGameOver);
	    canvas.addEventListener("mouseup", checkClickGameOver);
	}
	function clearGameOver() {
		context.clearRect(0, 0, width, height);
	}
	function drawGameOver(){
		context.drawImage(gameOverBG, 0, backgroundY);
		context.drawImage(gameOverTitle, 120, 210);
		context.drawImage(gameOverPlay, gameOverButtonX[0], gameOverButtonY[0]);
		context.drawImage(gameOverMain, gameOverButtonX[1], gameOverButtonY[1]);
	}

    function checkPosGameOver(mouseEvent){
		if(mouseEvent.pageX || mouseEvent.pageY == 0){
			mouseX = mouseEvent.pageX - this.offsetLeft;
			mouseY = mouseEvent.pageY - this.offsetTop;
		}else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
			mouseX = mouseEvent.offsetX;
			mouseY = mouseEvent.offsetY;
		}
	}

	function checkClickGameOver(mouseEvent){
		for(i = 0; i < gameOverButtonX.length; i++){
			if(mouseX > gameOverButtonX[i] && mouseX < gameOverButtonX[i] + gameOverButtonWidth[i]){
				if(mouseY > gameOverButtonY[i] && mouseY < gameOverButtonY[i] + gameOverButtonHeight[i]){
					fadeId = setInterval("fadeOut()", 1000/frames);
					clearInterval(timerId);
					canvas.removeEventListener("mousemove", checkPosGameOver);
					canvas.removeEventListener("mouseup", checkClickGameOver);
                    if (i == 0) {
                        console.log("am i working?"); 
                        gameState = STATE_GAME;
                        musicMenu.stop();
                        musicInGame.play();
                        lives = 3;
                    }
				}
			}
		}
    }