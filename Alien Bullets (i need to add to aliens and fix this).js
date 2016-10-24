
var alienShootTimer = 0.3;

alien.prototype.update = function(deltaTime) {

if (alienShootTimer <= 0) {
		alienShootTimer += 0.3;
		alienShoot();
	}
}

	//== BULLET STUFF ==//
	
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
    if(alienShootTimer > 0)
        alienShootTimer -= deltaTime;

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