/*
Draws one square
Arguments:
	pad: pad to draw upon
	coord: Coord object representing the top left corner
	state: "ALIVE" or "DEAD"
*/
var drawInitialGrid = function() {
	var centerDiv = document.createElement("div");
	centerDiv.className = "center";
	centerDiv.id = "centerDiv";
	document.body.appendChild(centerDiv);

	var rightDiv = document.createElement("div");
	rightDiv.className = "right";
	rightDiv.id = "rightDiv";
	document.getElementById("centerDiv").appendChild(rightDiv);

	for (var i = 0; i < array.length; i++) {

		var rowDiv = document.createElement("div");
		rowDiv.style.display = "block";
		rowDiv.style.marginBottom = "0px";
		rowDiv.style.marginTop = "0px";
		rowDiv.className = "row";
		var rowID = "rowDiv_" + String(i);
		rowDiv.id = rowID;
		document.getElementById("rightDiv").appendChild(rowDiv);

		var el = array[i];
		for (var j = 0; j < el.length; j++) {
			var cell = array[i][j];
			var cellID = makeID(i,j);

			var div = document.createElement("div");
			div.id = cellID;

			//document.body.appendChild(div);
			document.getElementById(rowID).appendChild(div);
			document.getElementById(cellID).className = DEAD_CLASS;
			//document.getElementById(cellID).onClick = function() {return handleCellClick(i,j)};
			//document.getElementById(cellID).addEventListener("click",function() { return handleCellClick()});

			$("#" + cellID).click(function(event) {return handleCellClick($(event.target))});
			//http://stackoverflow.com/questions/9012537/how-to-get-the-element-clicked-for-the-whole-document
		}
	}
}


var redrawGrid = function() {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			var cell = array[i][j];

			var className = ""
			if (cell.state == "ALIVE") {
				className = ALIVE_CLASS;
			}
			else if (cell.state == "DEAD") {
				className = DEAD_CLASS;
			}
			else throw "drawGrid Illegal State";

			document.getElementById(cell.idTag).className = className;
		}
	}
} 
