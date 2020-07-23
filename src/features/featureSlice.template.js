import { createSlice } from "@reduxjs/toolkit";

export const featureSlice = createSlice({
    name: "feature",
    initialState: {
        key: 0,
    },
    reducers: {
        type: (state) => {
            state.key += 1;
        },
    },
});

export const { action1, action2 } = featureSlice.actions;

export const selectPieceOfState = (state) => state.feature.key;

export default featureSlice.reducer;

// add these to app/store.js
// import featureReducer from "../features/feature/featureSlice";

// feature: featureReducer,
