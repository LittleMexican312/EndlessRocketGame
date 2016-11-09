var MenuSelecter = function() {
	this.image = document.createElement("img");
	
	this.position = new Vector2();
	this.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
	
	this.width = 40;
	this.height = 89;
	
	this.image.src = "Selected.png";
		
	this.velocity = new Vector2();
	
	this.rotation = 0;
	
	this.cooldownTimer = 0;
	
	this.previousKeys = keyboard.keys.slice();

	
	this.selected = 2;
};

var positionX = 200;
var positionY = 200;

MenuSelecter.prototype.update = function(deltaTime)
{
	var left = false;
	var right = false;
	var enter = false;
	var selectedTimer = 2;
	
	this.cooldownTimer -= deltaTime;
	
//Check if Key is Down
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true && this.previousKeys[keyboard.KEY_LEFT] == false)
	{
		left = true;
		this.cooldownTimer = 0.2;
	}
		
	if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true && this.previousKeys[keyboard.KEY_RIGHT] == false)
	{
		right = true;
		this.cooldownTimer = 0.2;
	}

	if(keyboard.isKeyDown(keyboard.KEY_ENTER) == true && this.previousKeys[keyboard.KEY_ENTER] == false)
	{
		enter = true;
	}
	
//Add MenuSelecter Speed
	if (left == true) {
		this.selected += 1;
		
		if (this.selected > 3)
		{
			this.selected = 3;
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
	if (this.selected == 2 && enter == true) {
			gameState = STATE_GAME;
			lives = 3;	
	}
	
	if (this.selected == 3 && enter == true) {
		gameState = STATE_CONTROLS;		
	}
	
	if (this.selected == 1 && enter == true) {
		gameState = STATE_ABOUT;		
	}
	
	// If this state is selected Show State Name
	if (this.selected == 1) {
		
		this.position.x = 380;
		this.position.y = 410;
		
		// Selected
	context.fillStyle = "white";
	context.font = "16px Arial";
	var selected1Text = "Selected Button: About ";
	context.fillText(selected1Text, SCREEN_WIDTH - 300, 20);
		
	}

	if (this.selected == 2) {
		
		this.position.x = 275;
		this.position.y = 410;
		
		// Selected
	context.fillStyle = "white";
	context.font = "16px Arial";
	var selected2Text = "Selected Button: Play ";
	context.fillText(selected2Text, SCREEN_WIDTH - 300, 20);
		
	}

	if (this.selected == 3) {
		
		this.position.x = 168;
		this.position.y = 410;
		
		// Selected
	context.fillStyle = "white";
	context.font = "16px Arial";
	var selected3Text = "Selected Button: Controls ";
	context.fillText(selected3Text, SCREEN_WIDTH - 300, 20);
		
	}
	
	this.previousKeys = keyboard.keys.slice();
	
}
	
MenuSelecter.prototype.draw = function()
{
	context.save();
	context.translate(this.position.x, this.position.y);
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}