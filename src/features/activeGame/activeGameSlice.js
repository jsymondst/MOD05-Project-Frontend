import { createSlice } from "@reduxjs/toolkit";

const faker = require("faker/locale/en_GB");

export const activeGameSlice = createSlice({
    name: "activeGame",
    initialState: {
        gameID: null,
        playerNumber: null,
        gameType: null,
        playerName: null,
    },
    reducers: {
        join: (state, action) => {
            state.gameID = action.payload.id;
            state.gameType = action.payload.gameType;
        },
        leave: (state) => {
            state.gameID = null;
            state.playerNumber = null;
            state.gameType = null;
        },
        setPlayer: (state, action) => {
            state.playerNumber = action.payload;
        },
        setGameType: (state, action) => {
            state.gameType = action.gameType;
        },
        setPlayerName: (state, action) => {
            state.playerName = action.payload;
        },
    },
});

export const {
    join,
    leave,
    setPlayer,
    setGameType,
    setPlayerName,
} = activeGameSlice.actions;

export const selectActiveGameID = (state) => state.activeGame.gameID;
export const selectPlayerNumber = (state) => state.activeGame.playerNumber;
export const selectActiveGameType = (state) => state.activeGame.gameType;
export const selectPlayerName = (state) => state.activeGame.playerName;

export default activeGameSlice.reducer;

// add these to app/store.js
// import activeGameReducer from "../features/activeGame/activeGameSlice";

// activeGame: activeGameReducer,
