import React from "react";

import Lobby from "./Lobby/Lobby";
import GameView from "./GameView/GameView";

import { useSelector, useDispatch } from "react-redux";

import {
    join,
    leave,
    selectActiveGameID,
} from "../features/activeGame/activeGameSlice";

const Main = () => {
    const activeGameID = useSelector(selectActiveGameID);

    return (
        <div className="main">{activeGameID ? <GameView /> : <Lobby />}</div>
    );
};

export default Main;
