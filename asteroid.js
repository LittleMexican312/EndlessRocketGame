// Asteroids Falling

//Random Number Creation
function rand(floor, ceil) {
	return Math.floor((Math.random() * (ceil - floor)) + floor);
}

//Between Number Creation
function between(x, min, max) {
  return x >= min && x <= max;
}

//Setting of Asteroid Speed
var ASTEROID_SPEED = 0.02;

function spawnAsteroid() {

	var type = rand(0, 5);
	
	//Asteroid Variables
	var ASTEROID_SPEED = rand(3, 6);
	var spawnTimer = 0;
	
	//Create Asteroid
	var asteroid = {};
	asteroid.image = document.createElement("img");
	asteroid.width = 69;
	asteroid.height = 75;
	asteroid.length = 1;

	//Random Image Chooser
	if (between(type, 0, 1)) {
		asteroid.image.src = "Asteroid Images/asteroid1.png";
	}
	if (between(type, 1, 2)) {
		asteroid.image.src = "Asteroid Images/asteroid2.png";
	}
	if (between(type, 2, 3)) {
		asteroid.image.src = "Asteroid Images/asteroid3.png";
	}
	if (between(type, 3, 4)) {
		asteroid.image.src = "Asteroid Images/asteroid4.png";
	}
	if (between(type, 4, 5)) {
		asteroid.image.src = "Asteroid Images/asteroid5.png";
	}


	var x = rand(0 + asteroid.width/2, SCREEN_WIDTH-asteroid.width/2);
	var y = rand(-200, -100);

	var dirX = 0;
	var dirY = ASTEROID_SPEED;

	var movX = 0;
	var movY = dirY;

	asteroid.x = x + movX;
	asteroid.y = y + movY;

	asteroid.velocityX = -dirX * ASTEROID_SPEED;
	asteroid.velocityY = ASTEROID_SPEED;

	asteroids.push(asteroid);
}