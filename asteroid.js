// Asteroids Falling

//Random Number Creation
function rand(floor, ceil) {
	return Math.floor((Math.random() * (ceil - floor)) + floor);
}
//Setting of Asteroid Speed
var ASTEROID_SPEED = 0.01;

function spawnAsteroid() {

	var type = rand(0, 3);

	//Create Asteroid
	var asteroid = {};
	asteroid.image = document.createElement("img");
	asteroid.image.src = "asteroid1.png";
	asteroid.width = 69;
	asteroid.height = 75;
	asteroid.length = 1;

	var x = rand(0, SCREEN_WIDTH);
	var y = rand(-200, -100)

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