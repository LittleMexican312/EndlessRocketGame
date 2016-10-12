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
var spawnAsteroidTimer = 0;
var spawnStarOneTimer = 0;
var spawnStarTwoTimer = 0;
var shootTimer = 0;

// Lives
var lives = 3;

// load an image to draw Hearts
var livesImage = document.createElement("img");
livesImage.src = "Lives.png";

// Asteroids Destroyed
var asteroidsDestroyed = 0;

<<<<<<< HEAD
//Game Variables
=======
// Game Variables
var menuimage = new menuimage();
var controlsImage = new controlsImage();
>>>>>>> origin/master
var background = new background();
var player = new Player();
var keyboard = new Keyboard();

//Create Bullet
var bullets = [];

//Bullet Speed
var BULLET_SPEED = 4;

//Player Shooting Function
function playerShoot()
{
    var bullet = {
        image: document.createElement("img"),
        x: 0,
        y: 0,
        width: 5,
        height: 5,
        velocityX: 0,
        velocityY: 0
    };
    bullet.image.src = "Player Images/bullet.png";

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

	bullets.push(bullet);
}

//Create array for Asteroid
var asteroids = [];

//Create array for Star
var stars = [];
var secondStars = [];

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
<<<<<<< HEAD
 
}

function runGame(deltaTime) {
    background.draw();
=======
	
    //Background
	menuimage.draw();
	
	 //Menu Timer
    menuTimer -= deltaTime;
    if (menuTimer <= 0) {
        gameState = STATE_CONTROLS;
		musicMenu.stop();
		musicInGame.play();
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
	
	musicInGame.unmute();
	
	background.draw();
>>>>>>> origin/master
    player.update(deltaTime);
    gameTimer += deltaTime;

<<<<<<< HEAD
    // Game Timer
    context.fillStyle = "white";
    context.font = "16px Arial";
    var gameTimerText = "Time Survived:  " + gameTimer.toFixed(0);
    context.fillText(gameTimerText, SCREEN_WIDTH - 470, 40);
=======
    // AsteroidsDestroyed
	context.fillStyle = "white";
	context.font="16px Arial";
	var asteroidsDestroyedText = "Asteroids Destroyed: " + asteroidsDestroyed;
	context.fillText(asteroidsDestroyedText, SCREEN_WIDTH - 185, 40);
>>>>>>> origin/master

    // score
    context.fillStyle = "white";
    context.font = "16px Arial";
    var scoreText = "Asteroids Destroyed: " + score;
    context.fillText(scoreText, SCREEN_WIDTH - 185, 40);

    // lives counter
    for (var i = 0; i < lives; i++) {
        context.drawImage(livesImage, 20 + ((livesImage.width + 2) * i), 50);
    }

<<<<<<< HEAD
    //== BULLET STUFF ==//

    //Shoot Timer
    if (shootTimer > 0)
        shootTimer -= deltaTime;

    //Bullet Functionality
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].velocityX;
        bullets[i].y += bullets[i].velocityY;
    }
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].x < -bullets[i].width ||
            bullets[i].x > SCREEN_WIDTH ||
            bullets[i].y < -bullets[i].height ||
            bullets[i].y > SCREEN_HEIGHT) {
            bullets.splice(i, 1);
            break;
        }
    }

    //Draw Bullets
    for (var i = 0; i < bullets.length; i++) {
        context.drawImage(bullets[i].image,
            bullets[i].x - bullets[i].width / 2,
            bullets[i].y - bullets[i].height / 2);
    }

=======
>>>>>>> origin/master
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
<<<<<<< HEAD

    // check if any bullet intersects any asteroid. If so, kill them both
    for (var i = 0; i < asteroids.length; i++) {
        for (var j = 0; j < bullets.length; j++) {
            if (intersects(
                bullets[j].x - bullets[j].width / 2, bullets[j].y -
                bullets[j].height / 2,
                bullets[j].width, bullets[j].height,
                asteroids[i].x - asteroids[i].width / 2, asteroids[i].y - asteroids[i].height / 2,
                asteroids[i].width, asteroids[i].height) == true) {
                asteroids.splice(i, 1); score += 1;
                bullets.splice(j, 1);
                break;
            }
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
            }


            break;
        }
    }


    function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (y2 + h2 < y1 ||
            x2 + w2 < x1 ||
            x2 > x1 + w1 ||
            y2 > y1 + h1) {
            return false;
        }
        return true;
    }
=======
	
		// check if any bullet intersects any asteroid. If so, kill them both
for(var i=0; i<asteroids.length; i++)
{
	for(var j=0; j<bullets.length; j++)
	{
		if(intersects(
		bullets[j].x - bullets[j].width/2, bullets[j].y -
			bullets[j].height/2,
			bullets[j].width, bullets[j].height,
			asteroids[i].x - asteroids[i].width/2, asteroids[i].y - asteroids[i].height/2,
			asteroids[i].width, asteroids[i].height) == true)
		{
			asteroids.splice(i, 1); asteroidsDestroyed += 1;
			bullets.splice(j, 1);
			break;
		}		
	}	
}

for(var i=0; i<asteroids.length; i++) {
	
	if(intersects(
		player.position.x - player.width / 2, player.position.y - player.height / 2,
			player.width, player.height,
			asteroids[i].x - asteroids[i].width/2, asteroids[i].y - asteroids[i].height/2,
			asteroids[i].width, asteroids[i].height) == true)
		{
			asteroids.splice(i, 1);
			lives -= 1;
			
			if (lives == 0) 
			{
				gameState = STATE_GAMEOVER;
				musicInGame.stop();
				musicMenu.play();
			}	
			
			
			break;
		}
}
>>>>>>> origin/master


<<<<<<< HEAD
=======

>>>>>>> origin/master
}
function runGameOver(deltaTime) {
	
	// we will make this look better if we have more time at the end just added this so we had something there
	// and when you press R to restart the asteroids dont reset need to fix that
	
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
	context.fillText("You Destroyed " + asteroidsDestroyed + " Asteroids", 150, 360);
	
	context.fillStyle = "#000";
	context.font="24px Arial";
	context.fillText("Your Score Is " + asteroidsDestroyed * gameTimer.toFixed(0), 150, 390);
	
	context.fillStyle = "#000";
	context.font="24px Arial";
	context.fillText("Press R To Restart", 150, 420);
	
	if (keyboard.isKeyDown(keyboard.KEY_R) == true)
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
		gameState = STATE_GAME;
		gameTimer = 0;
		player.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
		asteroidsDestroyed = 0;
		lives = 3;
		musicMenu.stop();
		musicInGame.play();
		bullets.y = SCREEN_WIDTH;
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