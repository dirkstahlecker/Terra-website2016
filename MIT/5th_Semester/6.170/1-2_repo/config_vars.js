//configuration variables
var GRID_WIDTH = 50;
var GRID_HEIGHT = 50;
var FPS = 1;
var RUNNING = false; //don't let user click change anything if running

var ALIVE_CLASS = "cell alive";
var DEAD_CLASS = "cell dead";

var DEBUG = false;

/*
/* 
Resets all global variables to their initial value
Also used to set initial values

function reset_all() {
	GRID_WIDTH = 20;
	GRID_HEIGHT = 20;
	FPS = 1;

	SIDE_LENGTH = 10;
	BORDER_COLOR = "black";
	BORDER_WIDTH = "1px";
	BORDER_STYLE = "solid";
	DEAD_FILL = "white";
	ALIVE_FILL = "blue";

	DEBUG = false;

	//reset array
	initialSetup();
}
*/