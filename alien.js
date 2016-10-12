// alien spawning

//Random Number Creation
function rand(floor, ceil) {
	return Math.floor((Math.random() * (ceil - floor)) + floor);
}

//Setting of Alien Speed
var ALIEN_SPEED = 0.05;

function spawnAlien() {

	var type = rand(0, 5);
	
	//Create Alien
	var alien = {};
	alien.image = document.createElement("img");
	alien.width = 53;
	alien.height = 28;
	alien.length = 1;

	
	alien.image.src = "alien ship.png";
	


	var x = rand(0 + alien.width/2, SCREEN_WIDTH-alien.width/2);
	var y = rand(-200, -100);

	var dirX = 0;
	var dirY = ALIEN_SPEED;

	var movX = 0;
	var movY = dirY;

	alien.x = x + movX;
	alien.y = y + movY;

	alien.velocityX = -dirX * ALIEN_SPEED;
	alien.velocityY = ALIEN_SPEED;

	aliens.push(alien);
}