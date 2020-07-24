import { createSlice } from "@reduxjs/toolkit";

export const activeGameSlice = createSlice({
    name: "activeGame",
    initialState: {
        gameID: null,
        playerNumber: null,
        gameType: null,
    },
    reducers: {
        join: (state, action) => {
            state.gameID = action.payload;
        },
        leave: (state) => {
            state.gameID = null;
            state.playerNumber = null;
        },
        setPlayer: (state, action) => {
            state.playerNumber = action.payload;
        },
    },
});

export const { join, leave, setPlayer } = activeGameSlice.actions;

export const selectActiveGameID = (state) => state.activeGame.gameID;
export const selectPlayerNumber = (state) => state.activeGame.playerNumber;

export default activeGameSlice.reducer;

// add these to app/store.js
// import activeGameReducer from "../features/activeGame/activeGameSlice";

// activeGame: activeGameReducer,
