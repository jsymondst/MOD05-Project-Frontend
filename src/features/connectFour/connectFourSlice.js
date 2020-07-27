import { createSlice } from "@reduxjs/toolkit";
import { emptyGrid } from "./emptyGrid";

export const connectFourSlice = createSlice({
    name: "connectFour",
    initialState: {
        grid: emptyGrid,
        turn: "1",
    },
    reducers: {
        place: (state, action) => {
            const { columnIndex, piece } = action.payload;
            const turnSwitch = { red: "2", yellow: "1" };
            const emptyColumn = ["", "", "", "", "", ""];
            const oldColumn = state.grid[columnIndex];
            let newColumn = oldColumn.filter((space) => space !== "");
            newColumn = [...newColumn, piece, ...emptyColumn];
            newColumn.length = 6;

            state.grid[columnIndex] = newColumn;
            state.turn = turnSwitch[piece];
        },
        reset: (state) => {
            state.grid = emptyGrid;
            state.turn = "1";
        },
    },
});

export const { connectFourPlace, connectFourReset } = connectFourSlice.actions;

export const selectConnectFourGrid = (state) => state.connectFour.grid;
export const selectConnectFourTurn = (state) => state.connectFour.turn;

export default connectFourSlice.reducer;

// const emptyGrid = [
//     ["", "", "", "", "", ""],
//     ["", "", "", "", "", ""],
//     ["", "", "", "", "", ""],
//     ["", "", "", "", "", ""],
//     ["", "", "", "", "", ""],
//     ["", "", "", "", "", ""],
//     ["", "", "", "", "", ""],
// ];
