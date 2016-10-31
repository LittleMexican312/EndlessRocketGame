var GameOverSelecter = function() {
	this.image = document.createElement("img");
	
	this.position = new Vector2();
	this.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
	
	this.width = 40;
	this.height = 89;
	
	this.image.src = "Selected.png";
		
	this.velocity = new Vector2();
	
	this.rotation = 0;
	
	this.cooldownTimer = 0;
	
	this.selected = 1;
};

var positionX = 200;
var positionY = 200;

GameOverSelecter.prototype.update = function(deltaTime)
{
	var left = false;
	var right = false;
	var enter = false;
	var selectedTimer = 2;
	
	this.cooldownTimer -= deltaTime;
	
//Check if Key is Down
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true && this.cooldownTimer <= 0)
	{
		left = true;
		this.cooldownTimer = 0.2;
	}
	
	if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true && this.cooldownTimer <= 0)
	{
		right = true;
		this.cooldownTimer = 0.2;
	}

	if(keyboard.isKeyDown(keyboard.KEY_ENTER) == true)
	{
		enter = true;
	}
	
//Add MenuSelecter Speed
	if (left == true) {
		this.selected += 1;
		
		if (this.selected > 2)
		{
			this.selected = 2;
		}
	}
	
	if (right == true) {
		this.selected -= 1;
		
		if (this.selected < 1)
		{
			this.selected = 1;
		}
	}
	if (enter == true){
		
	}

	// If Enter is pressed Go to (This State)
	if (this.selected == 1 && enter == true) {
			gameState = STATE_GAME;		
	}

	if (this.selected == 2 && enter == true) {
		gameState = STATE_MENUSCREEN;		
	}
	
	// If this state is selected Show State Name
	if (this.selected == 1) {
		
		this.position.x = 320;
		this.position.y = 370;
		
		// Selected
	context.fillStyle = "white";
	context.font = "16px Arial";
	var selected1Text = "Selected Button: Play ";
	context.fillText(selected1Text, SCREEN_WIDTH - 300, 20);
		
	}

	if (this.selected == 2) {
		
		this.position.x = 235;
		this.position.y = 370;
		
		// Selected
	context.fillStyle = "white";
	context.font = "16px Arial";
	var selected2Text = "Selected Button: Menu ";
	context.fillText(selected2Text, SCREEN_WIDTH - 300, 20);
		
	}
}
	
GameOverSelecter.prototype.draw = function()
{
	context.save();
	context.translate(this.position.x, this.position.y);
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}