var array = []; //holds the current state of the board at any given point
//rep:  TODO: update this
//two-dimensional array representing a grid
//contains a Coordinate object and a state in each cell at all times
//state is always "ALIVE" or "DEAD"
//coordinate is always 0 <= x < GRID_WIDTH
//					   0 <= y < GRID_HEIGHT 

/* 
Goes through the array and changes states according to rules each timestep
*/
var updateLivingness = function () {
	var updated_array = []; //needs to happen simultaneously, can't change array in place
	for (var i = 0; i < array.length; i++) {
		var updated_subarray = [];
		for (var j = 0; j < array[i].length; j++) {
			var obj = array[i][j];
			var num_neighbors = getNumNeighbors(i,j,array);
			var new_obj = {state:obj.state, idTag:obj.idTag};

			if (obj.state == "ALIVE" && (num_neighbors == 0 || num_neighbors == 1)) {
				//death from underpopulation
				new_obj.state = "DEAD";
			}
			//no change at 2 or 3 - state stays the same
			else if (obj.state == "DEAD" && num_neighbors == 3) {
				//reproduction
				new_obj.state = "ALIVE";
			}
			else if (obj.state == "ALIVE" && num_neighbors > 3) {
				//death from overcrowding
				new_obj.state = "DEAD";
			}
			//create a new array to reflect these changes
			updated_subarray.push(new_obj);
		}
		updated_array.push(updated_subarray);
	}
	//update array with changes on this timestep
	array = updated_array;
}

/*
for use when user clicks cells to make them alive
resyncs the array with the divs
*/
function syncArray() {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (document.getElementById(array[i][j].idTag).className == ALIVE_CLASS) {
				array[i][j].state = "ALIVE";
			}
			else {
				array[i][j].state = "DEAD";
			}
		}
	}
}

/*
Find out how many neighbors a cell has
Arguments: 
	i: x coordinate
	j: y coordinate
Returns: integer representing number of neighbors
*/
var getNumNeighbors = function(i,j) {
	var xs = [i-1,i,i+1];
	var ys = [j-1,j,j+1];
	var count = 0;
	for (var x_el = 0; x_el < 3; x_el++) {
		for (var y_el = 0; y_el < 3; y_el++) {
			var x = xs[x_el];
			var y = ys[y_el];

			if (x == i && y == j) { //don't count the cell's own state
				continue;
			}
			if (x < 0 || y < 0 || x > GRID_WIDTH || y > GRID_HEIGHT) {
				continue;
			}
			
			//wrap the board around on itself to kind of simulate an infinite grid
			//in other words, cells on edges can have neighbors on opposite edges
			if (x == GRID_WIDTH) {
				if (y == GRID_HEIGHT) {
					if (array[0][0].state == "ALIVE") {
						count++;
					}
				}
				continue;
			}
			else if (x == -1) {
				if (array[GRID_WIDTH-1][y].state == "ALIVE") {
					count++;
				}
				continue;
			}

			if (y == GRID_HEIGHT) {
				if (array[x][0].state == "ALIVE") {
					count++;
				}
				continue;
			}
			else if (y == -1) {
				if (array[x][GRID_HEIGHT-1].state == "ALIVE") {
					count++;
				}
				continue;
			}

			if (array[x][y].state == "ALIVE") {
				count++;
			}
		}
	}
	return count;
}

/*
Create an array of objects, each representing a cell
Each object contains a coordinate position and a state
Arguments:
	x: x coordinate of its location
	y: y coordinate
Returns: array of objects 
*/
//bug: when called twice, doesn't display properly
var initialSetup = function(first) {
	if (DEBUG) console.log("initialSetup");
	document.getElementById("stop_btn").disabled = true;
	array = [];
	for (var i = 0; i < GRID_WIDTH; i++) {
		var subarray = [];
		for (var j = 0; j < GRID_HEIGHT; j++) {
			subarray.push({state: "DEAD", idTag: makeID(i,j)});
		}
		array.push(subarray);
	}
	if (first) {
		drawInitialGrid();
	}
}

/*
Set the grid with its initial position
Arguments:
	alive_cells: array of Coord objects representing alive cells
*/
var setStartingPosition = function(alive_cells) {
	if (DEBUG) console.log("setStartingPosition");
	for (var x = 0; x < alive_cells.length; x++) {
		var c = alive_cells[x];
		var i = c[0];
		var j = c[1];
		array[i][j].state = "ALIVE";
	}
}

/*
Redraws the grid, then updates which cells are alive and dead
*/
var repaint = function() {
	redrawGrid();
	updateLivingness();
}

//The following methods are called when onscreen buttons are clicked
function handleStop() {
	if (DEBUG) console.log("stopping");
	RUNNING = false;
	document.getElementById("stop_btn").disabled = true;
	document.getElementById("start_btn").disabled = false;
}
function handleStart() {
	if (DEBUG) console.log("starting");
	syncArray();
	if (RUNNING == false) {
		run();
	}
	RUNNING = true;
	document.getElementById("start_btn").disabled = true;
	document.getElementById("stop_btn").disabled = false;
}
function handleReset() {
	if (DEBUG) console.log("resetting");
	clearAll();
	initialSetup(false);
	RUNNING = false;
	document.getElementById("stop_btn").disabled = true;
	document.getElementById("start_btn").disabled = false;
}
function handleRefresh() {
	initialSetup(false);
}

/*
Change the state of a cell when it is clicked
*/
function handleCellClick(divObj) {
	if (RUNNING == false) {
		console.log(divObj.className);
		if (divObj[0].className == ALIVE_CLASS) {
			divObj[0].className = DEAD_CLASS; //index in at 0 since only one element will be returned
		}
		else { //dead
			divObj[0].className = ALIVE_CLASS;
		}
	}
	//do nothing if running
}

/*
Starts the game playing
Repaints the grid on a specified interval
*/
var run = function() {
	RUNNING = true;
	var painter = setInterval(function() {
		if (RUNNING) {
			repaint();
		}
	},1000/FPS);
}

/*
Create a unique ID for a cell, following a specific pattern referenced later on
*/
function makeID(i,j) {
	return "div_" + i + "_" + j;
}

/*
reset the grid back to blank
*/
function clearAll() {
	//make div states dead for visual change
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		var div = divs[i];
		if (div.className == ALIVE_CLASS) {
			div.className = DEAD_CLASS
		}
	}

	//make array reflect this change
	syncArray();
}

/*
Called when the randomize button is clicked
Creates a random grid
*/
function handleRandomize() {
	var alive_cells = [];

	var alive_prob = .3;
	for (var i = 0; i < GRID_WIDTH; i++) {
		for (var j = 0; j < GRID_HEIGHT; j++) {
			var rand = Math.random();
			if (rand <= alive_prob) {
				alive_cells.push([i,j]);
			}
		}
	}

	clearAll();
	setStartingPosition(alive_cells);
	redrawGrid();
}

