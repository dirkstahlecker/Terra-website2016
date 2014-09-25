proj2
=====

Game of Life

Directions:
Open life.html
Clicking “Randomize” will create a random starting position. Else, you can click on cells to make them alive whenever the game is stopped.
Clicking “Start” and “Stop” control playback execution, and “Reset” clears the board.

Directions to Grader:


I also like my updateLivingness function. I believe it is a fairly succinct way of determining the next state of the board after taking into account all the rules governing its transition. All cells are updated “simultaneously” by storing the new values to a different array, then copying them back to the original array to simulate them all happening at the same time.m




Design Challenges:
