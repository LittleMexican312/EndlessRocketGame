//------ ROCKET GAME ------//
//Good Memes
//Setting of Canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//Mouse Listeners
canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

//Screen Variables
var SCREEN_HEIGHT = canvas.height;
var SCREEN_WIDTH = canvas.width;

// Delta Time
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

//Get DeltaTime
function getDeltaTime() {
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

	if (deltaTime > 1)
		deltaTime = 1;

	return deltaTime;
}

// ---- DO NOT EDIT ANYTHING ABOVE THIS FRIENDS ---- //



//Game State Variables
var STATE_MENUSCREEN = 0;
var STATE_CONTROLS = 1;
var STATE_GAME = 2;
var STATE_GAMEOVER = 3;
var STATE_UPGRADEMENU = 4;

var gameState = STATE_MENUSCREEN;

//Timers
//State Timers
var menuTimer = 3;
var controlsTimer = 3;
var gameTimer = 0;

//Obstacle Timers
var spawnAlienTimer = 0;
var spawnAsteroidTimer = 0;
var spawnStarOneTimer = 0;
var spawnStarTwoTimer = 0;
var shootTimer = 0;
var asteroidSpeedTimer = 1;

// Lives
var lives = 3;

// load an image to draw Hearts
var livesImage = document.createElement("img");
livesImage.src = "Lives.png";

// Asteroids Destroyed
var asteroidsDestroyed = 0;

// Aliens Killed
var aliensKilled = 0;

// Game Variables
var menuimage = new menuimage();
var background = new background();
var player = new Player();
var keyboard = new Keyboard();

// Arrays
//Create Bullet
var bullets = [];

//Bullet Speed
var BULLET_SPEED = 4;

//Create Alien Bullet
var alienBullets = [];

//Alien Bullet Speed
var ALIENBULLET_SPEED = 4;

//create array for alien
var aliens = [];

//Create array for Asteroid
var asteroids = [];

//Create array for Star
var stars = [];
var secondStars = [];

//Main Menu Variables
	var frames = 30;
    var timerId = 0;
	var fadeId = 0;
	var time = 0.0;

//Random Number for Asteroid Spawning
function rand(floor, ceil) {
    return Math.floor((Math.random() * (ceil - floor)) + floor);
}

// Run Statement
function run () {	
    context.fillStyle = "#ccc";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    var deltaTime = getDeltaTime();

    
    //Game States
    switch (gameState) {
        case STATE_MENUSCREEN:
            runMainMenu(deltaTime);
            break;
		case STATE_CONTROLS:
            runControls(deltaTime);
            break;
        case STATE_GAME:
            runGame(deltaTime);			
            break;
        case STATE_GAMEOVER:
            runGameOver(deltaTime);
            break;
        case STATE_UPGRADEMENU:
            runUpgradeMenu(deltaTime);
            break;
    }
}

var musicMenu;
var musicInGame;
var bulletSound;

function initialize() {

	musicMenu = new Howl(
	{
		urls: ["Music/Menu Music.wav"],
		loop: true,
		buffer: true,
		volume: 0.5
	} );
	musicMenu.play();
	musicMenu.loop();
	
	musicInGame = new Howl(
	{
		urls: ["Music/game play.wav"],
		loop: true,
		buffer: true,
		volume: 0.5
	} );
	
	bulletSound = new Howl(
	{
		urls: ["Music/Bullet Sound.wav"],
		buffer: true,
		volume: 0.1,
		onend: function() {
			isSfxPlaying = false;
		}
	} );
	
}

initialize();

function runMainMenu(deltaTime) {
	updateMainMenu();
}

function runGame(deltaTime) {
	
	musicInGame.unmute();
	
	background.draw();
    player.update(deltaTime);
	gameTimer += deltaTime;
	asteroidSpeedTimer += deltaTime;
		
	// Game Timer
	context.fillStyle = "white";
	context.font = "16px Arial";
	var gameTimerText = "Time Survived:  " + gameTimer.toFixed(0);
	context.fillText(gameTimerText, SCREEN_WIDTH - 470, 40);

    // AsteroidsDestroyed
	context.fillStyle = "white";
	context.font="16px Arial";
	var asteroidsDestroyedText = "Asteroids Destroyed: " + asteroidsDestroyed;
	context.fillText(asteroidsDestroyedText, SCREEN_WIDTH - 185, 40);

	// lives counter
	for(var i=0; i<lives; i++)
	{
		context.drawImage(livesImage, 20 + ((livesImage.width+2)*i), 50);
	}

	//Asteroid Speed Changer
	for (var i=1; i < asteroidSpeedTimer; i++)
	{
		ASTEROIDLOW_SPEED + 0.1;
		ASTEROIDHIGH_SPEED + 0.1;
		asteroidSpeedTimer = 0;
	}

    //== STAR STUFF ==//
    //Star one

    //Update Stars
    for (var i = 0; i < stars.length; i++) {
        stars[i].x = stars[i].x + stars[i].velocityX;
        stars[i].y = stars[i].y + stars[i].velocityY;
    }

    //Draw all Stars
    for (var i = 0; i < stars.length; i++) {
        context.drawImage(stars[i].image, stars[i].x - stars[i].width / 2,
            stars[i].y - stars[i].height / 2);
    }
    spawnStarOneTimer -= deltaTime;
    if (spawnStarOneTimer <= 0) {
        spawnStarOneTimer = 0.02;
        spawnStarOne();
    }

    //Star Two
    //Update Stars
    for (var i = 0; i < secondStars.length; i++) {
        secondStars[i].x = secondStars[i].x + secondStars[i].velocityX;
        secondStars[i].y = secondStars[i].y + secondStars[i].velocityY;
    }

    //Draw all Stars
    for (var i = 0; i < secondStars.length; i++) {
        context.drawImage(secondStars[i].image, secondStars[i].x - secondStars[i].width / 2,
            secondStars[i].y - secondStars[i].height / 2);
    }
    spawnStarTwoTimer -= deltaTime;
    if (spawnStarTwoTimer <= 0) {
        spawnStarTwoTimer = 0.03;
        spawnSecondStar();
    }


	// draw the alien
    for (var i = 0; i < aliens.length; i++) {
        aliens[i].x = aliens[i].x + aliens[i].velocityX;
        aliens[i].y = aliens[i].y + aliens[i].velocityY;
    }

    //Draw all aliens
    for (var i = 0; i < aliens.length; i++) {
        context.drawImage(aliens[i].image, aliens[i].x - aliens[i].width / 2,
            aliens[i].y - aliens[i].height / 2);
    }
    spawnAlienTimer -= deltaTime;
    if (spawnAlienTimer <= 0) {
        spawnAlienTimer = 5;
        spawnAlien();
    }

    //=== ASTEROID STUFF ===//

    //Update Asteroids
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].x = asteroids[i].x + asteroids[i].velocityX;
        asteroids[i].y = asteroids[i].y + asteroids[i].velocityY;
    }

    //Draw all Asteroids
    for (var i = 0; i < asteroids.length; i++) {
        context.drawImage(asteroids[i].image, asteroids[i].x - asteroids[i].width / 2,
            asteroids[i].y - asteroids[i].height / 2);
    }
    spawnAsteroidTimer -= deltaTime;
    if (spawnAsteroidTimer <= 0) {
        spawnAsteroidTimer = 1;
        spawnAsteroid();
    }
    player.draw();


		// check if any asteroids  intersects any aliens. If so, kill the asteroid
	for (var i = 0; i < asteroids.length; i++) {
		for (var j = 0; j < aliens.length; j++) {
			if (intersects(
				aliens[j].x - aliens[j].width / 2, aliens[j].y -
				aliens[j].height / 2,
				aliens[j].width, aliens[j].height,
				asteroids[i].x - asteroids[i].width / 2, asteroids[i].y - asteroids[i].height / 2,
				asteroids[i].width, asteroids[i].height) == true) {
				asteroids.splice(i, 1)
				break;
			}
		}
	}

	
		// check if any bullet intersects any asteroid. If so, kill them both
	for (var i = 0; i < asteroids.length; i++) {
		for (var j = 0; j < bullets.length; j++) {
			if (intersects(
				bullets[j].x - bullets[j].width / 2, bullets[j].y -
				bullets[j].height / 2,
				bullets[j].width, bullets[j].height,
				asteroids[i].x - asteroids[i].width / 2, asteroids[i].y - asteroids[i].height / 2,
				asteroids[i].width, asteroids[i].height) == true) {
				asteroids.splice(i, 1); asteroidsDestroyed += 1;
				bullets.splice(j, 1);
				break;
			}
		}
	}

	for (var i = 0; i < aliens.length; i++) {
		for (var j = 0; j < bullets.length; j++) {
			if (intersects(
				bullets[j].x - bullets[j].width / 2, bullets[j].y - bullets[j].height / 2,
				bullets[j].width, bullets[j].height,
				aliens[i].x - aliens[i].width / 2, aliens[i].y - aliens[i].height / 2,
				aliens[i].width, aliens[i].height) == true) {

				aliens.splice(i, 1); aliensKilled += 1;
				bullets.splice(j, 1);
				break;
			}
		}
	}

	for (var i = 0; i < aliens.length; i++) {

		if (intersects(
			player.position.x - player.width / 2, player.position.y - player.height / 2,
			player.width, player.height,
			aliens[i].x - aliens[i].width / 2, aliens[i].y - aliens[i].height / 2,
			aliens[i].width, aliens[i].height) == true) {
			aliens.splice(i, 1);
			lives -= 1;

			if (lives == 0) {
				gameState = STATE_GAMEOVER;
				musicInGame.stop();
				musicMenu.play();
			}

			break;
		}
	}

	for (var i = 0; i < asteroids.length; i++) {

		if (intersects(
			player.position.x - player.width / 2, player.position.y - player.height / 2,
			player.width, player.height,
			asteroids[i].x - asteroids[i].width / 2, asteroids[i].y - asteroids[i].height / 2,
			asteroids[i].width, asteroids[i].height) == true) {
			asteroids.splice(i, 1);
			lives -= 1;

			if (lives == 0) {
				gameState = STATE_GAMEOVER;
				musicInGame.stop();
				musicMenu.play();
			}


			break;
		}
	}

	// tests if two rectangles are intersecting.
	// Pass in the x,y coordinates, width and height of each rectangle.
	// Returns 'true' if the rectangles are intersecting
	function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
		if (y2 + h2 < y1 ||
			x2 + w2 < x1 ||
			x2 > x1 + w1 ||
			y2 > y1 + h1) {
			return false;
		}
		return true;
	}


}
function runGameOver(deltaTime) {
	updateGameOver();

	context.fillStyle = "white";
	context.font="21px Arial";
	context.fillText("Points: " + asteroidsDestroyed * gameTimer.toFixed(0) * aliensKilled, 240, 311);

	
}
function runUpgradeMenu(deltaTime) {
}

// ---- DO NOT EDIT ANYTHING BELOW THIS FRIENDS ---- //
(function () {
	var onEachFrame;
	if (window.requestAnimationFrame) {
		onEachFrame = function (cb) {
			var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
			_cb();
		};
	} else if (window.mozRequestAnimationFrame) {
		onEachFrame = function (cb) {
			var _cb = function () { cb(); window.mozRequestAnimationFrame(_cb); }
			_cb();
		};
	} else {
		onEachFrame = function (cb) {
			setInterval(cb, 1000 / 60);
		}
	}

	window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);