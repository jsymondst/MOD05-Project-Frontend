import React from "react";
import { createStore } from "redux";

export default class TicTacToeBoard extends React.Component {
    board(
        state = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ],
        action
    ) {
        switch (action.type) {
            case "X":
                const { posX, posY } = action;
                state[posY][posX] = "X";
                return state;
            case "O":
                const { posX, posY } = action;
                state[posY][posX] = "X";
                return state;
            default:
                return state;
        }
    }

    boardStore = createStore(board);
}
