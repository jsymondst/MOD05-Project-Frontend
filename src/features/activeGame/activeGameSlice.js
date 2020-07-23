import { createSlice } from "@reduxjs/toolkit";

export const activeGameSlice = createSlice({
    name: "activeGame",
    initialState: {
        gameID: null,
    },
    reducers: {
        join: (state, action) => {
            state.gameID = action.payload;
        },
        leave: (state) => {
            state.gameID = null;
        },
    },
});

export const { join, leave } = activeGameSlice.actions;

export const selectActiveGameID = (state) => state.activeGame.gameID;

export default activeGameSlice.reducer;

// add these to app/store.js
// import activeGameReducer from "../features/activeGame/activeGameSlice";

// activeGame: activeGameReducer,
