var menuimage = new menuimage();

var SplashState = function() 
{
	this.prototype = BaseState;
}

SplashState.prototype.load = function() 
{
}

SplashState.prototype.unload = function() 
{
}

SplashState.prototype.update = function(dt) 
{
	if( keyboard.isKeyDown( keyboard.KEY_SPACE ) == true )
	{
		stateManager.switchState( new GameState() );
	}
}

SplashState.prototype.draw = function() 
{
	menuimage.draw();
}