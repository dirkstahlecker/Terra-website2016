
test("testing initialSetup", function() {
	//create the array initially
	initialSetup();
	for (var i = 0; i < GRID_WIDTH; i++) {
		for (var j = 0; j < GRID_HEIGHT; j++) {
			equal(array[i][j].state, "DEAD"); //all are initialized to dead
		}
	}
});

test("testing setStartingPositions", function() {
	initialSetup();
	var alive_cells = []
	for (var i = 0; i < GRID_WIDTH; i++) {
		for (var j = 0; j < GRID_HEIGHT; j++) {
			if (i == 10 || j == 10) {
				alive_cells.push([i,j]);
			}
		}
	}

	setStartingPosition(alive_cells);

	for (var i = 0; i < GRID_WIDTH; i++) {
		for (var j = 0; j < GRID_HEIGHT; j++) {
			if (i == 10 || j == 10) {
				equal(array[i][j].state, "ALIVE");
			}
			else {
				equal(array[i][j].state, "DEAD");
			}
		}
	}
});


test("testing updateLivingness", function () {
	initialSetup();
	var alive_cells = [];
	//hard code a few known structures
	//stable square
	alive_cells.push([0,0]);
	alive_cells.push([0,1]);
	alive_cells.push([1,0]);
	alive_cells.push([1,1]);

	//flipper
	alive_cells.push([5,0]);
	alive_cells.push([5,1]);
	alive_cells.push([5,2]);

	setStartingPosition(alive_cells);

	updateLivingness();
	for (var i = 0; i < GRID_WIDTH; i++) {
		for (var j = 0; j < GRID_HEIGHT; j++) {
			//test the square hasn't changed
			if ((i == 0 && (j == 0 || j == 1)) || (i == 1 && (j == 0 || j == 1))) {
				equal(array[i][j].state, "ALIVE");
			}
			//test the flipper has flipped
			else if ((i == 4 && j == 1) || (i == 5 && j == 1) || (i == 6 && j == 1)) {
				equal(array[i][j].state, "ALIVE");
			}
			else { //everything else should be dead
				equal(array[i][j].state, "DEAD");
			}
		}
	}

	//flip again
	updateLivingness();
	for (var i = 0; i < GRID_WIDTH; i++) {
		for (var j = 0; j < GRID_HEIGHT; j++) {
			//test the square hasn't changed
			if ((i == 0 && (j == 0 || j == 1)) || (i == 1 && (j == 0 || j == 1))) {
				equal(array[i][j].state, "ALIVE");
			}
			//test the flipper has flipped
			else if ((i == 5 && j == 0) || (i == 5 && j == 1) || (i == 5 && j == 2)) {
				equal(array[i][j].state, "ALIVE");
			}
			else { //everything else should be dead
				equal(array[i][j].state, "DEAD");
			}
		}
	}

});

test("testing getNumNeighbors", function() {
	initialSetup();
	var alive_cells = [];
	//hard code a few known structures
	//test adjacent
	alive_cells.push([10,10]);
	alive_cells.push([10,11]);
	alive_cells.push([11,10]);
	alive_cells.push([11,11]);

	//test diagonals
	alive_cells.push([5,0]);
	alive_cells.push([6,1]);
	alive_cells.push([5,2]);

	setStartingPosition(alive_cells);

	equal(getNumNeighbors(10,10),3);
	equal(getNumNeighbors(10,11),3);
	equal(getNumNeighbors(11,10),3);
	equal(getNumNeighbors(11,11),3);

	equal(getNumNeighbors(5,0),1);
	equal(getNumNeighbors(6,1),2);
	equal(getNumNeighbors(5,2),1);

});

//can't test repaint because it updates the display
//can't test handle_form because it relies on user input from the page
//can't test handle_randmize, because it relies inherently upon random numbers

test("testing handleCellClick", function() {
	var divObj = document.createElement("div");
	divObj.className = DEAD_CLASS;
	divObj.id = "divObj";
	document.body.appendChild(divObj);

	var d = document.getElementById("divObj");
	handleCellClick([d]);
	equal(d.className, ALIVE_CLASS);
});

test("testing makeID", function() {
	equal(makeID(5,4), "div_5_4");
})


