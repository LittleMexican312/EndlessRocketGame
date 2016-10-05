//------ ROCKET GAME ------//
//Good Memes
//Setting of Canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

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
var menuTimer = 3;
var controlsTimer = 3;
var gameTimer = 0;
var spawnTimer = 0;


// Lives
var Lives = 3;

//Game Variables
var menuimage = new menuimage();
var controlsImage = new controlsImage();
var background = new background();
var player = new Player();
var keyboard = new Keyboard();

//Create Bullet
var bullet = {
    image: document.createElement("img"),

    x: player.position.x,
    y: player.position.y,

    width: 5,
    height: 5,

    velocityX: 0,
    velocityY: 0,

    isDead: true,
};

//Bullet Image32
bullet.image.src = "bullet.png";

//Bullet Speed
var BULLET_SPEED = 4;

//Player Shooting Function
function playerShoot()
{
    if(bullet.isDead == false )
        return;

    var velX = 0;
    var velY = -1;

    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);

    var xVel = (velX * c) - (velY * s);
    var yVel = (velX * s) + (velY * c);

    bullet.velocityX = xVel * BULLET_SPEED;
    bullet.velocityY = yVel * BULLET_SPEED;

    bullet.x = player.position.x;
    bullet.y = player.position.y;

	bullet.isDead = false;
}

//Create array for Asteroid
var asteroids = [];

//Random Number for Asteroid Spawning
function rand(floor, ceil) {
    return Math.floor((Math.random() * (ceil - floor)) + floor);
}

//Asteroid Variables
var ASTEROID_SPEED = rand(3, 6);
var spawnTimer = 0;

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

function runMainMenu(deltaTime) {
    //Background
	
	menuimage.draw();
	
	
    //Menu Timer
    menuTimer -= deltaTime;
    if (menuTimer <= 0) {
        gameState = STATE_CONTROLS;
    }


}

function runControls(deltaTime) {
    //Background
	
	controlsImage.draw();
	
	
    //Controls Timer
    controlsTimer -= deltaTime;
    if (controlsTimer <= 0) {
        gameState = STATE_GAME;
    }


}

function runGame(deltaTime) {	
	background.draw();
    player.update(deltaTime);
    player.draw();
	
	gameTimer += deltaTime;
	
	// Game Timer
	context.fillStyle = "white";
	context.font = "16px Arial";
	var gameTimerText = "Time Left:" + gameTimer.toFixed(0);
	context.fillText(gameTimerText, SCREEN_WIDTH - 470, 40);

    // Bullet Functionality
    if (bullet.isDead == false) {
        bullet.x += bullet.velocityX;
        bullet.y += bullet.velocityY;
        context.drawImage(bullet.image,
            bullet.x - bullet.width / 2, bullet.y - bullet.height / 2);
    }
    //Bullet Restrictions w/ Wall
    if (bullet.x < 0 || bullet.x > SCREEN_WIDTH || bullet.y < 0 || bullet.y > SCREEN_HEIGHT) {
        bullet.isDead = true;
    }

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
    spawnTimer -= deltaTime;
    if (spawnTimer <= 0) {
        spawnTimer = 1;
        spawnAsteroid();
    }
    	
}
function runGameOver(deltaTime) {
	
	if (gameState = STATE_GAMEOVER) {
        bullet.isDead = true;
	}
	
	// we will make this look better if we have more time at the end just added this so we had something there
	// and when you press R to restart the balls (soon to be changed to asteroids) dont reset need to fix that
	
	context.fillStyle = "#000";
	context.font="24px Arial";
	context.fillText("Game Over!", 165, 240);
	
	context.fillStyle = "#000";
	context.font="24px Arial";
	context.fillText("You Survived For ", 165, 270);
	
	context.fillStyle = "#000";
    context.font = "24px Arial";
    context.fillText(gameTimer.toFixed(0) + " Seconds", 165, 300);
	
	context.fillStyle = "#000";
	context.font="24px Arial";
	context.fillText("Good Job!", 165, 330);
	
	context.fillStyle = "#000";
	context.font="24px Arial";
	context.fillText("Press R To Restart", 150, 360);
		
	if (keyboard.isKeyDown(keyboard.KEY_R) == true)
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
		gameState = STATE_GAME;
		gameTimer = 0;
		player.position.set(200, 200);
	}
	
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