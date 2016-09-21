var GameState = function() 
{
	this.prototype = BaseState;
}

GameState.prototype.load = function() 
{
}

GameState.prototype.unload = function() 
{
}

GameState.prototype.update = function(dt) 
{
}

GameState.prototype.draw = function() 
{
	background.draw();
	player.update(deltaTime);
    player.draw();
    animate();
   
}