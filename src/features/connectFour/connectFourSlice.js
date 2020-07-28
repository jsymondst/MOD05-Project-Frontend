import { createSlice } from "@reduxjs/toolkit";
import { emptyGrid } from "./emptyGrid";

export const connectFourSlice = createSlice({
    name: "connectFour",
    initialState: {
        grid: emptyGrid,
        turn: "1",
    },
    reducers: {
        connectFourPlace: (state, action) => {
            const { columnIndex, piece } = action.payload;
            const turnSwitch = { red: "1", yellow: "2" };
            const oldColumn = state.grid[columnIndex];
            let newColumn = oldColumn.filter((space) => space !== "");
            if (newColumn.length < 6) {
                newColumn.push(piece);
            }
            while (newColumn.length < 6) {
                newColumn.push("");
            }

            state.grid[columnIndex] = newColumn;
            state.turn = turnSwitch[piece];
        },
        connectFourReset: (state) => {
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
