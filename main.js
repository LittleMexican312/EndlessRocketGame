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
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var STATE_UPGRADEMENU = 3;

var gameState = STATE_MENUSCREEN;

//Timers
var menuTimer = 3;

//Game Variables
var menuimage = new menuimage();
var background = new background();
var player = new Player();
var keyboard = new Keyboard();

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
// newly spawned objects start at Y=25
var spawnLineY = -10;

// spawn a new object every 1500ms
var spawnRate = 1000;

// set how fast the objects will fall
var spawnRateOfDescent = 0.5;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

function getRandomImage () {
var randomImageArray = new Array();
    randomImageArray[1] = 1;
    randomImageArray[2] = 2;
    randomImageArray[3] = 3;
var randomArrayNumber = randomImageArray[Math.floor(Math.random() * randomImageArray.length)];
console.log(randomArrayNumber);
}
getRandomImage();

var object = function spawnRandomObject() {
    this.image = document.createElement("img");
    this.x = 0;
    this.y = 0;

    if (randomImageArray = 1) {
        this.image.src = "asteroid1.png";
        getRandomImage();
    }
    if (randomArrayNumber = 2) {
        this.image.src = "asteroid2.png";
        getRandomImage();
    }
    if (randomImageArray = 3) {
        this.image.src = "asteroid3.png";
        getRandomImage();
    }

    objects.push(object);
}
function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // draw the line where new objects are spawned
    context.beginPath();
    context.moveTo(0, spawnLineY);
    context.lineTo(canvas.width, spawnLineY);
    context.stroke();

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        context.beginPath();
        context.arc(object.x, object.y, 8, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = object.type;
        context.fill();

        object.y += spawnRateOfDescent;
    }

}

function runMainMenu(deltaTime) {
    //Background
	
	menuimage.draw();
	
	
    //Menu Timer
    menuTimer -= deltaTime;
    if (menuTimer <= 0) {
        gameState = STATE_GAME;
    }


}
function runGame(deltaTime) {
	background.draw();
    player.update(deltaTime);
    player.draw();
    animate();
}
function runGameOver(deltaTime) {
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