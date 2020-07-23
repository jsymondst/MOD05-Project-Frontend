import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import tictactoeReducer from "../features/tictactoe/tictactoeSlice";
import activeGameReducer from "../features/activeGame/activeGameSlice";

export default configureStore({
    reducer: {
        // counter: counterReducer,
        tictactoe: tictactoeReducer,
        activeGame: activeGameReducer,
    },
});
