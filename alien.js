// alien spawning

//Random Number Creation
function rand(floor, ceil) {
	return Math.floor((Math.random() * (ceil - floor)) + floor);
}

function spawnAlien() {
	
	var type = rand(0, 5);
	
	//alien Variables
	var ALIEN_SPEED = rand(1, 4);
	var spawnTimer = 0;
	
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

	//== BULLET STUFF ==//
	
	alienBulletTimer = 3
	
	//Alien Shooting Function
function alienShoot()
{
    var alienBullet = {
        image: document.createElement("img"),
        x: 0,
        y: 0,
        width: 5,
        height: 5,
        velocityX: 0,
        velocityY: 0
    };
    alienBullet.image.src = "Player Images/alienBullet.png";

    var velX = 0;
    var velY = -1;

    var s = Math.sin(alien.rotation);
    var c = Math.cos(alien.rotation);

    var xVel = (velX * c) - (velY * s);
    var yVel = (velX * s) + (velY * c);

    alienBullet.velocityX = xVel * ALIENBULLET_SPEED;
    alienBullet.velocityY = yVel * ALIENBULLET_SPEED;

    alienBullet.x = alien.position.x;
    alienBullet.y = alien.position.y;

	alienBullets.push(alienBullet);
}
	
    //Shoot Timer
    if(shootTimer > 0)
        shootTimer -= deltaTime;

    //Bullet Functionality
    for (var i = 0; i < alienBullets.length; i++) {
        alienBullets[i].x += alienBullets[i].velocityX;
        alienBullets[i].y += alienBullets[i].velocityY;
    }
    for (var i = 0; i < alienBullets.length; i++) {
        if (alienBullets[i].x < -alienBullets[i].width ||
            alienBullets[i].x > SCREEN_WIDTH ||
            alienBullets[i].y < -alienBullets[i].height ||
            alienBullets[i].y > SCREEN_HEIGHT) {
            alienBullets.splice(i, 1);
            break;
        }
    }

    //Draw Bullets
    for (var i = 0; i < alienBullets.length; i++) {
        context.drawImage(alienBullets[i].image,
            alienBullets[i].x - alienBullets[i].width / 2,
            alienBullets[i].y - alienBullets[i].height / 2);
    }
	
	if (alienBullets.x < 0 || alienBullets.x > SCREEN_WIDTH || alienBullets.y < 0 || alienBullets.y > SCREEN_HEIGHT) {
          alienBullet.isDead = true;
      }
}