// Asteroids Falling

// rand(floor, ceil)
// Return a random number within the range of the two input variables

function rand(floor, ceil)
{
	return Math.floor( (Math.random()* (ceil-floor)) +floor );
}

// Create a new random asteroid and add it to our asteroids array.
// We'll give the asteroid a random position (just off screen) and
// set it moving towards the center of the screen

function spawnAsteroid()
{
	// make a random variable to specify which asteroid image to use
	// (small, mediam or large)
	
	var type = rand(0, 3);
	
	// create the new asteroid
	
	var asteroid = {};
	asteroid.image = document.createElement("img");
	asteroid.image.src = "asteroid.png";
	asteroid.width = 65;
	asteroid.height = 65;
	
	// to set a random position just off screen, we'll start at the centre of the
	// screen then move in a random direction by the width of the screen
	
	var x = SCREEN_WIDTH/2;
	var y = SCREEN_HEIGHT/2;
	var dirX = rand(-10,10);
	var dirY = rand(-10,10);
	
	// 'normalize' the direction (the hypotenuse of the triangle formed
	// by x,y will equal 1)
	
	var magnitude = (dirX * dirX) + (dirY * dirY);
	if(magnitude != 0)
	{
		var oneOverMag = 1 / Math.sqrt(magnitude);
		dirX *= oneOverMag;
		dirY *= oneOverMag;
	}
	
	// now we can multiply the dirX/Y by the screen width to move that amount from
	// the centre of the screen
	
	var movX = 0
	var movY = dirY * SCREEN_HEIGHT;
	
	// add the direction to the original position to get the starting position of the
	// asteroid
	
	asteroid.x = x + movX;
	asteroid.y = y + movY;
	
	// now, the easy way to set the velocity so that the asteroid moves towards the
	// centre of the screen is to just reverse the direction we found earlier
	
	asteroid.velocityX = -dirX * ASTEROID_SPEED;
	asteroid.velocityY = -dirY * ASTEROID_SPEED;
	
	// finally we can add our new asteroid to the end of our asteroids array
	
	asteroids.push(asteroid);
}