import { createSlice } from "@reduxjs/toolkit";

export const tictactoeSlice = createSlice({
    name: "tictactoe",
    initialState: {
        grid: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ],
        turn: "X",
        winner: null,
    },
    reducers: {
        place: (state, action) => {
            const { posX, posY, piece } = action.payload;
            const turnSwitch = { X: "O", O: "X" };
            state.grid[posY][posX] = piece;
            state.winner = checkForWins(state.grid);
            state.turn = turnSwitch[piece];
        },

        tictactoeReset: (state) => {
            state.grid = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ];
            state.turn = "X";
            state.winner = null;
        },
    },
});

const checkForWins = (grid) => {
    let winner = null;
    for (let i = 0; i <= 2; i++) {
        if (
            // check rows
            grid[i][0] === grid[i][1] &&
            grid[i][1] === grid[i][2] &&
            grid[i][0] !== ""
        ) {
            winner = grid[i][0];
        } else if (
            //check columns
            grid[0][i] === grid[1][i] &&
            grid[1][i] === grid[2][i] &&
            grid[0][i] !== ""
        ) {
            winner = grid[0][i];
        }
    }
    //check diagonals
    if (
        grid[0][0] === grid[1][1] &&
        grid[1][1] === grid[2][2] &&
        grid[1][1] !== ""
    ) {
        winner = grid[1][1];
    } else if (
        grid[0][2] === grid[1][1] &&
        grid[1][1] === grid[2][0] &&
        grid[1][1] !== ""
    ) {
        winner = grid[1][1];
    }
    return winner;
};

export const { place, tictactoeReset } = tictactoeSlice.actions;

export const selectTttGrid = (state) => state.tictactoe.grid;
export const selectTttTurn = (state) => state.tictactoe.turn;
export const selectTttWinner = (state) => state.tictactoe.winner;

export default tictactoeSlice.reducer;
