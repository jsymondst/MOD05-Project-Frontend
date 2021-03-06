import { createSlice } from "@reduxjs/toolkit";
import { emptyGrid } from "./emptyGrid";

export const connectFourSlice = createSlice({
  name: "connectFour",
  initialState: {
    grid: emptyGrid,
    turn: "1",
    winner: null,
  },
  reducers: {
    connectFourPlace: (state, action) => {
      const { columnIndex, piece } = action.payload;
      const turnSwitch = { red: "1", yellow: "2" };
      const oldColumn = state.grid[columnIndex];
      let newColumn = oldColumn.filter((space) => space !== "blank");
      let posY = 0;
      // let didPlace = false;
      if (newColumn.length < 6) {
        newColumn.push(piece);
        posY = newColumn.length - 1;
        // didPlace = true;
        state.turn = turnSwitch[piece];
      }
      while (newColumn.length < 6) {
        newColumn.push("blank");
      }

      state.grid[columnIndex] = newColumn;

      const posX = columnIndex;

      state.winner = checkForWins(state.grid, posY, posX);

      // state.turn = turnSwitch[piece];
    },
    connectFourReset: (state) => {
      state.grid = emptyGrid;
      state.turn = "1";
      state.winner = null;
    },
  },
});

export const { connectFourPlace, connectFourReset } = connectFourSlice.actions;

export const selectConnectFourGrid = (state) => state.connectFour.grid;
export const selectConnectFourTurn = (state) => state.connectFour.turn;
export const selectConnectFourWinner = (state) => state.connectFour.winner;

export default connectFourSlice.reducer;

const checkForWins = (grid, posY, posX) => {
  const latestPiece = grid[posX][posY];

  const fourPieces = `${latestPiece}${latestPiece}${latestPiece}${latestPiece}`;

  const thisColumn = grid[posX];

  const thisRow = grid.map((column) => column[posY]);

  const leftDiagonal = [];
  for (let i = -5; i <= 5; i++) {
    if (grid[posX + i]) {
      // check to see the column is present
      leftDiagonal.push(grid[posX + i][posY + i]);
    }
  }

  const rightDiagonal = [];
  for (let i = -5; i <= 5; i++) {
    if (grid[posX - i]) {
      // check to see the column is present
      rightDiagonal.push(grid[posX - i][posY + i]);
    }
  }

  const allLines = [thisRow, thisColumn, leftDiagonal, rightDiagonal];

  //Check to see if there's a win in any of the lines
  if (
    allLines.some((line) => {
      let lineString = line.join("");
      return lineString.includes(fourPieces);
    })
  ) {
    console.log(`${latestPiece} wins!`);
    return latestPiece;
  }

  //Check to see if the grid is full.
  if (grid.every((column) => column[6] != "empty")) {
    return "draw";
  }

  return null;
};
