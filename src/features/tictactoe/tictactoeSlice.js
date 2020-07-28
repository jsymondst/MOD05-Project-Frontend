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
    },
    reducers: {
        place: (state, action) => {
            const { posX, posY, piece } = action.payload;
            const turnSwitch = { X: "O", O: "X" };
            state.grid[posY][posX] = piece;
            state.turn = turnSwitch[piece];
        },
        tictactoeReset: (state) => {
            state.grid = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ];
            state.turn = "X";
        },
    },
});

export const { place, tictactoeReset } = tictactoeSlice.actions;

export const selectTttGrid = (state) => state.tictactoe.grid;
export const selectTttTurn = (state) => state.tictactoe.turn;

export default tictactoeSlice.reducer;
