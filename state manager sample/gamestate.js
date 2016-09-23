// Delta Time
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

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
   
}